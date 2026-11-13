import http from 'node:http';
import { Readable } from 'node:stream';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createCommerce, actorFrom, ApiError, entityTag, fail, object } from './services/commerce.js';
import { ROUTES, successfulStatus } from './routes.js';
const PUBLIC=path.resolve(fileURLToPath(new URL('../public/',import.meta.url)));
const MIME={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.yaml':'application/yaml; charset=utf-8','.md':'text/markdown; charset=utf-8','.graphql':'text/plain; charset=utf-8','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8'};
const compiled=ROUTES.map(route=>({...route,keys:[...route.path.matchAll(/\{([^}]+)\}/g)].map(m=>m[1]),pattern:new RegExp('^'+route.path.replace(/\{[^}]+\}/g,'([^/]+)')+'/?$')}));
export async function createApp({quiet=false}={}) {
  const commerce=createCommerce();let gql=null;
  try { const {createGraphQL}=await import('./graphql/index.js');gql=createGraphQL(commerce); }
  catch(e) { if(e.code!=='ERR_MODULE_NOT_FOUND'&&e.code!=='MODULE_NOT_FOUND') throw e;if(!quiet)console.warn('GraphQL dependencies are missing. Run npm install. REST and reading mode remain available.'); }
  const json=(res,status,value,headers={})=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers});res.end(status===204||status===304?undefined:JSON.stringify(value));};
  const server=http.createServer(async(req,res)=>{
    res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');
    let url;
    try {
      const host=req.headers.host??'';
      if(req.headers.origin && new URL(req.headers.origin).host!==host)fail(403,'ORIGIN_NOT_ALLOWED','Open the website from this server origin. Cross-origin access is disabled.');
      url=new URL(req.url,`http://${host}`);
      if(url.pathname==='/health'){json(res,200,{ok:true,graphqlAvailable:Boolean(gql),mode:'local-learning-demo'});return;}
      if(url.pathname==='/graphql'){
        if(!gql) {json(res,503,{errors:[{message:'Install dependencies with npm install, then restart the server.'}]});return;}
        if(Number(req.headers['content-length']??0)>65536)fail(413,'REQUEST_TOO_LARGE','Requests are limited to 64 KiB.');
        const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>65536)fail(413,'REQUEST_TOO_LARGE','Requests are limited to 64 KiB.');chunks.push(chunk);}
        // Replay the bounded bytes to the real HTTP adapter; no query interpretation occurs here.
        const bounded=Readable.from([Buffer.concat(chunks)]);Object.assign(bounded,{url:req.url,method:req.method,headers:req.headers});
        return await gql.handler(bounded,res);
      }
      if(url.pathname==='/lab/reset'){
        if(req.method!=='POST')fail(405,'METHOD_NOT_ALLOWED','Use POST for reset.');
        if(actorFrom(req.headers.authorization)?.role!=='admin')fail(403,'FORBIDDEN','The demo administrator token is required to reset the data.');
        json(res,200,commerce.reset());return;
      }
      if(url.pathname.startsWith('/api/v1')){
        if(req.headers['x-demo-error']==='rate-limit'){res.setHeader('Retry-After','5');fail(429,'RATE_LIMITED','Deterministic demonstration only. Remove X-Demo-Error or retry after 5 seconds.');}
        const routePath=url.pathname.slice('/api/v1'.length)||'/';
        const route=compiled.find(r=>r.method===(req.method==='HEAD'?'GET':req.method)&&r.pattern.test(routePath));
        if(!route){const methods=compiled.filter(r=>r.pattern.test(routePath)).map(r=>r.method);if(methods.length){res.setHeader('Allow',[...new Set([...methods,...(methods.includes('GET')?['HEAD']:[])])].join(', '));fail(405,'METHOD_NOT_ALLOWED','This method is not supported for this resource.');}fail(404,'NOT_FOUND','No REST operation matches this path.');}
        const match=routePath.match(route.pattern);const params=Object.fromEntries(route.keys.map((key,i)=>[key,decodeURIComponent(match[i+1])]));
        const query={};for(const [key,v] of url.searchParams){if(key in query)fail(400,'INVALID_INPUT','Duplicate query parameters are not supported.');if(['limit','offset'].includes(key)){if(!/^(0|[1-9]\d*)$/.test(v))fail(400,'INVALID_INPUT',`${key} must be an integer.`);query[key]=Number(v);}else query[key]=v;}
        if(!['listProducts','listOrders'].includes(route.id)&&Object.keys(query).length)fail(400,'UNKNOWN_FIELD','This operation has no query parameters.');
        let body={};const chunks=[];let bytes=0;
        for await(const chunk of req){bytes+=chunk.length;if(bytes>65536)fail(413,'REQUEST_TOO_LARGE','Requests are limited to 64 KiB.');chunks.push(chunk);}
        const raw=Buffer.concat(chunks).toString('utf8');
        if(raw){if(!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type']??''))fail(415,'UNSUPPORTED_MEDIA_TYPE','Use Content-Type: application/json.');try{body=JSON.parse(raw);}catch{fail(400,'INVALID_JSON','The request body is not valid JSON.');}}
        if(route.input&&!raw)fail(400,'MISSING_BODY','This operation requires a JSON request body.');
        if(!route.input&&raw)object(body,[]);
        let value=route.run(commerce,actorFrom(req.headers.authorization),params,body,query,req.headers);
        let status=successfulStatus(route),headers={};
        if(route.id==='createOrder'){status=value.replayed?200:201;headers['Idempotency-Replayed']=String(value.replayed);value=value.order;}
        if(route.id==='getProduct'){
          const etag=entityTag(value);headers={...headers,ETag:etag,'Cache-Control':'private, max-age=0, must-revalidate'};
          const supplied=req.headers['if-none-match'];if(supplied&&(supplied==='*'||supplied.split(',').some(t=>t.trim().replace(/^W\//,'')===etag))){json(res,304,null,headers);return;}
        }
        if(status===201&&value?.id){const collection=route.id==='createProduct'?'products':route.id==='createCart'?'carts':route.id==='createOrder'?'orders':route.id==='createReturn'?'returns':null;if(collection)headers.Location=`/api/v1/${collection}/${value.id}`;}
        if(req.method==='HEAD'){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8',...headers});res.end();return;}
        json(res,status,value,headers);return;
      }
      if(!['GET','HEAD'].includes(req.method))fail(405,'METHOD_NOT_ALLOWED','Static pages support GET and HEAD.');
      const pathname=decodeURIComponent(url.pathname);const target=path.resolve(PUBLIC,`.${pathname==='/'?'/index.html':pathname}`);
      if(!target.startsWith(PUBLIC+path.sep)&&target!==path.join(PUBLIC,'index.html'))fail(403,'FORBIDDEN','Invalid file path.');
      const info=await stat(target).catch(()=>null);if(!info?.isFile())fail(404,'NOT_FOUND','This file was not found.');
      const bytes=await readFile(target);res.writeHead(200,{'Content-Type':MIME[path.extname(target)]??'application/octet-stream','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:bytes);
    }catch(error){
      if(res.headersSent){res.end();return;}
      const e=error instanceof ApiError?error:new ApiError(500,'INTERNAL_ERROR','An unexpected error occurred in the local demo.');
      if(e.status===500&&!quiet)console.error(error);
      const titles={400:'Bad Request',401:'Unauthorized',403:'Forbidden',404:'Not Found',405:'Method Not Allowed',409:'Conflict',413:'Content Too Large',415:'Unsupported Media Type',429:'Too Many Requests',500:'Internal Server Error'};
      if(e.status===401)res.setHeader('WWW-Authenticate','Bearer realm="ShopVerse demo"');
      json(res,e.status,{type:'about:blank',title:titles[e.status]??'Request Failed',status:e.status,detail:e.message,instance:url?.pathname??'/',code:e.code,fields:e.fields},{'Content-Type':'application/problem+json'});
    }
  });
  server.requestTimeout=15000;server.headersTimeout=10000;
  return {server,commerce,graphql:gql};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const port=Number(process.env.PORT??3000);if(!Number.isInteger(port)||port<1||port>65535)throw new Error('PORT must be an integer from 1 through 65535.');
  const {server}=await createApp();server.listen(port,'0.0.0.0',()=>console.log(`API Documentation Academy: http://localhost:${port}\nREST: /api/v1 | GraphQL: /graphql | Ctrl+C to stop`));
}

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateContracts } from './contracts.js';
import { schemaReference } from './schema-reference.js';
const ROOT=fileURLToPath(new URL('../',import.meta.url)),P=path.join(ROOT,'public');
const read=p=>fs.readFileSync(path.join(P,p),'utf8');
const json=p=>JSON.parse(read(p));
const write=(p,v)=>fs.writeFileSync(path.join(P,p),typeof v==='string'?v:JSON.stringify(v,null,2)+'\n');
const {spec,references}=generateContracts();
const manifest=json('data/course-manifest.json');
const lessons=manifest.lessons.map(l=>({...l,content:read(l.path)}));
const labs=json('data/labs.json').map(l=>({...l,content:read(l.path)}));
const capstones=json('data/capstones.json').map(c=>({...c,content:read(c.path)}));
const gqlExamples=json('data/graphql-examples.json');
const gqlTypes=schemaReference(read('contracts/schema.graphql'));
const credentials={Public:'',Seller:'demo-seller-token',Customer:'demo-customer-token'};
const postmanItems=[];
for(const r of references){
 const token=credentials[r.access]||'demo-customer-token';
 const url='{{baseUrl}}'+r.path.replace(/\{([^}]+)\}/g,(_,k)=>'{{'+k+'}}');
 const headers=[{key:'Accept',value:'application/json'}];
 if(r.access!=='Public')headers.push({key:'Authorization',value:'Bearer '+token});
 if(r.input)headers.push({key:'Content-Type',value:'application/json'});
 if(r.id==='createOrder')headers.push({key:'Idempotency-Key',value:'{{idempotencyKey}}'});
 const body=r.example?structuredClone(r.example):null;
 if(body?.cartId)body.cartId='{{cartId}}';
 const request={method:r.method,header:headers,url,description:r.description+'\n\n'+r.prerequisites};
 if(body)request.body={mode:'raw',raw:JSON.stringify(body,null,2),options:{raw:{language:'json'}}};
 const postman={name:r.summary+' ['+r.id+']',request};
 const capture={createProduct:'productId',createCart:'cartId',createOrder:'orderId',createReturn:'returnId'}[r.id];
 const lines=['pm.test("Response is not a server error", () => pm.expect(pm.response.code).to.be.below(500));'];
 if(capture)lines.push(`if (pm.response.code >= 200 && pm.response.code < 300) { const data = pm.response.json(); if (data.id) pm.environment.set('${capture}', data.id); }`);
 if(r.id==='addCartItem')lines.push("if (pm.response.code === 201) { const data = pm.response.json(); const item = data.items.find(x => x.productId === 'prod_1001'); if (item) pm.environment.set('itemId', item.id); }");
 postman.event=[{listen:'test',script:{type:'text/javascript',exec:lines}}];postmanItems.push(postman);
 const headersCurl=headers.filter(h=>!h.value.includes('{{')).map(h=>`  -H '${h.key}: ${h.value}'`).join(' \\\n');
 const requestUrl='http://localhost:3000/api/v1'+r.examplePath;
 const curl=`# Live example. ${r.prerequisites}\ncurl -i -X ${r.method} '${requestUrl}'${headersCurl?' \\\n'+headersCurl:''}${r.id==='createOrder'?" \\\n  -H 'Idempotency-Key: order-demo-001'":''}${r.example?" \\\n  --data '"+JSON.stringify(r.example).replace(/'/g,"'\\''")+"'":''}\n`;
 write(`examples/rest/${r.id}.sh`,curl);
 const jsHeaders=Object.fromEntries(headers.filter(h=>!h.value.includes('{{')).map(h=>[h.key,h.value]));if(r.id==='createOrder')jsHeaders['Idempotency-Key']='order-demo-001';
 write(`examples/rest/${r.id}.js`,`// Run with Node.js 22+ while the local server is running.\n// ${r.prerequisites}\nconst response = await fetch(${JSON.stringify(requestUrl)}, ${JSON.stringify({method:r.method,headers:jsHeaders,...(r.example?{body:JSON.stringify(r.example)}:{})},null,2)});\nconst text = await response.text();\nlet body = text;\ntry { body = text ? JSON.parse(text) : null; } catch { /* Keep non-JSON failure text. */ }\nif (!response.ok) { console.error('HTTP', response.status, body); process.exitCode = 1; }\nelse console.log('HTTP', response.status, body);\n`);
}
const groups=['Products','Reviews','Customers','Carts','Orders','Returns'];
const collection={info:{name:'ShopVerse REST Learning API',description:'Synthetic local API. Read each request prerequisite; this is not a sequential all-requests collection runner. Reset data as needed. The test script only checks for server errors; a 4xx may be an intended exercise failure.',schema:'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'},item:groups.map(tag=>({name:tag,item:postmanItems.filter((_,i)=>references[i].tag===tag)}))};
write('downloads/postman/shopverse.collection.json',collection);
write('downloads/postman/shopverse.environment.json',{name:'ShopVerse local demo',values:Object.entries({baseUrl:'http://localhost:3000/api/v1',productId:'prod_1001',cartId:'cart_1001',itemId:'item_1001',orderId:'ord_1001',returnId:'ret_1001',idempotencyKey:'postman-order-001'}).map(([key,value])=>({key,value,type:'default',enabled:true})),_postman_variable_scope:'environment'});
write('downloads/course-notes.md','# API Documentation Academy - complete lesson notes\n\nFictional ShopVerse learning project. See README for setup and scope.\n\n'+lessons.map(l=>l.content).join('\n\n---\n\n'));
const extra=[
 ['contracts/openapi.yaml','OpenAPI contract (YAML)','Canonical generated REST contract, OpenAPI 3.1.1.','YAML','application/yaml'],
 ['contracts/openapi.json','OpenAPI contract (JSON)','JSON equivalent of the same REST description.','JSON','application/json'],
 ['contracts/schema.graphql','GraphQL schema','Typed query, mutation, input, enum, and scalar definitions.','SDL','text/plain'],
 ['downloads/postman/shopverse.collection.json','Postman request collection','All REST operations with role headers and setup notes.','JSON','application/json'],
 ['downloads/postman/shopverse.environment.json','Postman local environment','Local variables only; no real credentials.','JSON','application/json'],
 ['downloads/course-notes.md','Complete course notes','All 48 lessons in one editable Markdown file.','MD','text/markdown'],
 ['content/references/data-dictionary.md','Canonical data dictionary','Entities, constraints, identities, states, and error codes.','MD','text/markdown'],
 ['content/references/cheat-sheets.md','REST, OpenAPI, and GraphQL cheat sheets','Common syntax and decision reminders.','MD','text/markdown']
];
const downloads=[...json('data/downloads.json'),...extra.map(([p,title,description,extension,mime])=>({path:p,filename:path.basename(p),title,description,extension,mime}))].map(d=>({...d,content:read(d.path)}));
const data={modules:manifest.modules,lessons,rest:references,openapi:spec,openapiYaml:read('contracts/openapi.yaml'),schema:read('contracts/schema.graphql'),gqlTypes,gqlExamples,labs,edits:json('data/editing-exercises.json'),quizzes:json('data/quizzes.json'),glossary:json('data/glossary.json'),interview:json('data/interview.json'),capstones,downloads,sources:fs.readFileSync(path.join(ROOT,'docs/sources-and-versions.md'),'utf8')};
write('js/course-data.js','window.COURSE = '+JSON.stringify(data).replace(/</g,'\\u003c')+';\n');
// Copy a truly static reading deployment. Live APIs are deliberately not simulated.
const dist=path.join(ROOT,'dist');fs.rmSync(dist,{recursive:true,force:true});fs.cpSync(P,dist,{recursive:true});
let html=read('index.html').replace('<link rel="stylesheet" href="css/styles.css">',()=>'<style>'+read('css/styles.css')+'</style>');
let scripts='';html=html.replace(/\s*<script defer src="([^"]+)"><\/script>/g,(_,p)=>{scripts+='\n<script>'+read(p).replace(/<\/script/gi,'<\\/script')+'</script>';return '';});
html=html.replace('</body>',()=>scripts+'\n</body>');
fs.writeFileSync(path.join(ROOT,'standalone.html'),html);
const coverage=['# Content coverage matrix','', '| Lesson | Module | Prose words | Content | Exercise / model answer |','| --- | --- | --- | --- | --- |',...lessons.map(l=>`| ${l.number}. ${l.title} | ${l.module} | ${l.words} | Complete | Included |`),'',`Totals: ${lessons.length} lessons; ${labs.length} labs; ${data.quizzes.length} quiz questions; ${data.glossary.length} glossary entries; ${data.interview.length} interview answers; ${capstones.length} capstones; ${references.length} REST operations; ${gqlExamples.length} GraphQL examples.`, '', 'Runtime verification is tracked separately in testing-report.md. A content-complete entry does not imply every runtime test was executable.'];
fs.writeFileSync(path.join(ROOT,'docs/coverage-matrix.md'),coverage.join('\n')+'\n');
console.log(`Built ${lessons.length} lessons, ${labs.length} labs, ${references.length} REST operations, ${gqlTypes.length} GraphQL types, and ${gqlExamples.length} examples.`);
console.log('Static deployment: dist/ | Single-file reader: standalone.html');

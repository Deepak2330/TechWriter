import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { buildSchema, GraphQLError, Kind } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/http';
import { actorFrom, ApiError, integer } from '../services/commerce.js';
export function createGraphQL(commerce) {
  const schema=buildSchema(readFileSync(new URL('../../public/contracts/schema.graphql',import.meta.url),'utf8'));
  const dateTime = value => {
    if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)||!Number.isFinite(Date.parse(value))||new Date(value).toISOString()!==value) throw new GraphQLError('DateTime requires a valid UTC timestamp with milliseconds.');
    return value;
  };
  const scalar=schema.getType('DateTime'); scalar.serialize=dateTime; scalar.parseValue=dateTime; scalar.parseLiteral=node=>{if(node.kind!==Kind.STRING)throw new GraphQLError('DateTime must be a string.');return dateTime(node.value);};
  const wrap = fn => (args,ctx) => {
    try{return fn(args,ctx);}catch(e){if(e instanceof ApiError)throw new GraphQLError(e.message,{extensions:{code:e.code,httpStatus:e.status,fields:e.fields}});throw e;}
  };
  const decorateProduct = p => ({...p,seller:()=>commerce.seller(p.sellerId),variants:()=>commerce.variants(p.id).items,reviews:()=>commerce.reviews(p.id).items});
  const decorateCart = c => ({...c,items:c.items.map(i=>({...i,product:decorateProduct(i.product)}))});
  const decorateOrder = (o,actor) => ({...o,shipments:()=>commerce.shipments(actor,o.id).items});
  const signature=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex').slice(0,12);
  function connection(fetchPage, args, scope, decorate) {
    integer(args.first??20,'first',1,100);let offset=0;
    if(args.after!=null){try{const raw=Buffer.from(args.after,'base64url').toString();const [v,s,n]=raw.split(':');if(v!=='v1'||s!==scope||!/^\d+$/.test(n)||Buffer.from(raw).toString('base64url')!==args.after)throw Error();offset=Number(n);integer(offset,'cursor offset',0,1000000);}catch{throw new ApiError(400,'INVALID_CURSOR','The cursor is malformed or belongs to another collection/filter.');}}
    const page=fetchPage({limit:args.first??20,offset});
    const edges=page.items.map((item,i)=>({cursor:Buffer.from(`v1:${scope}:${offset+i+1}`).toString('base64url'),node:decorate(item)}));
    return {edges,pageInfo:{hasNextPage:offset+edges.length<page.total,endCursor:edges.at(-1)?.cursor??null},totalCount:page.total};
  }
  const rootValue={
    product:wrap(({id})=>decorateProduct(commerce.product(id))),
    products:wrap(args=>{const f=Object.fromEntries(Object.entries(args.filter??{}).filter(([,v])=>v!=null));const q={...f,sort:args.sort};return connection(p=>commerce.listProducts({...q,...p}),args,signature(q),decorateProduct);}),
    categories:()=>commerce.categories().items,
    cart:wrap(({id},{actor})=>decorateCart(commerce.cart(actor,id))),
    order:wrap(({id},{actor})=>decorateOrder(commerce.order(actor,id),actor)),
    orders:wrap((args,{actor})=>connection(p=>commerce.listOrders(actor,p),args,signature({orders:actor?.id??null}),o=>decorateOrder(o,actor))),
    me:wrap((_,{actor})=>commerce.me(actor)),
    createProduct:wrap(({input},{actor})=>({product:decorateProduct(commerce.createProduct(actor,input))})),
    updateProduct:wrap(({id,input},{actor})=>({product:decorateProduct(commerce.updateProduct(actor,id,input))})),
    deleteProduct:wrap(({id},{actor})=>commerce.deleteProduct(actor,id)),
    createCart:wrap((_,{actor})=>({cart:decorateCart(commerce.createCart(actor))})),
    addCartItem:wrap(({input},{actor})=>{const {cartId,...body}=input;return {cart:decorateCart(commerce.addCartItem(actor,cartId,body))};}),
    updateCartItem:wrap(({input},{actor})=>{const {cartId,itemId,...body}=input;return {cart:decorateCart(commerce.updateCartItem(actor,cartId,itemId,body))};}),
    removeCartItem:wrap(({cartId,itemId},{actor})=>({cart:decorateCart(commerce.removeCartItem(actor,cartId,itemId))})),
    createOrder:wrap(({input},{actor})=>{const {idempotencyKey,...body}=input;const result=commerce.createOrder(actor,body,idempotencyKey);return {...result,order:decorateOrder(result.order,actor)};}),
    cancelOrder:wrap(({id,reason},{actor})=>({order:decorateOrder(commerce.cancelOrder(actor,id,reason==null?{}:{reason}),actor)})),
    addReview:wrap(({input},{actor})=>{const {productId,...body}=input;return {review:commerce.addReview(actor,productId,body)};}),
    createReturn:wrap(({input},{actor})=>{const {orderId,...body}=input;return {returnRequest:commerce.createReturn(actor,orderId,body)};})
  };
  const handler=createHandler({schema,rootValue,context:req=>({actor:actorFrom(req.raw.headers.authorization)})});
  return {handler,schema,rootValue};
}

/** The shared business layer. REST and GraphQL deliberately call the same functions. */
import { createHash } from 'node:crypto';

export class ApiError extends Error {
  constructor(status, code, message, fields = []) {
    super(message); this.name = 'ApiError'; this.status = status; this.code = code; this.fields = fields;
  }
}
export const fail = (status, code, message, fields) => { throw new ApiError(status, code, message, fields); };
export const TOKENS = Object.freeze({
  'demo-customer-token': {id:'cust_1001', role:'customer'},
  'demo-other-customer-token': {id:'cust_1002', role:'customer'},
  'demo-seller-token': {id:'seller_1001', role:'seller'},
  'demo-other-seller-token': {id:'seller_1002', role:'seller'},
  'demo-admin-token': {id:'admin_1001', role:'admin'}
});
export function actorFrom(header = '') { const match = typeof header === 'string' && /^Bearer ([^\s]+)$/i.exec(header); return match ? TOKENS[match[1]] || null : null; }
const clone = v => structuredClone(v);
const money = n => ({amountMinor:n, currency:'INR'});
const now = () => new Date().toISOString();
export function object(value, allowed, required = []) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(400,'INVALID_INPUT','Expected a JSON object.');
  const unknown = Object.keys(value).filter(k=>!allowed.includes(k));
  if (unknown.length) fail(400,'UNKNOWN_FIELD',`Unknown field: ${unknown[0]}.`,unknown);
  for (const k of required) if (!(k in value)) fail(400,'MISSING_FIELD',`${k} is required.`,[k]);
  return value;
}
function text(v, name, max, min = 1) {
  if (typeof v !== 'string' || [...v].length < min || [...v].length > max || (min && !v.trim())) fail(400,'INVALID_INPUT',`${name} must contain ${min}-${max} characters.`,[name]);
  return v;
}
export function integer(v, name, min, max) {
  if (!Number.isInteger(v) || v < min || v > max) fail(400,'INVALID_INPUT',`${name} must be an integer from ${min} through ${max}.`,[name]);
  return v;
}
function enumValue(v, values, name) { if (!values.includes(v)) fail(400,'INVALID_INPUT',`${name} must be one of: ${values.join(', ')}.`,[name]); return v; }
function moneyInput(v, name) {
  object(v,['amountMinor','currency'],['amountMinor','currency']);
  integer(v.amountMinor,`${name}.amountMinor`,0,1000000);
  if (v.currency !== 'INR') fail(400,'INVALID_INPUT','The local demo supports INR only.',['currency']);
  return clone(v);
}
function requireActor(actor, roles) {
  if (!actor) fail(401,'UNAUTHENTICATED','Select a documented demo bearer token.');
  if (roles && !roles.includes(actor.role)) fail(403,'FORBIDDEN',`This operation requires ${roles.join(' or ')} access.`);
  return actor;
}
function owned(actor, ownerId, role='customer') {
  requireActor(actor,[role,'admin']);
  if (actor.role !== 'admin' && actor.id !== ownerId) fail(403,'FORBIDDEN','This resource belongs to another account.');
}
const canonical = v => JSON.stringify(v, Object.keys(v).sort());
export function createCommerce() {
  let state;
  function reset() {
    state = {
      counters:{prod:1004,cart:1002,item:1001,ord:1002,rev:1002,ret:1001},
      categories:[{id:'cat_audio',name:'Audio'},{id:'cat_home',name:'Home'},{id:'cat_accessories',name:'Accessories'}],
      sellers:[{id:'seller_1001',name:'Northstar Retail'},{id:'seller_1002',name:'Bluebird Goods'}],
      products:[
        {id:'prod_1001',name:'Wireless Headphones',description:'Over-ear wireless headphones with a travel case.',sku:'WH-BLK-01',price:money(249900),priceBeforeMarkdown:money(299900),availability:'IN_STOCK',categoryId:'cat_audio',sellerId:'seller_1001',createdAt:'2026-01-15T09:00:00.000Z'},
        {id:'prod_1002',name:'Desk Lamp',description:'Adjustable reading lamp with a warm white light.',sku:'DL-WHT-01',price:money(129900),priceBeforeMarkdown:null,availability:'IN_STOCK',categoryId:'cat_home',sellerId:'seller_1001',createdAt:'2026-01-15T09:00:00.000Z'},
        {id:'prod_1003',name:'Canvas Backpack',description:'A lightweight everyday backpack.',sku:'CB-GRY-01',price:money(189900),priceBeforeMarkdown:null,availability:'OUT_OF_STOCK',categoryId:'cat_accessories',sellerId:'seller_1002',createdAt:'2026-01-15T09:00:00.000Z'}
      ],
      variants:[{id:'var_1001',productId:'prod_1001',sku:'WH-BLK-01',name:'Black'},{id:'var_1002',productId:'prod_1001',sku:'WH-BLU-01',name:'Blue'}],
      customers:[{id:'cust_1001',name:'Demo Customer',email:'customer@example.test'},{id:'cust_1002',name:'Other Customer',email:'other@example.test'}],
      carts:[{id:'cart_1001',customerId:'cust_1001',status:'ACTIVE',items:[]}],
      orders:[{id:'ord_1001',customerId:'cust_1001',cartId:'cart_seed',status:'DELIVERED',items:[{id:'oi_seed',productId:'prod_1001',name:'Wireless Headphones',quantity:1,unitPrice:money(249900)}],total:money(249900),shippingAddress:{line1:'10 Demo Street',city:'Bengaluru',postalCode:'560001',country:'IN'},createdAt:'2026-01-16T09:00:00.000Z'}],
      shipments:[{id:'ship_1001',orderId:'ord_1001',status:'DELIVERED',trackingCode:'DEMO-TRACK-1001'}],
      reviews:[{id:'rev_1001',productId:'prod_1001',customerId:'cust_1001',rating:4,comment:'Comfortable for everyday listening.',createdAt:'2026-01-17T09:00:00.000Z'}],
      returns:[], idempotency:new Map()
    }; return {message:'Demo data reset. Learning progress was not changed.'};
  }
  reset();
  const id = prefix => `${prefix}_${state.counters[prefix]++}`;
  const find = (collection, value, noun='Resource') => state[collection].find(x=>x.id===value) || fail(404,'NOT_FOUND',`${noun} ${value} was not found.`);
  const product = value => clone(find('products',value,'Product'));
  function listProducts(q={}) {
    object(q,['q','categoryId','availability','sort','limit','offset']);
    const limit = integer(q.limit ?? 20,'limit',1,100), offset = integer(q.offset ?? 0,'offset',0,1000000);
    if ('q' in q) text(q.q,'q',120);
    if ('categoryId' in q) text(q.categoryId,'categoryId',120);
    if ('availability' in q) enumValue(q.availability,['IN_STOCK','OUT_OF_STOCK'],'availability');
    let items = state.products.filter(p=>(!q.q || p.name.toLowerCase().includes(q.q.toLowerCase())) && (!q.categoryId || p.categoryId===q.categoryId) && (!q.availability || p.availability===q.availability));
    const sort=enumValue(q.sort ?? 'NAME_ASC',['NAME_ASC','PRICE_ASC','PRICE_DESC'],'sort');
    items.sort((a,b)=> sort==='NAME_ASC'?a.name.localeCompare(b.name)||a.id.localeCompare(b.id):(sort==='PRICE_ASC'?a.price.amountMinor-b.price.amountMinor:b.price.amountMinor-a.price.amountMinor)||a.id.localeCompare(b.id));
    return {items:clone(items.slice(offset,offset+limit)),total:items.length,limit,offset};
  }
  function validateProduct(input, old, full) {
    const allowed=['name','description','sku','price','priceBeforeMarkdown','availability','categoryId'];
    object(input,allowed,full?['name','sku','price','availability','categoryId']:[]);
    if (!full && !Object.keys(input).length) fail(400,'INVALID_INPUT','Supply at least one product field.');
    const out=full?{description:'',priceBeforeMarkdown:null}:clone(old);
    if ('name' in input) out.name=text(input.name,'name',120);
    if ('description' in input) out.description=text(input.description,'description',2000,0);
    if ('sku' in input) {
      out.sku=text(input.sku,'sku',64);
      if (state.products.some(p=>p.sku===out.sku&&p.id!==old?.id)) fail(409,'SKU_CONFLICT','This SKU is already assigned to another product.',['sku']);
    }
    if ('price' in input) out.price=moneyInput(input.price,'price');
    if ('priceBeforeMarkdown' in input) out.priceBeforeMarkdown=input.priceBeforeMarkdown===null?null:moneyInput(input.priceBeforeMarkdown,'priceBeforeMarkdown');
    if ('availability' in input) out.availability=enumValue(input.availability,['IN_STOCK','OUT_OF_STOCK'],'availability');
    if ('categoryId' in input) {find('categories',input.categoryId,'Category');out.categoryId=input.categoryId;}
    if (out.priceBeforeMarkdown && out.priceBeforeMarkdown.amountMinor < out.price.amountMinor) fail(400,'INVALID_MARKDOWN','priceBeforeMarkdown must be at least the current price.',['priceBeforeMarkdown']);
    return out;
  }
  function createProduct(actor,input) {
    requireActor(actor,['seller','admin']); const validated=validateProduct(input,null,true);
    const p={...validated,id:id('prod'),sellerId:actor.role==='seller'?actor.id:'seller_1001',createdAt:now()}; state.products.push(p);return clone(p);
  }
  function updateProduct(actor,productId,input,full=false) {
    const old=find('products',productId,'Product');owned(actor,old.sellerId,'seller');
    const p={...validateProduct(input,old,full),id:old.id,sellerId:old.sellerId,createdAt:old.createdAt};state.products[state.products.indexOf(old)]=p;return clone(p);
  }
  function deleteProduct(actor,productId) {
    const p=find('products',productId,'Product');owned(actor,p.sellerId,'seller');
    if(state.carts.some(c=>c.status==='ACTIVE'&&c.items.some(i=>i.productId===productId)))fail(409,'PRODUCT_IN_CART','Remove this product from active carts before deleting it.');
    state.products=state.products.filter(x=>x.id!==productId);return {deletedId:productId};
  }
  function me(actor){requireActor(actor,['customer']);return clone(find('customers',actor.id,'Customer'));}
  function updateMe(actor,input){me(actor);object(input,['name'],['name']);const c=find('customers',actor.id);c.name=text(input.name,'name',120);return clone(c);}
  function cartView(c){if(c.snapshot)return {...clone(c.snapshot),status:c.status};const items=c.items.map(i=>({...i,product:product(i.productId),unitPrice:product(i.productId).price}));return {...clone(c),items,total:money(items.reduce((s,i)=>s+i.unitPrice.amountMinor*i.quantity,0))};}
  function cart(actor,cartId){const c=find('carts',cartId,'Cart');owned(actor,c.customerId);return cartView(c);}
  function activeCart(actor,cartId){const c=find('carts',cartId,'Cart');owned(actor,c.customerId);if(c.status!=='ACTIVE')fail(409,'CART_CLOSED','This cart has already been checked out. Create a new cart.');return c;}
  function createCart(actor){requireActor(actor,['customer']);const c={id:id('cart'),customerId:actor.id,status:'ACTIVE',items:[]};state.carts.push(c);return cartView(c);}
  function addCartItem(actor,cartId,input){object(input,['productId','quantity'],['productId','quantity']);const c=activeCart(actor,cartId);const p=product(input.productId);integer(input.quantity,'quantity',1,99);if(p.availability!=='IN_STOCK')fail(409,'OUT_OF_STOCK','This product is unavailable.');const existing=c.items.find(i=>i.productId===p.id);if(existing)fail(409,'ITEM_EXISTS','This product is already in the cart. Update its existing item.');if(c.items.length>=10)fail(409,'CART_LIMIT','The demo allows at most 10 distinct items per cart.');c.items.push({id:id('item'),productId:p.id,quantity:input.quantity});return cartView(c);}
  function updateCartItem(actor,cartId,itemId,input){object(input,['quantity'],['quantity']);const c=activeCart(actor,cartId);const item=c.items.find(i=>i.id===itemId)||fail(404,'NOT_FOUND','Cart item was not found.');item.quantity=integer(input.quantity,'quantity',1,99);return cartView(c);}
  function removeCartItem(actor,cartId,itemId){const c=activeCart(actor,cartId);const index=c.items.findIndex(i=>i.id===itemId);if(index<0)fail(404,'NOT_FOUND','Cart item was not found.');c.items.splice(index,1);return cartView(c);}
  function order(actor,orderId){const o=find('orders',orderId,'Order');owned(actor,o.customerId);return clone(o);}
  function listOrders(actor,q={}){requireActor(actor,['customer','admin']);object(q,['limit','offset']);const limit=integer(q.limit??20,'limit',1,100),offset=integer(q.offset??0,'offset',0,1000000);const all=state.orders.filter(o=>actor.role==='admin'||o.customerId===actor.id);return {items:clone(all.slice(offset,offset+limit)),total:all.length,limit,offset};}
  function createOrder(actor,input,key){requireActor(actor,['customer']);object(input,['cartId','shippingAddress'],['cartId','shippingAddress']);text(key,'Idempotency-Key',128);object(input.shippingAddress,['line1','city','postalCode','country'],['line1','city','postalCode','country']);const address={};for(const k of ['line1','city','postalCode','country'])address[k]=text(input.shippingAddress[k],k,k==='country'?2:120);if(address.country!=='IN')fail(400,'INVALID_INPUT','Demo shipping supports country IN only.');
    const fingerprint=JSON.stringify({cartId:input.cartId,shippingAddress:JSON.parse(canonical(address))});const cacheKey=`${actor.id}:${key}`;const cached=state.idempotency.get(cacheKey);
    if(cached){if(cached.fingerprint!==fingerprint)fail(409,'IDEMPOTENCY_CONFLICT','This idempotency key was used with different order details.');return {...clone(cached.result),replayed:true};}
    const c=activeCart(actor,input.cartId);if(!c.items.length)fail(409,'EMPTY_CART','Add at least one item before placing an order.');
    const items=c.items.map(i=>{const p=product(i.productId);if(p.availability!=='IN_STOCK')fail(409,'OUT_OF_STOCK',`${p.name} is no longer available.`);return {id:`oi_${i.id}`,productId:p.id,name:p.name,quantity:i.quantity,unitPrice:p.price};});
    const total=items.reduce((n,i)=>n+i.unitPrice.amountMinor*i.quantity,0);integer(total,'order total',0,2147483647);
    const o={id:id('ord'),customerId:actor.id,cartId:c.id,status:'CONFIRMED',items,total:money(total),shippingAddress:address,createdAt:now()};state.orders.push(o);c.snapshot=cartView(c);c.status='CHECKED_OUT';const result={order:clone(o),replayed:false};state.idempotency.set(cacheKey,{fingerprint,result:clone(result)});return result;
  }
  function cancelOrder(actor,orderId,input={}){object(input,['reason']);if(input.reason!==undefined)text(input.reason,'reason',500);order(actor,orderId);const o=find('orders',orderId);if(o.status==='CANCELLED')return clone(o);if(o.status!=='CONFIRMED')fail(409,'ORDER_STATE','Only CONFIRMED orders can be cancelled.');o.status='CANCELLED';return clone(o);}
  function shipments(actor,orderId){order(actor,orderId);return {items:clone(state.shipments.filter(s=>s.orderId===orderId))};}
  function reviews(productId){product(productId);return {items:clone(state.reviews.filter(r=>r.productId===productId))};}
  function addReview(actor,productId,input){requireActor(actor,['customer']);product(productId);object(input,['rating','comment'],['rating','comment']);integer(input.rating,'rating',1,5);text(input.comment,'comment',2000);if(state.reviews.some(r=>r.productId===productId&&r.customerId===actor.id))fail(409,'REVIEW_EXISTS','A customer can submit one review per product in this demo.');const r={id:id('rev'),productId,customerId:actor.id,rating:input.rating,comment:input.comment,createdAt:now()};state.reviews.push(r);return clone(r);}
  function createReturn(actor,orderId,input){object(input,['reason'],['reason']);text(input.reason,'reason',500);const o=order(actor,orderId);if(o.status!=='DELIVERED')fail(409,'ORDER_STATE','Only DELIVERED orders are eligible for a return.');if(state.returns.some(r=>r.orderId===orderId))fail(409,'RETURN_EXISTS','A return has already been requested for this order.');const r={id:id('ret'),orderId,customerId:o.customerId,reason:input.reason,status:'REQUESTED',createdAt:now()};state.returns.push(r);return clone(r);}
  function returnRequest(actor,returnId){const r=find('returns',returnId,'Return');owned(actor,r.customerId);return clone(r);}
  return {reset,product,listProducts,createProduct,updateProduct,deleteProduct,me,updateMe,cart,createCart,addCartItem,updateCartItem,removeCartItem,order,listOrders,createOrder,cancelOrder,shipments,reviews,addReview,createReturn,returnRequest,
    categories:()=>({items:clone(state.categories)}),variants:productId=>{product(productId);return {items:clone(state.variants.filter(v=>v.productId===productId))};},seller:sellerId=>clone(find('sellers',sellerId,'Seller'))};
}
export function entityTag(value){return `"${createHash('sha256').update(JSON.stringify(value)).digest('hex').slice(0,24)}"`;}

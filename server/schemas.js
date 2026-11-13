const ref=name=>({$ref:`#/components/schemas/${name}`});
const str=(description,extra={})=>({type:'string',description,...extra});
const id=str('Opaque identifier. Treat it as a string; do not infer a sequence or business meaning.');
const obj=(properties,required=Object.keys(properties),description='')=>({type:'object',description,properties,required,additionalProperties:false});
const arr=name=>({type:'array',items:ref(name)});
const date=str('UTC timestamp in YYYY-MM-DDTHH:mm:ss.sssZ form.',{format:'date-time'});
const list=name=>obj({items:arr(name)});
const paged=name=>obj({items:arr(name),total:{type:'integer',minimum:0},limit:{type:'integer',minimum:1,maximum:100},offset:{type:'integer',minimum:0}});
const quantity={type:'integer',minimum:1,maximum:99,description:'Quantity to set; not an increment.'};
const inputMoney=obj({amountMinor:{type:'integer',minimum:0,maximum:1000000,description:'Nonnegative integer minor units. Unit prices are capped to keep demo totals within GraphQL Int.'},currency:str('Demo supports INR only.',{enum:['INR']})});
const productWritable={name:str('Product display name.',{minLength:1,maxLength:120}),description:str('Long description. Omitted on create/replace: empty string.',{maxLength:2000,default:''}),sku:str('Unique product SKU.',{minLength:1,maxLength:64}),price:ref('MoneyInput'),priceBeforeMarkdown:{description:'Original price before markdown. May be null; otherwise at least the current price. Omitted on create/replace: null.',anyOf:[ref('MoneyInput'),{type:'null'}],default:null},availability:str('Whether the demo accepts new cart additions.',{enum:['IN_STOCK','OUT_OF_STOCK']}),categoryId:{...id,description:'Existing category ID; see GET /categories.'}};
export const SCHEMAS={
  Money:obj({amountMinor:{type:'integer',minimum:0,maximum:2147483647},currency:str('ISO currency identifier; demo supports INR only.',{enum:['INR']})},undefined,'Integer minor units plus explicit currency. INR has 100 minor units per rupee. Other currencies may have different scales.'),
  MoneyInput:inputMoney,
  ProductInput:obj(productWritable,['name','sku','price','availability','categoryId']),
  ProductPatch:{...obj({...productWritable,description:{...productWritable.description,description:'Changes only when supplied.',default:undefined},priceBeforeMarkdown:{...productWritable.priceBeforeMarkdown,default:undefined}},[],'Omitted fields remain unchanged. Supply at least one field. This is not JSON Patch.'),minProperties:1},
  Product:obj({id,name:productWritable.name,description:str('Product description; may be empty.'),sku:productWritable.sku,price:ref('Money'),priceBeforeMarkdown:{anyOf:[ref('Money'),{type:'null'}],description:'Null when no original markdown price is recorded.'},availability:productWritable.availability,categoryId:id,sellerId:id,createdAt:date}),
  Category:obj({id,name:str('Category name.')}),
  ProductVariant:obj({id,productId:id,sku:str('Read-only variant SKU.'),name:str('Variant name.')}),
  Customer:obj({id,name:str('Customer display name.',{minLength:1,maxLength:120}),email:str('Synthetic example.test address.',{format:'email'})}),
  CustomerPatch:obj({name:str('New display name.',{minLength:1,maxLength:120})}),
  CartItemInput:obj({productId:id,quantity}),QuantityInput:obj({quantity}),
  CartItem:obj({id,productId:id,quantity,product:ref('Product'),unitPrice:ref('Money')}),
  Cart:obj({id,customerId:id,status:str('Cart lifecycle.',{enum:['ACTIVE','CHECKED_OUT']}),items:arr('CartItem'),total:ref('Money')}),
  Address:obj({line1:str('Street address.',{minLength:1,maxLength:120}),city:str('City.',{minLength:1,maxLength:120}),postalCode:str('Postal code as a string; leading zeros are preserved.',{minLength:1,maxLength:120}),country:str('Demo shipping supports IN only.',{enum:['IN']})}),
  OrderInput:obj({cartId:id,shippingAddress:ref('Address')}),
  OrderItem:obj({id,productId:id,name:str('Product name at checkout.'),quantity,unitPrice:ref('Money')}),
  Order:obj({id,customerId:id,cartId:id,status:str('Order lifecycle.',{enum:['CONFIRMED','CANCELLED','DELIVERED']}),items:arr('OrderItem'),total:ref('Money'),shippingAddress:ref('Address'),createdAt:date}),
  CancellationInput:obj({reason:str('Optional cancellation explanation.',{minLength:1,maxLength:500})},[]),
  Shipment:obj({id,orderId:id,status:str('Only the delivered seed shipment is implemented.',{enum:['DELIVERED']}),trackingCode:str('Fictional tracking reference.')}),
  ReviewInput:obj({rating:{type:'integer',minimum:1,maximum:5},comment:str('Review text.',{minLength:1,maxLength:2000})}),
  Review:obj({id,productId:id,customerId:id,rating:{type:'integer',minimum:1,maximum:5},comment:str('Review text.',{minLength:1,maxLength:2000}),createdAt:date}),
  ReturnInput:obj({reason:str('Reason for requesting a whole-order return.',{minLength:1,maxLength:500})}),
  ReturnRequest:obj({id,orderId:id,customerId:id,reason:str('Submitted reason.'),status:str('Only request creation is simulated.',{enum:['REQUESTED']}),createdAt:date}),
  Problem:obj({type:str('Problem type URI; about:blank uses the HTTP status semantics.',{format:'uri'}),title:str('HTTP status title.'),status:{type:'integer',minimum:400,maximum:599},detail:str('Actionable explanation of this occurrence.'),instance:str('Request path for this occurrence.'),code:str('ShopVerse extension: stable machine-readable code.'),fields:{type:'array',items:{type:'string'},description:'ShopVerse extension: affected input fields, when known.'}})
};
for(const [name,base] of Object.entries({ProductPage:'Product',OrderPage:'Order'}))SCHEMAS[name]=paged(base);
for(const [name,base] of Object.entries({VariantList:'ProductVariant',CategoryList:'Category',ReviewList:'Review',ShipmentList:'Shipment'}))SCHEMAS[name]=list(base);

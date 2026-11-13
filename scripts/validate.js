/** Dependency-free validator for the JSON Schema features used by this project.
 * This is deliberately not advertised as a full JSON Schema/OpenAPI validator.
 */
export function validateInstance(value,schema,root,at='$') {
  const errors=[];const add=m=>errors.push(`${at}: ${m}`);
  if(typeof schema==='boolean'){if(!schema)add('Schema forbids this value.');return errors;}
  if(!schema||typeof schema!=='object'){add('Invalid schema.');return errors;}
  if(schema.$ref){const target=schema.$ref.startsWith('#/')?schema.$ref.slice(2).split('/').reduce((v,k)=>v?.[k.replace(/~1/g,'/').replace(/~0/g,'~')],root):undefined;if(!target){add('Unresolved reference '+schema.$ref);return errors;}errors.push(...validateInstance(value,target,root,at));}
  if(schema.anyOf&&!schema.anyOf.some(s=>validateInstance(value,s,root,at).length===0))add('No anyOf alternative matches.');
  if(schema.oneOf&&schema.oneOf.filter(s=>validateInstance(value,s,root,at).length===0).length!==1)add('Expected exactly one oneOf match.');
  if(schema.allOf)for(const s of schema.allOf)errors.push(...validateInstance(value,s,root,at));
  const matches=t=>t==='null'?value===null:t==='object'?value!==null&&typeof value==='object'&&!Array.isArray(value):t==='array'?Array.isArray(value):t==='integer'?Number.isInteger(value):t==='number'?typeof value==='number'&&Number.isFinite(value):typeof value===t;
  if(schema.type&&!(Array.isArray(schema.type)?schema.type:[schema.type]).some(matches)){add('Expected type '+JSON.stringify(schema.type));return errors;}
  if(schema.enum&&!schema.enum.some(v=>JSON.stringify(v)===JSON.stringify(value)))add('Value is not in enum.');
  if(schema.const!==undefined&&JSON.stringify(schema.const)!==JSON.stringify(value))add('Value differs from const.');
  if(typeof value==='string'){
    const n=[...value].length;if(schema.minLength!==undefined&&n<schema.minLength)add('String too short.');if(schema.maxLength!==undefined&&n>schema.maxLength)add('String too long.');if(schema.pattern&&!new RegExp(schema.pattern,'u').test(value))add('Pattern mismatch.');
    if(schema.format==='date-time'&&!Number.isFinite(Date.parse(value)))add('Invalid date-time.');
    if(schema.format==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value))add('Invalid email.');
    if(schema.format==='uri'){try{new URL(value);}catch{add('Invalid URI.');}}
  }
  if(typeof value==='number'){if(schema.minimum!==undefined&&value<schema.minimum)add('Below minimum.');if(schema.maximum!==undefined&&value>schema.maximum)add('Above maximum.');}
  if(Array.isArray(value)){if(schema.minItems!==undefined&&value.length<schema.minItems)add('Too few items.');if(schema.maxItems!==undefined&&value.length>schema.maxItems)add('Too many items.');if(schema.items)value.forEach((v,i)=>errors.push(...validateInstance(v,schema.items,root,`${at}[${i}]`)));}
  if(value&&typeof value==='object'&&!Array.isArray(value)){
    const keys=Object.keys(value);if(schema.minProperties!==undefined&&keys.length<schema.minProperties)add('Too few properties.');
    for(const k of schema.required??[])if(!Object.hasOwn(value,k))add('Missing required '+k);
    for(const [k,v]of Object.entries(value)){if(schema.properties?.[k])errors.push(...validateInstance(v,schema.properties[k],root,at+'.'+k));else if(schema.additionalProperties===false)add('Unknown property '+k);else if(schema.additionalProperties&&typeof schema.additionalProperties==='object')errors.push(...validateInstance(v,schema.additionalProperties,root,at+'.'+k));}
  }
  return errors;
}

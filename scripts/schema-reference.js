/** Extract display metadata from this project's SDL. Not a GraphQL execution engine.
 * Runtime parsing/validation/execution always use the graphql dependency.
 */
export function schemaReference(source) {
  const types=[];
  const declarations=/(?:(?:"""([\s\S]*?)""")\s*)?(scalar|type|input|enum)\s+(\w+)\s*(?:\{([\s\S]*?)\})?/g;
  for(const m of source.matchAll(declarations)) {
    const [,description,kind,name,body='']=m;const item={name,kind,description:description?.trim()||''};
    if(kind==='enum')item.values=body.replace(/"""[\s\S]*?"""/g,'').match(/\b[A-Z][A-Z_0-9]*\b/g)||[];
    if(kind==='type'||kind==='input') {
      item.fields=[];
      const fields=/(?:(?:"""([\s\S]*?)""")\s*)?(\w+)\s*(\([^)]*\))?\s*:\s*([\w\[\]!]+)(?:\s*=\s*([\w".-]+))?/g;
      for(const f of body.matchAll(fields))item.fields.push({name:f[2],type:f[4]+(f[5]?' = '+f[5]:''),args:f[3]||'',description:f[1]?.trim()||''});
    }
    types.push(item);
  }
  return types;
}

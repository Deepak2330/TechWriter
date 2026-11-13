/* Small, dependency-free UI utilities. Imported learning data is never trusted as HTML. */
(() => {
  'use strict';
  const A=window.Academy={};
  A.escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  A.slug=v=>v.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  A.$=(s,root=document)=>root.querySelector(s);
  A.$$=(s,root=document)=>Array.from(root.querySelectorAll(s));
  let timer;A.toast=message=>{const node=A.$('#toast');node.textContent=message;node.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>node.classList.remove('show'),3300);};
  A.copy=async text=>{try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(text);else{const t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.opacity='0';document.body.append(t);t.select();if(!document.execCommand('copy'))throw Error();t.remove();}A.toast('Copied to clipboard.');}catch{A.toast('Clipboard unavailable. Select and copy the text manually.');}};
  A.download=(name,text,type='text/plain')=>{const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);};
  A.code=(text,lang='text')=>`<div class="code-block"><div class="code-label"><span>${A.escape(lang.toUpperCase())}</span><button class="copy-button" type="button">Copy</button></div><pre><code class="language-${A.escape(lang)}">${A.escape(text)}</code></pre></div>`;
  const defaults=()=>({version:1,completed:[],bookmarks:[],notes:{},quiz:{},theme:'light',lastLesson:null});
  A.validateState=input=>{
    if(!input||input.version!==1||typeof input!=='object')throw Error('Unsupported progress file. Expected version 1.');
    const validIds=new Set(window.COURSE.lessons.map(l=>l.id));const out=defaults();
    for(const key of ['completed','bookmarks']){if(!Array.isArray(input[key]))throw Error(`Missing ${key} list.`);out[key]=[...new Set(input[key].filter(id=>validIds.has(id)))];}
    if(input.notes&&typeof input.notes==='object'&&!Array.isArray(input.notes))for(const [id,text]of Object.entries(input.notes))if(validIds.has(id)&&typeof text==='string'&&text.length<=30000)out.notes[id]=text;
    const questions=new Map(window.COURSE.quizzes.map(q=>[q.id,q]));
    if(input.quiz&&typeof input.quiz==='object')for(const [id,value]of Object.entries(input.quiz))if(questions.has(id)&&Number.isInteger(value)&&value>=0&&value<questions.get(id).options.length)out.quiz[id]=value;
    out.theme=input.theme==='dark'?'dark':'light';out.lastLesson=validIds.has(input.lastLesson)?input.lastLesson:null;return out;
  };
  const KEY='api-academy-progress-v1';
  try{const saved=localStorage.getItem(KEY);A.state=saved?A.validateState(JSON.parse(saved)):defaults();}catch{A.state=defaults();}
  A.persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(A.state));return true;}catch{A.toast('Browser storage is unavailable or full. Export your progress before closing.');return false;}};
  A.setTheme=theme=>{A.state.theme=theme;document.documentElement.dataset.theme=theme;const b=A.$('#theme-button');if(b)b.setAttribute('aria-label',`Switch to ${theme==='light'?'dark':'light'} theme`);A.persist();};
  A.inline=text=>{
    const tokens=[];let s=A.escape(text).replace(/`([^`]+)`/g,(_,code)=>{tokens.push(`<code>${code}</code>`);return `\u0000${tokens.length-1}\u0000`;});
    s=s.replace(/\[([^\]]+)\]\(([^\s)]+)\)/g,(_,label,url)=>{const u=url.replace(/&amp;/g,'&');if(!/^(https?:\/\/|#\/|[a-zA-Z0-9_./-]+$)/.test(u)||/^\//.test(u))return label;return `<a href="${A.escape(u)}"${/^https?:/.test(u)?' target="_blank" rel="noopener noreferrer"':''}>${label}</a>`;});
    s=s.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
    return s.replace(/\u0000(\d+)\u0000/g,(_,i)=>tokens[Number(i)]);
  };
  A.markdown=source=>{
    const lines=String(source).replace(/\r/g,'').split('\n');let out='',i=0;const slugs={};
    const heading=text=>{const b=A.slug(text);const n=slugs[b]??0;slugs[b]=n+1;return n?`${b}-${n}`:b;};
    const special=l=>/^\s*$|^#{1,6} |^```|^> |^[-*] |^\d+\. |^---+$|^\|/.test(l);
    while(i<lines.length){const line=lines[i];
      if(!line.trim()){i++;continue;}
      if(line.startsWith('```')){const lang=line.slice(3).trim()||'text';let content=[];i++;while(i<lines.length&&!lines[i].startsWith('```'))content.push(lines[i++]);i++;out+=A.code(content.join('\n'),lang);continue;}
      const h=line.match(/^(#{1,6}) (.+)$/);if(h){out+=`<h${h[1].length} id="${heading(h[2])}">${A.inline(h[2])}</h${h[1].length}>`;i++;continue;}
      if(/^---+$/.test(line)){out+='<hr>';i++;continue;}
      if(line.startsWith('> ')){let q=[];while(i<lines.length&&lines[i].startsWith('> '))q.push(lines[i++].slice(2));out+=`<blockquote><p>${A.inline(q.join(' '))}</p></blockquote>`;continue;}
      if(/^[-*] |^\d+\. /.test(line)){const ordered=/^\d/.test(line),tag=ordered?'ol':'ul';out+=`<${tag}>`;while(i<lines.length&&(ordered?/^\d+\. /:/^[-*] /).test(lines[i]))out+=`<li>${A.inline(lines[i++].replace(/^([-*]|\d+\.) /,''))}</li>`;out+=`</${tag}>`;continue;}
      if(line.startsWith('|')&&i+1<lines.length&&/^\|[\s:|-]+\|\s*$/.test(lines[i+1])){const cells=l=>l.trim().replace(/^\||\|$/g,'').split('|').map(x=>x.trim());out+='<div class="table-wrap"><table><thead><tr>'+cells(line).map(c=>`<th scope="col">${A.inline(c)}</th>`).join('')+'</tr></thead><tbody>';i+=2;while(i<lines.length&&lines[i].startsWith('|'))out+='<tr>'+cells(lines[i++]).map(c=>`<td>${A.inline(c)}</td>`).join('')+'</tr>';out+='</tbody></table></div>';continue;}
      let p=[line];i++;while(i<lines.length&&!special(lines[i]))p.push(lines[i++]);out+=`<p>${A.inline(p.join(' '))}</p>`;
    }return out;
  };
  A.enhance=root=>{
    A.$$('.copy-button',root).forEach(b=>b.addEventListener('click',()=>A.copy(b.closest('.code-block').querySelector('code').textContent)));
    if(window.Prism)Prism.highlightAllUnder(root);
  };
  A.renderProse=text=>`<div class="prose">${A.markdown(text)}</div>`;
})();

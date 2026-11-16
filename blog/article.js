const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const date=s=>{const d=new Date((s||"")+"T12:00:00");return isNaN(d)?s:new Intl.DateTimeFormat("en",{month:"long",day:"numeric",year:"numeric"}).format(d)};
async function init(){
 document.querySelector("#year").textContent=new Date().getFullYear();
 const root=document.querySelector("#article"),slug=new URLSearchParams(location.search).get("slug");
 try{
  if(!slug||!/^[a-z0-9-]+$/i.test(slug))throw Error("Article not found.");
  const r=await fetch("posts.json");if(!r.ok)throw Error("Could not load article list.");
  const data=await r.json(),p=(data.posts||[]).find(x=>x.slug===slug&&x.published!==false);
  if(!p)throw Error("Article not found.");
  const file=await fetch("posts/"+encodeURIComponent(p.file||slug+".md"));if(!file.ok)throw Error("Article content is unavailable.");
  const md=await file.text();marked.setOptions({gfm:true});
  document.title=p.title+" — Majed's Journal";
  document.querySelector('meta[name="description"]')?.setAttribute("content",p.description||"");
  root.innerHTML=`<header class="article-head"><a class="back" href="./">← ALL ARTICLES</a><div class="article-meta">${esc(p.category||"Perspectives")} · ${esc(date(p.date))} · ${Math.max(1,Math.ceil(md.trim().split(/\s+/).length/220))} MIN READ</div><h1>${esc(p.title)}</h1><p class="deck">${esc(p.description||"")}</p><div class="byline">WORDS BY MAJED AL-SHAMMARI</div></header><article class="prose">${DOMPurify.sanitize(marked.parse(md))}</article>`;
 }catch(e){root.innerHTML=`<p class="empty">${esc(e.message)} <br><a class="read" href="./">BACK TO JOURNAL</a></p>`;}
}
init();

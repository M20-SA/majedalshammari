const $=s=>document.querySelector(s);
let posts=[],category="All";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const date=s=>{const d=new Date((s||"")+"T12:00:00");return isNaN(d)?s:new Intl.DateTimeFormat("en",{month:"short",day:"numeric",year:"numeric"}).format(d)};
function render(){
 const q=$("#search").value.toLowerCase().trim();
 const shown=posts.filter(p=>(category==="All"||p.category===category)&&`${p.title} ${p.description} ${p.category} ${(p.tags||[]).join(" ")}`.toLowerCase().includes(q));
 $("#count").textContent=`${posts.length} ${posts.length===1?"POST":"POSTS"}`;
 $("#posts").innerHTML=shown.map(p=>`<article class="post"><div class="post-date">${esc(date(p.date))}</div><div><span class="post-category">${esc(p.category||"Perspectives")}</span><a href="article.html?slug=${encodeURIComponent(p.slug)}"><h3>${esc(p.title)}</h3></a><p>${esc(p.description||"")}</p><a class="read" href="article.html?slug=${encodeURIComponent(p.slug)}">READ ARTICLE ↗</a></div></article>`).join("");
 $("#empty").hidden=shown.length>0;
 $("#empty").textContent=posts.length?"No articles match your search.":"The first article is on its way.";
}
async function init(){
 $("#year").textContent=new Date().getFullYear();
 try{const r=await fetch("posts.json");if(!r.ok)throw Error();const d=await r.json();posts=(d.posts||[]).filter(p=>p.published!==false).sort((a,b)=>(b.date||"").localeCompare(a.date||""));render();}
 catch(e){$("#empty").textContent="Articles could not be loaded.";$("#count").textContent="";$("#posts").innerHTML="";}
 $("#search").addEventListener("input",render);
 $("#categories").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;category=b.dataset.category;document.querySelectorAll(".categories button").forEach(x=>x.classList.toggle("selected",x===b));render();});
}
init();

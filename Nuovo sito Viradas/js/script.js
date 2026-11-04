"use strict";

const VIRADAS_MAP = {
  verita: [
    "Verità",
    "Fare chiarezza su ciò che sta accadendo, distinguendo tra fatti, emozioni e interpretazioni."
  ],
  identita: [
    "Identità",
    "Riappropriarsi dei propri valori, bisogni e desideri, distinguendoli da ciò che non ci appartiene più."
  ],
  relazione: [
    "Relazione",
    "Riconoscere ruoli, aspettative e schemi ricorrenti nella relazione con sé e con gli altri."
  ],
  assertivita: [
    "Assertività",
    "Allenarsi a esprimere bisogni e confini con chiarezza e gentile fermezza, senza aggredire né rinunciare."
  ],
  direzione: [
    "Direzione",
    "Scegliere una direzione e trasformare il desiderio in progetto, passo dopo passo."
  ],
  azione: [
    "Azione",
    "Sperimentare piccoli passi per allargare lo spazio e creare nuove possibilità."
  ],
  svolta: [
    "Svolta",
    "Integrare e consolidare i cambiamenti, in una svolta che trasforma senza travolgere."
  ]
};

async function injectFragment(selector,url){
 const el=document.querySelector(selector);if(!el)return;
 try{const res=await fetch(url);if(!res.ok)throw new Error(`${res.status} ${url}`);el.innerHTML=await res.text();}
 catch(err){console.error('Impossibile caricare il componente:',url,err);el.innerHTML='<p class="wrap" style="padding:12px">Caricamento del componente non riuscito. Apri il sito tramite un server web.</p>';}
}
function initMenu(){
 const button=document.getElementById('menuToggle'), nav=document.getElementById('mainNav');if(!button||!nav)return;
 const close=()=>{nav.classList.remove('open');button.setAttribute('aria-expanded','false');button.textContent='☰';};
 button.addEventListener('click',()=>{const opened=nav.classList.toggle('open');button.setAttribute('aria-expanded',String(opened));button.textContent=opened?'×':'☰';});
 nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
 document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!button.contains(e.target))close();});
 const current=location.pathname.startsWith('/pt/')?'pt':location.pathname.startsWith('/en/')?'en':'it';
 document.querySelectorAll('.langs a').forEach(link=>{if(link.lang===current){link.setAttribute('aria-current','page');link.style.fontWeight='700';}});
}
function initMap(){
 const title=document.getElementById('mapTitle'), text=document.getElementById('mapText');if(!title||!text)return;
 document.querySelectorAll('.map-node').forEach(node=>{
  const choose=()=>{const val=VIRADAS_MAP[node.dataset.key];if(!val)return;document.querySelectorAll('.map-node').forEach(n=>{n.classList.remove('active');n.setAttribute('aria-pressed','false');});node.classList.add('active');node.setAttribute('aria-pressed','true');title.textContent=val[0];text.textContent=val[1];};
  node.addEventListener('click',choose);node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose();}});
 });
}
function initReveal(){
 const els=document.querySelectorAll('.fade');
 const cards=document.querySelectorAll('.offers .offer');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduced || !('IntersectionObserver' in window)){
   els.forEach(e=>e.classList.add('visible'));
   cards.forEach(e=>e.classList.add('card-visible'));
   return;
 }
 document.documentElement.classList.add('motion-ready');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
 }),{threshold:.05,rootMargin:'0px 0px 40px 0px'});
 els.forEach(e=>observer.observe(e));
 const cardObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('card-visible');cardObserver.unobserve(entry.target);}
 }),{threshold:.12,rootMargin:'0px 0px 20px 0px'});
 cards.forEach((card,i)=>{card.style.transitionDelay=`${Math.min(i,3)*130}ms`;cardObserver.observe(card);});
}
function initLegal(){
 const modal=document.getElementById('legalModal'),close=document.getElementById('closeLegal');if(!modal||!close)return;
 const open=()=>{modal.classList.add('open');document.body.style.overflow='hidden';};
 const dismiss=()=>{modal.classList.remove('open');document.body.style.overflow='';};
 document.addEventListener('click',e=>{const link=e.target.closest('.open-legal');if(link){e.preventDefault();open();}});
 close.addEventListener('click',dismiss);modal.addEventListener('click',e=>{if(e.target===modal)dismiss();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))dismiss();});
 if(location.hash==='#legale')open();
}
function loadGA(){
 if(window.viradasGALoaded)return;window.viradasGALoaded=true;
 const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-6FQ76Y8VLX';document.head.appendChild(s);
 window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}window.gtag=gtag;
 gtag('js',new Date());gtag('config','G-6FQ76Y8VLX',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});
}
function initCookie(){
 const banner=document.getElementById('cookie-banner');if(!banner)return;
 let choice=null;try{choice=localStorage.getItem('cookie-consent');}catch(e){}
 if(choice==='accepted')loadGA();else if(!choice)banner.style.display='block';
 const save=value=>{try{localStorage.setItem('cookie-consent',value);}catch(e){}banner.style.display='none';if(value==='accepted')loadGA();};
 document.getElementById('cookie-accept')?.addEventListener('click',()=>save('accepted'));
 document.getElementById('cookie-decline')?.addEventListener('click',()=>save('declined'));
}
function initThanks(){if(new URLSearchParams(location.search).get('sent')==='1'){const p=document.getElementById('thanksPopup');if(p){p.style.display='block';setTimeout(()=>p.style.display='none',6500);}}}
document.addEventListener('DOMContentLoaded',async()=>{
 initMap();initReveal();initThanks();
 await Promise.all([injectFragment('#site-header','./header.html'),injectFragment('#site-footer','./footer.html')]);
 initMenu();initLegal();initCookie();
 const y=document.getElementById('year');if(y)y.textContent=String(new Date().getFullYear());
});

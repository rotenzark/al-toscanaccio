/* ===== AL TOSCANACCIO · main.js ===== */
(function(){
  'use strict';

  /* ---- INTRO ---- */
  var intro=document.getElementById('intro');
  function closeIntro(){ if(intro){intro.classList.add('done');document.body.style.overflow='';} }
  if(intro){
    document.body.style.overflow='hidden';
    var skip=document.getElementById('intro-skip');
    if(skip) skip.addEventListener('click',closeIntro);
    setTimeout(closeIntro,2100);
  }
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches){ if(intro){intro.classList.add('done');document.body.style.overflow='';} }

  /* ---- HEADER scroll ---- */
  var header=document.getElementById('site-header');
  function onScroll(){ if(header) header.classList.toggle('scrolled',window.scrollY>20); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* ---- BURGER ---- */
  var burger=document.getElementById('burger'), nav=document.querySelector('.nav');
  if(burger&&nav){
    burger.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      burger.setAttribute('aria-expanded',open?'true':'false');
    });
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');});});
  }

  /* ---- REVEAL ---- */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.14,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  /* ---- LIGHTBOX ---- */
  var lb=document.getElementById('lightbox'),lbImg=document.getElementById('lb-img'),lbClose=document.getElementById('lb-close');
  document.querySelectorAll('.g-item').forEach(function(it){
    it.addEventListener('click',function(){
      var full=it.getAttribute('data-full'); if(!full)return;
      lbImg.src=full; var im=it.querySelector('img'); lbImg.alt=im?im.alt:''; lb.classList.add('open');
    });
  });
  function closeLb(){lb.classList.remove('open');setTimeout(function(){lbImg.src='';},300);}
  if(lbClose) lbClose.addEventListener('click',closeLb);
  if(lb) lb.addEventListener('click',function(e){if(e.target===lb)closeLb();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lb.classList.contains('open'))closeLb();});

  /* ---- ORARI DINAMICI ---- */
  // getDay: 0=Dom..6=Sab. Finestre [apertura,chiusura] in ore decimali.
  var TABLE={0:[[12,15],[19,23]],1:[[12,15],[19,22.5]],2:[[12,15],[19,22.5]],3:[[12,15],[19,22.5]],4:[[12,15],[19,22.5]],5:[[12,15],[19,23]],6:[[12,15],[19,23]]};
  function nowRome(){
    try{ var s=new Date().toLocaleString('en-US',{timeZone:'Europe/Rome'}); return new Date(s); }
    catch(e){ return new Date(); }
  }
  function fmt(h){var H=Math.floor(h),M=Math.round((h-H)*60);return H+':'+(M<10?'0'+M:''+M);}
  function updateLive(){
    var dot=document.getElementById('live-dot'), txt=document.getElementById('live-text');
    if(!dot||!txt)return;
    var d=nowRome(), day=d.getDay(), hr=d.getHours()+d.getMinutes()/60;
    var wins=TABLE[day]||[], openNow=false, nextOpen=null;
    for(var i=0;i<wins.length;i++){ if(hr>=wins[i][0]&&hr<wins[i][1]){openNow=true;break;} if(hr<wins[i][0]&&nextOpen===null){nextOpen=wins[i][0];} }
    var LANG=document.documentElement.getAttribute('lang')||'it';
    if(openNow){
      var closeAt=0; for(var j=0;j<wins.length;j++){ if(hr>=wins[j][0]&&hr<wins[j][1]){closeAt=wins[j][1];} }
      dot.className='open';
      txt.textContent=(LANG==='en'?'Open now · until ':'Aperto ora · fino alle ')+fmt(closeAt);
    }else if(nextOpen!==null){
      dot.className='closed';
      txt.textContent=(LANG==='en'?'Closed · opens at ':'Chiuso · apre alle ')+fmt(nextOpen);
    }else{
      dot.className='closed';
      txt.textContent=(LANG==='en'?'Closed for today':'Chiuso per oggi');
    }
  }
  updateLive(); setInterval(updateLive,60000);

  /* ---- I18N ---- */
  var EN={
    'intro.skip':'Enter →',
    'brand.sub':'Tuscan trattoria · Sempione',
    'nav.davide':'Meet Davide','nav.lavagna':'The board','nav.tavola':'At the table','nav.dove':'Find us',
    'cta.book':'Book',
    'hero.hand':'a Tuscan trattoria, just like home',
    'hero.sub':'In the Sempione district, Davide’s trattoria: genuine Tuscan cooking, all homemade, with generous portions and honest prices. You walk in and feel right at home — always with a smile.',
    'hero.cta1':'Book a table','hero.cta2':'What’s cooking',
    'hero.live':'Checking hours…','hero.f2':'★ 4.4 · 9.0/10 on TheFork','hero.badge':'Lunch menu €14',
    'davide.kicker':'Meet Davide',
    'davide.h2':'Family-run —<br>and you can tell.',
    'davide.p1':'The heart of the place is <b>Davide</b>: warm, always smiling, he makes you feel at home right away. That’s the soul of Toscanaccio — a real trattoria, where you eat well and have fun, no fuss.',
    'davide.p2':'Tuscan cooking <em>made with the heart</em>: genuine dishes, quality ingredients and <b>generous portions</b>. At the right price — which never hurts these days.',
    'davide.hand':'…and the tiramisù we make on the spot!',
    'lavagna.top':'// Today’s board','lavagna.h2':'What’s on today',
    'lv.1':'Tuscan cured-meat board','lv.2':'House ribollita','lv.3':'Tagliolini with porcini mushrooms','lv.4':'Fiorentina & sliced beef','lv.5':'Mixed fry & catch of the day','lv.6':'Tiramisù made on the spot',
    'lavagna.note':'The board changes daily. Ask Davide for today’s special.',
    'tavola.kicker':'At the table','tavola.h2':'Good food,<br>and plenty of it.',
    'd.1t':'Boards & starters','d.1p':'Tuscan cured meats, crostini and carpaccio to start — generous, as they should be.',
    'd.2t':'Pasta & porcini','d.2p':'Ribollita, tagliolini with porcini and seasonal first courses, all homemade.',
    'd.3t':'Beef & fiorentina','d.3p':'Fiorentina, sliced beef and meat mains: the Tuscan specialty par excellence.',
    'd.4t':'Fish & desserts','d.4p':'Fresh fish, mixed fry and the tiramisù made on the spot to finish.',
    'tavola.note':'The menu changes with the seasons and with whatever’s good at the market.',
    'gallery.kicker':'The trattoria','gallery.h2':'Checkered tablecloths<br>and a homely feel',
    'rev.kicker':'The word on us','rev.h2':'4.4 ★ · “6 stars if I could”',
    'dove.kicker':'Where we are','dove.h2':'In the Sempione district,<br>steps from the Arena.',
    'dove.addr':'Address','dove.addr2':'(corner of Via Piero della Francesca)','dove.hours':'Hours','dove.hoursv':'Every day · lunch 12–15 · dinner 19–22:30 (Fri–Sun until 23)','dove.phone':'Phone','dove.book':'Bookings','dove.bookv':'By phone or online on TheFork.',
    'dove.call':'Book a table','dove.route':'Get directions',
    'faq.h2':'Frequently asked questions',
    'faq.q1':'Where is Al Toscanaccio?','faq.a1':'At Via Privata Chieti 1, on the corner of Via Piero della Francesca, in Milan (Sempione district).',
    'faq.q2':'When are you open?','faq.a2':'Every day for lunch 12–15 and dinner 19–22:30 (until 23 on Friday, Saturday and Sunday).',
    'faq.q3':'What kind of food do you serve?','faq.a3':'Genuine homemade Tuscan cooking: boards, ribollita, tagliolini with porcini, fiorentina, fish and tiramisù made on the spot. Generous portions, honest price.',
    'faq.q4':'How do I book a table?','faq.a4':'Call 02 341895, or book online on TheFork. It’s a family-run, busy spot: better to book.',
    'foot.sub':'Tuscan trattoria · Sempione · Milan',
    'foot.where':'Where','foot.hours':'Hours','foot.hours2':'Lunch 12–15 · Dinner 19–22:30/23','foot.contact':'Contact',
    'foot.disclaimer':'Demo website. Content and photos gathered from public sources (Google Maps); hours, dishes and prices are indicative, to be confirmed with the trattoria.',
    'ab.call':'Book','ab.tavola':'Menu','ab.route':'Directions'
  };
  var IT={}; // IT = DOM di default
  document.querySelectorAll('[data-i18n]').forEach(function(el){ IT[el.getAttribute('data-i18n')]=el.innerHTML; });
  function setLang(lang){
    var dict=lang==='en'?EN:IT;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k=el.getAttribute('data-i18n'); if(dict[k]!=null) el.innerHTML=dict[k]; else if(IT[k]!=null) el.innerHTML=IT[k];
    });
    document.documentElement.setAttribute('lang',lang);
    document.querySelectorAll('.lang button').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-lang')===lang);});
    try{localStorage.setItem('toscanaccio_lang',lang);}catch(e){}
    updateLive();
  }
  document.querySelectorAll('.lang button').forEach(function(b){ b.addEventListener('click',function(){setLang(b.getAttribute('data-lang'));}); });
  var saved='it'; try{saved=localStorage.getItem('toscanaccio_lang')||'it';}catch(e){}
  if(saved==='en') setLang('en');

})();

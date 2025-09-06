
(function(){
  document.addEventListener('DOMContentLoaded', () => { document.body.style.opacity = 1; });
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) { if (saved==='dark') root.classList.add('dark'); }
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { root.classList.add('dark'); }
  const themeBtn = document.getElementById('themeBtn');
  themeBtn?.addEventListener('click', ()=>{
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  });

  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (menuBtn) menuBtn.addEventListener('click', () => mobileNav.classList.toggle('hidden'));

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#mainNav a').forEach(a => {
    if (a.getAttribute('href') === current) { a.classList.add('nav-active'); a.setAttribute('aria-current','page'); }
  });

  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) backTop.classList.remove('hidden'); else backTop.classList.add('hidden');
    });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
  }, { threshold: .15 });
  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  // Cookie consent + GA4
  const consentKey = 'cookie-consent-v1';
  function enableAnalytics(){
    try{
      if (!window.GA_MEASUREMENT_ID || window.gtag) return;
      const s1=document.createElement('script');
      s1.async=true; s1.src='https://www.googletagmanager.com/gtag/js?id='+window.GA_MEASUREMENT_ID;
      document.head.appendChild(s1);
      window.dataLayer=window.dataLayer||[];
      function gtag(){dataLayer.push(arguments);} window.gtag=gtag;
      gtag('js', new Date());
      gtag('config', window.GA_MEASUREMENT_ID, { 'anonymize_ip': true });
    }catch(e){ console.warn('GA init error', e); }
  }
  function renderBanner(){
    if (localStorage.getItem(consentKey)) { if(localStorage.getItem(consentKey)==='all') enableAnalytics(); return; }
    const bar = document.createElement('div');
    bar.id = 'cookieBar';
    bar.className = 'fixed inset-x-0 bottom-0 z-50 bg-slate-900 text-slate-100';
    bar.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-3">
        <p class="text-sm flex-1">Używamy niezbędnych cookies. Analityczne (GA4) włączamy po Twojej zgodzie.</p>
        <div class="flex gap-2">
          <button id="cookieDecline" class="px-3 py-1 rounded border border-slate-600">Tylko niezbędne</button>
          <button id="cookieAccept" class="px-3 py-1 rounded bg-emerald-600 text-white">Akceptuję analityczne</button>
        </div>
      </div>`;
    document.body.appendChild(bar);
    document.getElementById('cookieAccept').addEventListener('click', ()=>{ localStorage.setItem(consentKey, 'all'); document.getElementById('cookieBar').remove(); enableAnalytics(); });
    document.getElementById('cookieDecline').addEventListener('click', ()=>{ localStorage.setItem(consentKey, 'necessary'); document.getElementById('cookieBar').remove(); });
  }
  renderBanner();
  if (localStorage.getItem(consentKey)==='all'){ enableAnalytics(); }
})();

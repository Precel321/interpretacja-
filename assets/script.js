
(function(){
  // Fade-in on load (gentle)
  document.addEventListener('DOMContentLoaded', () => { document.body.style.opacity = 1; });
  // Theme
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) { if (saved==='dark') root.classList.add('dark'); }
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { root.classList.add('dark'); }
  const themeBtn = document.getElementById('themeBtn');
  themeBtn?.addEventListener('click', ()=>{
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  });

  // Mobile nav
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (menuBtn) menuBtn.addEventListener('click', () => mobileNav.classList.toggle('hidden'));

  // Active nav link
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#mainNav a').forEach(a => {
    if (a.getAttribute('href') === current) { a.classList.add('nav-active'); a.setAttribute('aria-current','page'); }
  });

  // Back-to-top
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) backTop.classList.remove('hidden'); else backTop.classList.add('hidden');
    });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Intersection animations
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
  }, { threshold: .15 });
  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  // Testimonials carousel (simple auto-scroll)
  const rail = document.getElementById('testi-rail');
  if (rail) {
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % rail.children.length;
      rail.scrollTo({ left: rail.children[idx].offsetLeft, behavior: 'smooth' });
    }, 4500);
  }

  // Policy modal
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const policies = {
    polityka: { title: 'Polityka prywatności', body: '<p>Administratorem danych jest InterpretacjeIndywidualne.pl. Dane przetwarzamy wyłącznie w celu obsługi zapytania i świadczenia usług.</p>' },
    cookies: { title: 'Polityka cookies', body: '<p>Serwis korzysta z niezbędnych plików cookies. Analityczne/marketingowe (GA4) uruchamiamy po zgodzie.</p>' },
    regulamin: { title: 'Regulamin', body: '<p>Usługi doradcze świadczone są na podstawie umowy po kwalifikacji sprawy.</p>' }
  };
  document.querySelectorAll('.policy-link').forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    const key = e.currentTarget.dataset.policy || (e.currentTarget.getAttribute('href')||'').replace('#','');
    const p = policies[key];
    if (!p) return;
    modalTitle.textContent = p.title;
    modalBody.innerHTML = p.body;
    modal.classList.remove('hidden'); modal.classList.add('flex');
  }));
  modalClose?.addEventListener('click', () => { modal.classList.add('hidden'); modal.classList.remove('flex'); });
  modal?.addEventListener('click', (e) => { if (e.target === modal) modalClose.click(); });

  // Cookie consent + GA4 injection
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
      console.log('GA4 enabled');
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

  // Count-up stats
  const counters = document.querySelectorAll('[data-count]');
  const coi = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el=e.target;
      const target=parseInt(el.getAttribute('data-count'),10)||0;
      let cur=0;
      const step=Math.max(1, Math.ceil(target/90));
      const int=setInterval(()=>{
        cur+=step; if(cur>=target){ cur=target; clearInterval(int); }
        el.textContent=cur.toLocaleString('pl-PL');
      }, 16);
      coi.unobserve(el);
    });
  }, {threshold:.5});
  counters.forEach(el=>coi.observe(el));
})();

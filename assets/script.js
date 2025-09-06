
(function(){
  // Mobile nav
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (menuBtn) menuBtn.addEventListener('click', () => mobileNav.classList.toggle('hidden'));

  // Active nav link
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#mainNav a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('nav-active');
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

  // Testimonials carousel (simple auto-advance)
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
    cookies: { title: 'Polityka cookies', body: '<p>Serwis korzysta z niezbędnych plików cookies. Analityczne/marketingowe uruchamiamy wyłącznie po zgodzie.</p>' },
    regulamin: { title: 'Regulamin', body: '<p>Usługi doradcze świadczone są na podstawie umowy zawartej po wstępnej kwalifikacji sprawy.</p>' }
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

  // Cookie banner
  const consentKey = 'cookie-consent-v1';
  function renderBanner(){
    if (localStorage.getItem(consentKey)) return;
    const bar = document.createElement('div');
    bar.id = 'cookieBar';
    bar.className = 'fixed inset-x-0 bottom-0 z-50 bg-slate-900 text-slate-100';
    bar.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-3">
        <p class="text-sm flex-1">Używamy niezbędnych plików cookies do działania serwisu. Analityczne uruchamiamy po wyrażeniu zgody.</p>
        <div class="flex gap-2">
          <button id="cookieDecline" class="px-3 py-1 rounded border border-slate-600">Tylko niezbędne</button>
          <button id="cookieAccept" class="px-3 py-1 rounded bg-emerald-600 text-white">Akceptuję</button>
        </div>
      </div>`;
    document.body.appendChild(bar);
    document.getElementById('cookieAccept').addEventListener('click', ()=>{ localStorage.setItem(consentKey, 'all'); document.getElementById('cookieBar').remove(); enableAnalytics(); });
    document.getElementById('cookieDecline').addEventListener('click', ()=>{ localStorage.setItem(consentKey, 'necessary'); document.getElementById('cookieBar').remove(); });
  }
  function enableAnalytics(){ /* miejsce na skrypt analityki po zgodzie */ }
  renderBanner();
  if (localStorage.getItem(consentKey)==='all'){ enableAnalytics(); }
})();

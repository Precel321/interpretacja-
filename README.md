
# Interpretacje – v4 (pełny ZIP do GitHub Pages)
- SEO: meta + **JSON-LD** (Organization, WebSite, Breadcrumbs, Service, FAQPage, **Article** dla wpisów).
- Podział usług: KIS / ZUS / GUS / WIS / WIA / pisma (na `interpretacje.html`).
- **Preact** widgety (ESM, bez builda): asystent wyboru wniosku + estymator kosztu.
- GA4 po zgodzie (RODO), dark mode, bottom CTA „Opisz swój problem” na każdej stronie.
- `sitemap.xml`, `robots.txt`, `.nojekyll`, `404.html`, lokalne okładki w `assets/`.

## Wdrożenie na GitHub Pages
1) Repo → **Add file → Upload files** → wrzuć *całą* zawartość z tego ZIP (foldery `assets/` i `assets/logos/` obowiązkowo) → **Commit**.
2) **Settings → Pages**: Deploy from a branch → `main` → Folder: `/ (root)`.
3) W `ga-config.js` wpisz swój **GA4** (`G-...`).
4) W `kontakt.html` i w mini‑formularzu (sekcja „Opisz…”) podmień **Formspree**.
5) Otwórz: https://precel321.github.io/interpretacja-/ (Ctrl+F5).

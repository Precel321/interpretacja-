# interpretacje-www (GitHub Pages)

Jednostronicowa strona do uzyskiwania **interpretacji indywidualnych** (SPA) – gotowa do publikacji na **GitHub Pages**.

## Szybki start (TL;DR)
1. `git init`, `git add .`, `git commit -m "init"`
2. Zmień w `index.html` adres formularza (Formspree) – `action="https://formspree.io/f/ABCDEF"`
3. Wypchnij na GitHub: `git remote add origin https://github.com/TWOJ-LOGIN/interpretacje-www.git` + `git push -u origin main`
4. Włącz Pages: Settings → Pages → Deploy from a branch → Branch: `main` → `/ (root)`
5. Wejdź na: `https://TWOJ-LOGIN.github.io/interpretacje-www/`

## Formularz (Formspree)
Wejdź na https://formspree.io/ i załóż darmowe konto. Otrzymasz endpoint w formacie:
```
https://formspree.io/f/ABCDEF
```
Wklej go do atrybutu `action` formularza w `index.html`.

## SEO
- `robots.txt` i `sitemap.xml` już są – w sitemap ustaw swój login w adresie.
- Dodaj własne obrazy/miniatury pod OpenGraph jeżeli chcesz (sekcja TODO w index.html).

# Kontaktní formulář

Formulář na `/kontakt` odesílá data na Cloudflare Pages Function `functions/api/kontakt.js` (adresa `/api/kontakt`). Web na kovarik.us běží na GitHub Pages, proto formulář tam volá funkci na `https://web-kovarik.pages.dev/api/kontakt` přes CORS (na `*.pages.dev` a lokálně se volá stejná doména). Funkce zprávu zkontroluje a pošle e-mailem na `team@kovarik.us` přes SMTP (`smtp.webhosting.fm`, port 587, STARTTLS). Nepoužívá se n8n ani služba třetí strany (kromě volitelného Cloudflare Turnstile).

## Jak to funguje

1. Po načtení stránky formulář zavolá `GET /api/kontakt` a dostane podepsaný čas načtení (`t`, `sig`).
2. Po odeslání pošle `POST /api/kontakt` s JSON: `name`, `email`, `company`, `topic`, `message`, `website`, `t`, `sig`, `turnstile`.
3. Funkce provede kontroly (viz níže) a e-mail odešle. Odpověď je `{"ok": true}` nebo `{"ok": false, "error": "..."}`.
4. Pokud funkce není nastavená (chybí heslo, odpověď 503) nebo je nedostupná, formulář návštěvníkovi otevře jeho e-mailový program s předvyplněnou zprávou.

## Ochrana proti robotům a zneužití

| Ochrana | Jak funguje |
|---|---|
| Skryté pole `website` | Robot ho vyplní. Funkce odpoví „ok“, ale nic neodešle. |
| Podepsaný čas načtení | Token `t` + `sig` (HMAC-SHA256). Bez platného podpisu je odpověď 400, starší než 2 hodiny také. |
| Minimální doba vyplnění | Odeslání dříve než za 3 sekundy od načtení se odmítne (429). |
| Omezení počtu odeslání | 5 zpráv za hodinu z jedné IP adresy (v rámci jedné instance funkce). |
| Kontrola původu | Požadavek s hlavičkou `Origin` mimo kovarik.us, localhost a `*.pages.dev` se odmítne (403). CORS (včetně předběžného `OPTIONS`) povoluje jen `https://kovarik.us`, `https://www.kovarik.us` a `https://*.pages.dev`. |
| Kontrola vstupu | Povinné jméno, platný e-mail a zpráva. Omezené délky polí. Z hlaviček e-mailu se odstraňují nové řádky (ochrana proti vkládání dalších příjemců). |
| Cloudflare Turnstile (volitelné) | Zapne se doplněním dvou proměnných (viz dále). |

## Nastavení v Cloudflare

Funkce běží v Cloudflare Pages projektu `web-kovarik` napojeném na GitHub repozitář `bonkerbrno/web-kovarik` (nové nasazení při každém sloučení do `main`, náhled pro pull request). Konfigurace je v `wrangler.toml` (výstup `dist`, příznak `nodejs_compat`). Samotný web kovarik.us dál běží na GitHub Pages (`.github/workflows/deploy.yml`), Cloudflare slouží jen pro funkci formuláře. Celkové zapojení popisuje `docs/Dokumentace-po-napojeni-na-Cloudflare.md`.

### Proměnné a tajné hodnoty

Nastavují se v Cloudflare: Workers & Pages, projekt `web-kovarik`, Settings, Variables and Secrets (Production, případně i Preview). Heslo patří **pouze sem** jako typ Secret, nikdy do repozitáře. Po změně je potřeba nové nasazení.

| Proměnná | Povinná | Hodnota |
|---|---|---|
| `SMTP_USER` | ano | přihlašovací jméno k poštovnímu účtu (e-mailová adresa u smtp.webhosting.fm) |
| `SMTP_PASS` | ano | heslo k tomuto účtu (Secret) |
| `SMTP_HOST` | ne | výchozí `smtp.webhosting.fm` |
| `SMTP_PORT` | ne | výchozí `587` (STARTTLS, spojení se po navázání přepne na šifrované) |
| `MAIL_TO` | ne | výchozí `team@kovarik.us` |
| `MAIL_FROM` | ne | výchozí `SMTP_USER`. Server obvykle povolí jen adresu patřící k účtu. |
| `FORM_SECRET` | ne | libovolný dlouhý náhodný řetězec pro podpis tokenu. Když chybí, použije se `SMTP_PASS`. |
| `TURNSTILE_SECRET` | ne | tajný klíč Cloudflare Turnstile. Když je nastavený, funkce ověřuje každé odeslání. |
| `PUBLIC_TURNSTILE_SITE_KEY` | ne | veřejný klíč Turnstile. Čte se při sestavení webu (proměnná buildu), po změně je nutné nové nasazení. Musí být nastavený spolu s `TURNSTILE_SECRET`. |

### Postup nastavení (krok za krokem)

1. Cloudflare, Workers & Pages, Create, Pages, Connect to Git, repozitář `bonkerbrno/web-kovarik`, větev `main`.
2. Build command `npm run build`, output directory `dist`, proměnná buildu `NODE_VERSION` = `22`.
3. Po prvním nasazení v Settings, Variables and Secrets přidat `SMTP_USER` a `SMTP_PASS` (Secret) pro Production i Preview.
4. Deployments, u posledního nasazení Retry deployment. Proměnné se do hotového nasazení nepropíšou samy.
5. Ověřit podle části „Ověření po nasazení“.

Doména kovarik.us se do Cloudflare **nepřidává** (nameservery u registrátora nejdou změnit). Web zůstává na GitHub Pages a formulář volá funkci na `web-kovarik.pages.dev` přes CORS. Tento stav je nastavený a funkční od 7. 10. 2026.

## Zapnutí Cloudflare Turnstile (později)

1. V Cloudflare (zdarma) vytvořte Turnstile widget pro doménu `kovarik.us`.
2. V projektu doplňte `PUBLIC_TURNSTILE_SITE_KEY` (proměnná buildu) a `TURNSTILE_SECRET` (Secret), pak nové nasazení.
3. Na formuláři se objeví ověření a funkce začne každé odeslání kontrolovat.

## Ověření po nasazení

1. Otevřít `https://web-kovarik.pages.dev/api/kontakt`. Správná odpověď je JSON s `t` a `sig`. Odpověď `{"ok":false,"error":"not_configured"}` znamená, že chybí `SMTP_PASS` nebo `FORM_SECRET`.
2. Odeslat zkušební zprávu z `/kontakt` a zkontrolovat doručení na `team@kovarik.us`.
3. Při chybě 502 (`send_failed`) se v logu funkce (Cloudflare, projekt, Functions, Real-time logs) objeví kód chyby SMTP. Nejčastější příčiny jsou špatné heslo nebo adresa odesílatele, kterou server nepovoluje.

## Soubory

- `functions/api/kontakt.js`: funkce (testovatelná továrna `createHandler`, SMTP přes knihovnu `worker-mailer`).
- `wrangler.toml`: nastavení Cloudflare Pages.
- `src/pages/kontakt.astro`: formulář a skript na straně prohlížeče.
- `src/config/contact.ts`: adresa funkce a veřejný klíč Turnstile.
- `n8n/kontaktni-formular.json`: původní workflow, už se nepoužívá.

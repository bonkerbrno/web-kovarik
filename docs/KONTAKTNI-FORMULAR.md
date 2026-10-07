# Kontaktní formulář

Formulář na `/kontakt` odesílá data na vlastní Vercel Function `api/kontakt.js` (adresa `/api/kontakt`, stejná doména jako web). Funkce zprávu zkontroluje a pošle e-mailem na `team@kovarik.us` přes SMTP. Nepoužívá se n8n ani služba třetí strany (kromě volitelného Cloudflare Turnstile).

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
| Kontrola původu | Požadavek s hlavičkou `Origin` mimo kovarik.us, localhost a `*.vercel.app` se odmítne (403). |
| Kontrola vstupu | Povinné jméno, platný e-mail a zpráva. Omezené délky polí. Z hlaviček e-mailu se odstraňují nové řádky (ochrana proti vkládání dalších příjemců). |
| Cloudflare Turnstile (volitelné) | Zapne se doplněním dvou proměnných (viz dále). |

## Proměnné prostředí ve Vercelu

Nastavují se ve Vercelu: Project, Settings, Environment Variables (Production, případně i Preview). Heslo patří **pouze sem**, nikdy do repozitáře. Po změně proměnných je potřeba nové nasazení (Redeploy).

| Proměnná | Povinná | Hodnota |
|---|---|---|
| `SMTP_USER` | ano | přihlašovací jméno k poštovnímu účtu (e-mailová adresa u smtp.webhosting.fm) |
| `SMTP_PASS` | ano | heslo k tomuto účtu (typ Sensitive) |
| `SMTP_HOST` | ne | výchozí `smtp.webhosting.fm` |
| `SMTP_PORT` | ne | výchozí `587` (STARTTLS, spojení se po navázání přepne na šifrované) |
| `MAIL_TO` | ne | výchozí `team@kovarik.us` |
| `MAIL_FROM` | ne | výchozí `SMTP_USER`. Server obvykle povolí jen adresu patřící k účtu. |
| `FORM_SECRET` | ne | libovolný dlouhý náhodný řetězec pro podpis tokenu. Když chybí, použije se `SMTP_PASS`. |
| `TURNSTILE_SECRET` | ne | tajný klíč Cloudflare Turnstile. Když je nastavený, funkce ověřuje každé odeslání. |
| `PUBLIC_TURNSTILE_SITE_KEY` | ne | veřejný klíč Turnstile. Čte se při sestavení webu, takže po změně je nutný Redeploy. Musí být nastavený spolu s `TURNSTILE_SECRET`. |

### Postup nastavení ve Vercelu (krok za krokem)

1. Vercel, projekt navázaný na repozitář `bonkerbrno/web-kovarik`, Settings, Environment Variables.
2. Přidat `SMTP_USER` (Production + Preview) a `SMTP_PASS` (Production + Preview, typ Sensitive).
3. Volitelně přidat `FORM_SECRET` (dlouhý náhodný řetězec).
4. Deployments, u posledního nasazení Redeploy (bez použití cache). Proměnné se do již hotového nasazení nepropíšou samy.
5. Ověřit podle části „Ověření po nasazení“.

Hostitel webu je Vercel (napojený na GitHub, nasazení při každém sloučení do `main`). Workflow `.github/workflows/deploy.yml` pro GitHub Pages je pozůstatek a pro web neplatí. Složka `api/` se na Vercelu automaticky stane funkcemi, žádný `vercel.json` není potřeba.

## Zapnutí Cloudflare Turnstile (později)

1. V Cloudflare (zdarma) vytvořte Turnstile widget pro doménu `kovarik.us`.
2. Ve Vercelu doplňte `PUBLIC_TURNSTILE_SITE_KEY` a `TURNSTILE_SECRET`, pak Redeploy.
3. Na formuláři se objeví ověření a funkce začne každé odeslání kontrolovat.

## Ověření po nasazení

1. Otevřít `https://kovarik.us/api/kontakt`. Správná odpověď je JSON s `t` a `sig`. Odpověď `{"ok":false,"error":"not_configured"}` znamená, že chybí `SMTP_PASS` nebo `FORM_SECRET`.
2. Odeslat zkušební zprávu z `/kontakt` a zkontrolovat doručení na `team@kovarik.us`.
3. Při chybě 502 (`send_failed`) se v logu funkce (Vercel, Logs) objeví kód chyby SMTP. Nejčastější příčiny jsou špatné heslo nebo adresa odesílatele, kterou server nepovoluje.

## Soubory

- `api/kontakt.js`: funkce (testovatelná továrna `createHandler`).
- `src/pages/kontakt.astro`: formulář a skript na straně prohlížeče.
- `src/config/contact.ts`: adresa funkce a veřejný klíč Turnstile.
- `n8n/kontaktni-formular.json`: původní workflow, už se nepoužívá.

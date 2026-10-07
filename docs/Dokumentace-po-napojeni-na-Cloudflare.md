# Dokumentace po napojení na Cloudflare (web kovarik.us a administrace)

**Stav k 7. 10. 2026.** Stručná verze projektové dokumentace: zapojení, průběh změn, tajné hodnoty (jen názvy), poruchy a úklid. Formulář podrobně: `docs/KONTAKTNI-FORMULAR.md`. Popisuje, co kde běží, co je na co napojené, jak a jak často se web mění, kde jsou tajné hodnoty, co dělat při poruše a co zbývá uklidit.

Značky ve výkladu:
- **(ověřeno v kódu)** = vyčteno z repozitářů nebo z historie GitHub Actions.
- **(neověřeno z cloudu)** = převzato z nastavení, které provedl Stanley nebo jiná vlákna. Claude v cloudu se na kovarik.us, `*.pages.dev` ani `*.vercel.app` nedostane (blokuje to proxy), takže to nemohl sám zkontrolovat.

---

## 1. Rychlý přehled

| Co | Kde | Poznámka |
|---|---|---|
| Veřejný web | https://kovarik.us | GitHub Pages, statický web (Astro) |
| Zdrojový kód webu | https://github.com/bonkerbrno/web-kovarik | veřejný repozitář, větev `main` = produkce |
| Kontaktní formulář (funkce) | https://web-kovarik.pages.dev/api/kontakt | Cloudflare Pages Function, projekt `web-kovarik` |
| Administrace textů | https://web-kovarik-admin.pages.dev/keystatic | Keystatic na Cloudflare Pages, projekt `web-kovarik-admin` |
| Zdrojový kód administrace | https://github.com/bonkerbrno/web-kovarik-admin | soukromý repozitář |
| Stará administrace (zatím běží) | https://web-kovarik-admin.vercel.app/keystatic | Vercel, k vypnutí až na pokyn |
| DNS zóna kovarik.us | panel ISPConfig u webhosting.fm | NS `ns1.we.cz`, mění jen Stanley ručně |
| Pošta | team@kovarik.us | MX `ms1.we.cz` / `ms2.we.cz`, SMTP `smtp.webhosting.fm:587` |

---

## 2. Jak je to celé zapojené

### 2.1 Schéma

```
                         ┌──────────────────────────────┐
  Návštěvník ──────────▶ │ DNS kovarik.us (webhosting.fm│
  (prohlížeč)            │ ISPConfig, NS ns1.we.cz)     │
       │                 │ 3× A záznam → GitHub Pages   │
       │                 │ MX → ms1/ms2.we.cz (pošta)   │
       │                 └──────────────┬───────────────┘
       ▼                                ▼
  ┌──────────────────────────┐   ┌────────────────────────────┐
  │ GitHub Pages             │   │ Cloudflare Pages           │
  │ https://kovarik.us       │   │ projekt web-kovarik        │
  │ statické HTML/CSS/obrázky│   │ https://web-kovarik.pages.dev
  └──────────▲───────────────┘   │  • kopie webu (jen záloha/náhled)
             │ deploy.yml        │  • functions/api/kontakt.js ◀── formulář
             │ (GitHub Actions)  └──────────▲───────┬─────────┘
             │                              │       │ SMTP 587 STARTTLS
  ┌──────────┴──────────────────────────────┴──┐    ▼
  │ GitHub repozitář bonkerbrno/web-kovarik    │  smtp.webhosting.fm
  │ větev main = produkce                      │    │
  │ src/content/** = texty (YAML, Markdown)    │    ▼
  │ keystatic.config.ts = definice polí        │  team@kovarik.us
  └──────────▲──────────────────────┬──────────┘
             │ commit při uložení   │ stažení keystatic.config.ts
             │ (GitHub API)         │ + src/lib/icons.ts při buildu
  ┌──────────┴──────────────────────▼──────────┐
  │ Administrace Keystatic                     │
  │ repozitář bonkerbrno/web-kovarik-admin     │
  │ Cloudflare Pages: web-kovarik-admin.pages.dev/keystatic
  │ (a zatím i Vercel: web-kovarik-admin.vercel.app)
  │ přihlášení přes GitHub App web-kovarik-admin-app
  └────────────────────────────────────────────┘
```

Formulář na stránce `https://kovarik.us/kontakt` se z prohlížeče návštěvníka obrací přímo na `https://web-kovarik.pages.dev/api/kontakt` (cizí doména, proto CORS). Na `*.pages.dev` a lokálně volá stejnou doménu (`/api/kontakt`). (ověřeno v kódu: `src/config/contact.ts`, `src/pages/kontakt.astro`, `functions/api/kontakt.js`)

### 2.2 Jednotlivé části

**Web (bonkerbrno/web-kovarik)** (ověřeno v kódu)
- Astro 5, `output: 'static'`, Tailwind 3, ikony Tabler přes `astro-icon`. `site: 'https://kovarik.us'`, kanonické odkazy vedou vždy na kovarik.us (i na kopii na pages.dev).
- Texty jsou soubory v repozitáři: stránky `src/content/pages/*.yaml`, blog `src/content/blog/*.md`.
- Keystatic je ve webu jen pro lokální vývoj (`npm run dev`, `storage: local`). V produkčním buildu se nezapíná.
- Obsahuje i Cloudflare Pages Function `functions/api/kontakt.js` a `wrangler.toml` (výstup `./dist`, `nodejs_compat`). GitHub Pages funkci ignoruje, běží jen na Cloudflare.

**GitHub Pages = produkční web** (workflow ověřeno, doména neověřena z cloudu)
- `.github/workflows/deploy.yml`: při každém push do `main` (a ručně tlačítkem Run workflow) se nainstaluje Node 22, spustí `npm run build` a obsah `dist` se nasadí na GitHub Pages.
- Vlastní doména kovarik.us je nastavená v GitHub, Settings, Pages (soubor CNAME v repozitáři není, u nasazení přes Actions není potřeba).
- DNS: 3 A záznamy kovarik.us míří na GitHub Pages (od 7. 10. 2026 16:20 UTC).

**Cloudflare Pages, projekt `web-kovarik` = kontaktní formulář** (neověřeno z cloudu)
- Napojeno na Git (repozitář web-kovarik, větev `main`), build `npm run build`, výstup `dist`, proměnná `NODE_VERSION=22`.
- Při každém push do `main` se znovu sestaví web i funkce. Pro pull requesty Cloudflare standardně dělá náhledová nasazení.
- Web na `web-kovarik.pages.dev` je jen vedlejší kopie. Doména kovarik.us sem nevede.
- Neaktivní zóna kovarik.us v Cloudflare existuje, ale **nepoužívá se** (nameservery u registrátora Stanley změnit nemůže).

**Administrace (bonkerbrno/web-kovarik-admin)** (ověřeno v kódu)
- Astro 5, `output: 'server'`, React, Keystatic. Úložiště `github`, repozitář `bonkerbrno/web-kovarik`: každé uložení v administraci vytvoří commit přímo do `main` webu.
- Adaptér se volí podle prostředí: na Cloudflare (proměnná `CF_PAGES=1`) `@astrojs/cloudflare`, jinde `@astrojs/vercel`. Stejný kód tak běží na obou místech.
- Definici polí si administrace **nestahuje ručně**: `npm run build` nejdřív spustí `scripts/fetch-site-config.mjs`, který z `main` webu stáhne `keystatic.config.ts` (uloží jako `keystatic.site.config.ts`) a `src/lib/icons.ts`. Vlastní `keystatic.config.ts` admina jen převezme pole a vymění úložiště na GitHub (zavedeno PR #3 v adminu).
- `.github/workflows/redeploy-on-site-config.yml` běží **každých 30 minut**. Zjistí poslední commit, který ve webu změnil `keystatic.config.ts` nebo `src/lib/icons.ts`, a zapíše ho do `site-config-version.txt`. Když se liší, commitne to (zpráva „Nová pole na webu: přestavět administraci“) a tím spustí nové sestavení admina na Cloudflare i Vercelu.
- Přihlášení: GitHub App `web-kovarik-admin-app` (callbacky pro pages.dev i vercel.app). Uživatel musí mít zápis do repozitáře web-kovarik. (neověřeno z cloudu)

**DNS a pošta** (neověřeno z cloudu)
- Zóna kovarik.us je v panelu ISPConfig u webhosting.fm, nameservery `ns1.we.cz`.
- Záznamy: 3× A na GitHub Pages, MX `ms1.we.cz` (priorita 10) a `ms2.we.cz` (50), SPF `v=spf1 mx a ip4:91.226.216.0/24 ~all`, `_dmarc` s `p=quarantine`.
- Formulář posílá poštu přes `smtp.webhosting.fm` s přihlášením účtem `team@kovarik.us`, takže SPF a DMARC projdou (odesílá poštovní server domény).

---

## 3. Jak a jak často se web mění

### 3.1 Úprava textu v administraci (nejčastější)

1. Stanley otevře https://web-kovarik-admin.pages.dev/keystatic, přihlásí se přes GitHub a upraví text nebo článek.
2. **Uložit** = Keystatic přes GitHub API zapíše commit do `main` repozitáře web-kovarik (autor je Stanleyho GitHub účet). Nejde přes pull request, nečeká se na „sluč“.
3. Tento commit spustí paralelně:
   - **GitHub Actions `deploy.yml`** → nový produkční web na kovarik.us. Dnešní běhy trvaly **40 až 60 sekund** (ověřeno v historii Actions). GitHub Pages a prohlížeče drží starou verzi v mezipaměti až cca 10 minut, takže změna může být vidět o pár minut později (pomůže Ctrl+F5).
   - **Cloudflare Pages `web-kovarik`** → nové sestavení kopie a funkce formuláře (obvykle 1 až 3 minuty, neověřeno z cloudu). Na kovarik.us to vliv nemá, jen zbytečně běží.
   - Pokud je ve Vercelu stále napojený projekt `web-kovarik`, sestaví se i tam (neověřeno, na produkci vliv nemá).
4. Administrace se při úpravě textu **nepřestavuje** (není potřeba, texty čte živě z GitHubu).

Četnost: kdykoli Stanley uloží. Každé uložení = jeden commit = jedno nasazení. Více uložení rychle po sobě se zařadí do fronty (`concurrency: pages`), nasadí se postupně.

### 3.2 Změna vzhledu nebo kódu webu (přes Claude)

1. Claude udělá změnu ve větvi a otevře pull request (PR) do `main`.
2. Na PR se spouští jen náhled Cloudflare Pages (pokud je zapnutý). GitHub Pages se z PR nenasazuje.
3. **Slučuje se až poté, co Stanley napíše „sluč“** (výjimky výslovně povolil jen u PR #4 a #5).
4. Sloučení = commit do `main` → stejný průběh jako v 3.1 (GitHub Pages do 1 minuty, Cloudflare souběžně).

Četnost: podle potřeby, v řádu jednotek PR týdně v období úprav.

### 3.3 Nová nebo změněná pole administrace

Když PR ve webu změní `keystatic.config.ts` nebo `src/lib/icons.ts`:
1. Po sloučení se web nasadí hned (3.1).
2. Do **30 minut** (plus případné zpoždění plánovače GitHubu) workflow v adminu zjistí změnu a commitne `site-config-version.txt`.
3. Cloudflare (a Vercel) admina sestaví znovu, při buildu si stáhne novou definici polí (1 až 3 minuty, neověřeno).
4. Než se to stane, může administrace hlásit chybu typu „Key on object value … is not allowed“. Zrychlení: v repozitáři web-kovarik-admin, záložka Actions, workflow „Redeploy when the website's CMS fields change“, tlačítko **Run workflow**.

### 3.4 Změna kontaktního formuláře

Kód funkce (`functions/api/kontakt.js`) se nasazuje jen přes Cloudflare Pages po sloučení do `main`. Stránka formuláře (`src/pages/kontakt.astro`) jde na kovarik.us přes GitHub Pages. Obojí se tedy nasadí ze stejného commitu, Cloudflare obvykle o chvíli později.

Změna proměnných v Cloudflare (heslo, příjemce) se projeví **až po novém nasazení** (Deployments, Retry deployment).

### 3.5 Změna DNS

Dělá jen Stanley ručně v panelu ISPConfig u webhosting.fm. Projeví se podle TTL záznamů (minuty až hodiny). MX, SPF a DMARC záznamy pošty se při změnách webu nemění.

### 3.6 Automatické úlohy (bez zásahu člověka)

| Úloha | Kde | Jak často | Co dělá |
|---|---|---|---|
| Kontrola polí administrace | web-kovarik-admin, Actions | každých 30 min | při změně polí ve webu spustí přestavbu admina |
| Nasazení webu | web-kovarik, Actions | při každém push do `main` | build a nasazení na GitHub Pages |
| Build Cloudflare `web-kovarik` | Cloudflare Pages | při každém push do `main` (a PR) | kopie webu + funkce formuláře |
| Build Cloudflare `web-kovarik-admin` | Cloudflare Pages | při každém push do `main` admina | administrace |

---

## 4. Kde jsou tajné hodnoty

Hodnoty se nikdy nezapisují do repozitáře, dokumentace ani paměti Claude. Níže jsou jen názvy.

| Proměnná | Kde je uložená | K čemu |
|---|---|---|
| `SMTP_USER`, `SMTP_PASS` | Cloudflare, projekt `web-kovarik`, Settings, Variables and Secrets | přihlášení k SMTP pro formulář |
| `SMTP_HOST`, `SMTP_PORT`, `MAIL_TO`, `MAIL_FROM`, `FORM_SECRET` | tamtéž (volitelné, mají výchozí hodnoty) | úprava odesílání, podpis tokenu |
| `TURNSTILE_SECRET`, `PUBLIC_TURNSTILE_SITE_KEY` | tamtéž (zatím nenastaveno) | volitelné ověření proti robotům |
| `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | Cloudflare, projekt `web-kovarik-admin` (šifrovaně) a zvlášť ve Vercelu u staré administrace | přihlášení do administrace přes GitHub App |
| `NODE_VERSION=22` | oba projekty v Cloudflare | verze Node pro build (není tajná) |
| Klíče GitHub App `web-kovarik-admin-app` | GitHub, Settings, Developer settings, GitHub Apps | přihlášení do administrace |
| Heslo k poště team@kovarik.us | webhosting.fm (ISPConfig) | stejné heslo jako `SMTP_PASS` |

Vzor proměnných formuláře (bez hodnot) je v repozitáři v `.env.example`.

---

## 5. Kdo co může měnit

| Oblast | Kdo | Jak |
|---|---|---|
| Texty a články | Stanley (kdokoli se zápisem do repozitáře web-kovarik) | administrace, rovnou do produkce |
| Kód a vzhled webu | Claude připraví PR, Stanley schválí slovem „sluč“ | GitHub PR |
| Kód administrace | Claude připraví PR, Stanley schválí | GitHub PR v web-kovarik-admin |
| DNS (A, MX, SPF, DMARC) | jen Stanley ručně | ISPConfig u webhosting.fm. Claude to nemění (na Stanleyho PC to blokují pravidla). |
| Proměnné a hesla v Cloudflare, Vercelu | Stanley | webová konzole. Claude hesla do formulářů nezadává. |
| Nastavení GitHub Pages, GitHub App | Stanley | nastavení na GitHubu |

---

## 6. Poruchy a co zkontrolovat

| Příznak | Pravděpodobná příčina | Co zkontrolovat |
|---|---|---|
| Uložený text se na webu neobjevil | build selhal nebo stará mezipaměť | GitHub, web-kovarik, Actions: poslední běh „Deploy to GitHub Pages“ (zelený?). Počkat pár minut, Ctrl+F5. |
| Build na GitHubu červený | chyba v obsahu (např. neplatné pole v YAML) nebo v kódu | log běhu v Actions. Často pomůže vrátit poslední úpravu v administraci. |
| Administrace hlásí „Key … is not allowed“ | admin má starší definici polí než web | v web-kovarik-admin, Actions spustit „Redeploy when the website's CMS fields change“, pak počkat na build v Cloudflare. |
| Do administrace se nejde přihlásit | GitHub App, callback URL nebo proměnné `KEYSTATIC_*` | Cloudflare `web-kovarik-admin`, proměnné. GitHub App `web-kovarik-admin-app`, callback na pages.dev. |
| Formulář otevře e-mailový program místo odeslání | funkce vrací 503 (chybí `SMTP_PASS` nebo `FORM_SECRET`) nebo je nedostupná | otevřít `https://web-kovarik.pages.dev/api/kontakt`. Správně je JSON s `t` a `sig`. |
| Formulář hlásí chybu odeslání (502) | SMTP odmítlo přihlášení nebo odesílatele | Cloudflare, `web-kovarik`, Functions, Real-time logs. Heslo k team@kovarik.us. |
| Formulář hlásí 403 | odesláno z nepovolené domény | povolené jsou kovarik.us, www.kovarik.us, `*.pages.dev`, localhost. |
| Web nejde vůbec | DNS nebo GitHub Pages | A záznamy v ISPConfig, GitHub, Settings, Pages (doména a certifikát). |
| Nechodí pošta na team@kovarik.us | MX záznamy nebo schránka | MX v ISPConfig musí zůstat `ms1/ms2.we.cz`. |

---

## 7. Pozůstatky k úklidu (jen na Stanleyho pokyn)

| Co | Proč zbylo | Riziko při ponechání |
|---|---|---|
| Stará administrace na Vercelu (`web-kovarik-admin.vercel.app`) | běží souběžně s novou na Cloudflare | dvě místa se stejným přístupem, starší tajný klíč GitHub App |
| Vercel projekt `web-kovarik` | dřívější pokus o hosting a formulář | zbytečné buildy při každém commitu |
| Neaktivní zóna kovarik.us v Cloudflare | nepovedený přesun nameserverů | žádné, jen nepořádek |
| Starý VPS z opuštěného plánu hostingu (nginx blok, složka webu, služba API a soubor s proměnnými) | opuštěný plán hostingu na VPS | soubor s proměnnými může obsahovat heslo k SMTP. Ostatní služby na VPS se nesmí rušit. Podrobnosti jsou v projektové dokumentaci mimo veřejný repozitář. |
| `n8n/kontaktni-formular.json` ve webu | původní formulář přes n8n | žádné, jen záloha |
| Kopie webu na `web-kovarik.pages.dev` | Cloudflare sestavuje celý web kvůli funkci | žádné pro SEO (kanonické odkazy vedou na kovarik.us) |

Pozor: projekt `web-kovarik` v Cloudflare **není** pozůstatek, běží v něm kontaktní formulář.

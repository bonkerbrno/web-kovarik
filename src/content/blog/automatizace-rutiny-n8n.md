---
title: "Jak jsem automatizoval 3 hodiny denní rutiny pomocí n8n"
description: "Praktický návod, jak nastavit n8n workflow, které za vás každý den zpracovává e-maily, generuje reporty a aktualizuje CRM — bez jediného řádku kódu."
pubDate: 2025-01-15
author: "Ing. Stanislav Kovařík"
tags: ["n8n", "automatizace", "workflow", "produktivita"]
draft: false
---

Každý den jsem trávil přibližně 3 hodiny na opakujících se úkolech: třídění e-mailů od klientů, ruční přepis dat do CRM, generování týdenních reportů a odesílání statusových zpráv. Klasické stojatá voda.

## Problém: Čas strávený rutinou je čas ztracený pro strategii

Jako procesní konzultant vím, že každá opakující se manuální činnost je kandidát na automatizaci. Přesto jsem sám spadl do pasti — dělal jsem to proto, že "vím jak" a bylo to pohodlné.

Zlom přišel, když jsem počítal: 3 hodiny denně × 22 pracovních dní = **66 hodin měsíčně**. Téměř dva pracovní týdny věnované rutině.

## Řešení: n8n workflow v 5 blocích

n8n je open-source nástroj pro automatizaci pracovních postupů. Na rozdíl od Zapier nebo Make ho můžete provozovat na vlastním serveru a platíte jen za hosting, ne za počet kroků.

### Workflow 1: Třídění a sumarizace e-mailů

```
Gmail Trigger → AI Summarize (OpenAI) → Label → Notion Note
```

Každý příchozí e-mail od klienta je automaticky:
1. Rozpoznán jako klientský (podle domény)
2. Shrnut do 2 vět pomocí GPT-4o
3. Označen prioritou (urgentní / běžné / informační)
4. Uložen jako poznámka do Notion CRM

**Čas ušetřený:** ~45 minut denně

### Workflow 2: Automatický report každé pondělí

```
Cron (Po 8:00) → Google Sheets → Generuj PDF → Odešli e-mail
```

Každé pondělí v 8:00 workflow:
- Stáhne data z Google Sheets (sledování projektů)
- Sestaví HTML report
- Odešle ho klientům a mně jako PDF přílohu

**Čas ušetřený:** ~60 minut týdně

### Workflow 3: CRM aktualizace po hovoru

```
Calendly Webhook → Záznam v Notion → Slack notifikace
```

Po každém dokončeném hovoru přes Calendly se automaticky:
- Vytvoří záznam v Notion s datem, klientem a délkou hovoru
- Nastaví follow-up reminder na 48 hodin
- Pošle mi Slack zprávu se shrnutím

**Čas ušetřený:** ~30 minut denně

## Technické nastavení n8n

Provozuji n8n na VPS (Hostinger, 4 EUR/měsíc) přes Docker:

```bash
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

Celková cena infrastruktury: **4 EUR/měsíc** místo 50+ EUR za Make nebo Zapier.

## Výsledek po 3 měsících

- **Ušetřeno:** 55–65 hodin měsíčně
- **Chyby:** Sníženy o ~90 % (ruční přepis dat = zdroj chyb)
- **Spokojenost klientů:** Reporty dorazí přesně, každé pondělí, bez výjimky
- **Moje kapacita:** Přesunuta na strategické poradenství místo administrativy

## Kde začít?

Nejjednodušší první krok: zmapujte, co děláte více než 3× týdně a trvá to déle než 10 minut. To je váš první kandidát na automatizaci.

Pokud si nejste jistí, kde začít, nebo chcete audit procesů ve vaší firmě — [ozvěte se mi](/kontakt).

---
title: "Proč AI projekty ve firmách selhávají (a jak to udělat jinak)"
description: "Licence na ChatGPT koupené, školení proběhlo, a po třech měsících to nikdo nepoužívá. Popisujeme čtyři nejčastější důvody, proč zavádění AI ve firmách končí rozčarováním, a co dělat, aby to u vás dopadlo jinak."
pubDate: 2026-10-07
author: "Ing. Stanislav Kovařík a tým"
tags: ["AI", "implementace", "strategie"]
draft: false
---

Scénář, který vídáme pořád dokola: vedení se rozhodne, že „musíme mít AI“. Firma koupí licence, uspořádá školení, pár nadšenců si zkusí napsat e-mail nebo shrnout zápis z porady. Po třech měsících se licence platí dál, ale skutečná práce se dělá stejně jako dřív.

Nejde o selhání technologie. Jazykové modely jsou dnes schopné víc, než většina firem využije. **Selhává způsob, jakým se zavádějí.** A důvody se opakují tak pravidelně, že se dají sepsat.

## 1. Chybí zadání, je jen nadšení

„Chceme využít AI“ není zadání. Je to přání. Zadání zní spíš takto: *„Zpracování přijaté faktury nám trvá v průměru osm minut. Chceme se dostat pod dvě minuty a ruční přepis omezit jen na výjimky.“*

Rozdíl je zásadní. U přání nikdy nevíte, jestli jste uspěli. U zadání to víte po měsíci. Dobré zadání má tři části:

- **konkrétní proces**, ne oddělení nebo „komunikaci obecně“,
- **současný stav v číslech**, i kdyby jen odhadnutý (minuty, počty, chybovost),
- **cílový stav**, podle kterého poznáte, že to funguje.

Pokud neumíte cíl vyjádřit číslem, vraťte se o krok zpět. Projekt ještě není připravený, a to je v pořádku. Lepší to zjistit teď než po investici.

## 2. Obecný nástroj neví nic o vaší firmě

ChatGPT, Copilot nebo Claude jsou výborní obecní pomocníci. Neznají ale vaše ceníky, vaše zákazníky, vaše smlouvy ani to, že dodavatel X posílá faktury vždy s chybným datem splatnosti.

Zaměstnanec, který chce s pomocí AI vyřídit reklamaci, musí do okna chatu nejdřív ručně nakopírovat objednávku, historii komunikace a reklamační řád. Pak výsledek zase ručně přepsat do systému. Ušetřený čas se rozpustí v přenášení dat sem a tam.

Skutečný přínos přichází ve chvíli, kdy je AI **součástí procesu**: workflow samo načte objednávku z e-shopu, připraví kontext, nechá model navrhnout odpověď a návrh uloží tam, kde ho pracovník stejně uvidí. Člověk jen kontroluje a odesílá. Tady se z hraní stává úspora.

## 3. Data jsou v nepořádku

AI neopraví chaos, jen ho zrychlí. Pokud máte zákazníky ve třech tabulkách, každou s jiným formátem adresy, model z toho jednotný přehled nevykouzlí. Spíš si chybějící údaje domyslí, a to je horší než mezera.

Před každým projektem se proto vyplatí podívat, **odkud se data berou a kdo za ně odpovídá**. Často se ukáže, že polovinu hodnoty přinese obyčejný úklid: sjednocení číselníků, jedno místo pro kontakty, pravidlo, kam se ukládají přílohy. AI pak staví na pevném základu.

## 4. Lidé nevědí, co smějí

Tohle je nejčastěji podceňovaný problém. Když zaměstnanci nedostanou jasná pravidla, rozdělí se do dvou skupin. Jedni AI nepoužívají vůbec, protože se bojí, že udělají něco špatně. Druzí ji používají na všechno, včetně vkládání osobních údajů zákazníků do bezplatné verze nástroje na soukromém účtu.

Ani jedno firmě nepomáhá. Řešením není zákaz, ale **krátká a srozumitelná pravidla** na jednu stránku: jaké nástroje jsou schválené, co do nich nikdy nevkládat a kdo za výstup odpovídá. Podrobněji o tom píšeme v článku [Pravidla pro AI ve firmě](/blog/pravidla-pro-ai-ve-firme).

## Jak to udělat jinak

Projekty, které se nám osvědčily, mají společný postup. Žádná revoluce, spíš disciplína:

1. **Začněte jedním procesem.** Vyberte takový, který se opakuje denně, je dobře popsatelný a dnes bolí. Typicky přijaté faktury, třídění e-mailů nebo odpovědi na opakované dotazy.
2. **Změřte výchozí stav.** Týden si zapisujte, kolik případů projde a kolik času zaberou. Bez tohoto čísla nebudete mít s čím srovnávat.
3. **Nejdřív pravidla, pak AI.** Rozepište proces na kroky a u každého se zeptejte, jestli ho zvládne obyčejné pravidlo. AI nasaďte jen tam, kde pravidla nestačí. Proč to tak děláme, vysvětlujeme v článku [Kontrolovatelné automatizace](/blog/kontrolovatelne-automatizace-s-minimem-ai).
4. **Pilot na skutečných datech.** Žádné ukázkové příklady. Několik týdnů provozu na reálných případech s člověkem, který výsledky kontroluje.
5. **Vyhodnoťte a teprve pak rozšiřujte.** Splnil pilot cíl? Pokud ano, přidejte další proces. Pokud ne, víte přesně proč, a to je také cenný výsledek.

## Malá firma má výhodu

Mohlo by se zdát, že AI je hra pro velké korporace s vlastním IT. Často je to naopak. Malá firma má kratší rozhodování, procesy zná jeden či dva lidé a výsledek je vidět hned. Pilot na jednom procesu se dá postavit za pár týdnů a provozovat za stovky korun měsíčně, ne za statisíce.

Podmínkou je jen začít u konkrétního problému, ne u technologie.

---

Nevíte, který proces u vás vybrat jako první? Při [procesním auditu](/sluzby#audit) projdeme vaše postupy a ukážeme, kde má automatizace smysl a kde ne. [Domluvte si hovor zdarma](/kontakt).

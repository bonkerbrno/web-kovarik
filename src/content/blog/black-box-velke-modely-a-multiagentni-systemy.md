---
title: "Černá skříňka: rizika velkých modelů a multiagentních systémů"
description: "Velké jazykové modely a systémy, kde spolu „vyjednává“ několik AI agentů, vypadají působivě. Pro firemní procesy ale přinášejí riziko, které se snadno přehlédne: nikdo přesně neví, proč udělaly to, co udělaly."
pubDate: 2026-09-08
author: "Ing. Stanislav Kovařík a tým"
tags: ["AI", "bezpečnost", "rizika"]
draft: false
---

Ukázky jsou přesvědčivé. Jeden AI agent přečte e-mail, druhý vyhledá zákazníka, třetí napíše odpověď a čtvrtý ji zkontroluje. Bez člověka, bez programování, „samo“. Přesto doporučujeme opatrnost. Ne proto, že by AI byla špatná, ale proto, že **systém, kterému nerozumíte, nemůžete řídit.**

## Co je „black box“

Černá skříňka je systém, u kterého vidíte vstup a výstup, ale ne to, co se děje uvnitř. Velký jazykový model je černá skříňka z principu: jeho rozhodnutí vzniká z miliard naučených parametrů, ne z pravidel, která by někdo napsal a mohl přečíst.

U jednoho dotazu to tolik nevadí. Odpověď si přečtete a posoudíte. Problém nastává, když model **jedná sám**: odesílá e-maily, mění data, objednává nebo rozhoduje o dalším kroku.

## Proč jsou multiagentní systémy riskantnější

V multiagentním systému spolupracuje několik AI agentů. Každý dostane úkol, výsledek předá dalšímu a ten pokračuje. Zní to jako dobře organizovaný tým. V praxi to přináší několik rizik:

- **Chyby se násobí.** Pokud každý agent udělá chybu jen občas, při čtyřech agentech za sebou je šance, že celý řetězec projde bez chyby, znatelně nižší. A chyba z prvního kroku se v dalších krocích nezastaví, naopak se na ní staví dál.
- **Nikdo neví, kdo rozhodl.** Když výsledek nesedí, je těžké dohledat, který agent a proč se spletl. Konverzace mezi agenty bývá dlouhá a pokaždé jiná.
- **Nepředvídatelnost.** Stejný vstup může jednou projít a podruhé ne. Velké modely nejsou deterministické a jejich chování se může změnit i s aktualizací od dodavatele, aniž byste cokoli změnili vy.
- **Skryté náklady.** Agenti spolu „mluví“ a každá věta stojí peníze. Jednoduchá úloha se může rozrůst na desítky volání drahého modelu.
- **Bezpečnost.** Agent, který čte e-maily a zároveň smí jednat, se dá zmanipulovat. Stačí, aby v příchozí zprávě byl text, který se tváří jako pokyn. Tomuto útoku se říká *prompt injection* a spolehlivá obrana proti němu zatím neexistuje.

## Kde je to opravdu problém

Riziko černé skříňky roste s tím, co je v sázce:

- **peníze:** platby, objednávky, fakturace,
- **lidé:** odpovědi zákazníkům, hodnocení uchazečů, komunikace s úřady,
- **data:** zápisy do účetnictví, CRM nebo skladové evidence,
- **právo:** GDPR, AI Act, odpovědnost za rozhodnutí.

Evropský AI Act klade důraz na transparentnost a lidský dohled, zvlášť u systémů, které ovlivňují lidi. Když nedokážete vysvětlit, proč systém rozhodl, máte problém nejen provozní, ale i právní.

## Jak z toho ven

Nemusíte se AI vzdát. Stačí ji zapojit tak, aby nebyla černou skříňkou celého procesu, ale jen **malým, ohraničeným krokem**:

1. **Proces řídí workflow, ne AI.** Pořadí kroků, podmínky a výjimky určují pravidla, která jde přečíst. AI dostane jen konkrétní úkol.
2. **AI neodesílá ani nemaže.** Navrhuje, třídí, čte. Akce s dopadem ven provádí workflow až po kontrole, u důležitých věcí po schválení člověkem.
3. **Každý běh má záznam.** Co přišlo, co AI vrátila, co se stalo dál. Když se něco pokazí, víte kde.
4. **Výstup se ověřuje.** Pevný formát, kontrola pravidlem, a co neprojde, jde k člověku.
5. **Méně agentů, více jistoty.** Jeden dobře zadaný krok je lepší než pět agentů, kteří se domlouvají mezi sebou.

## Shrnutí

Velké modely a multiagentní systémy jsou fascinující technologie a pro výzkum nebo kreativní práci mají velkou hodnotu. Pro každodenní firemní procesy ale potřebujete něco jiného: **předvídatelnost, dohledatelnost a kontrolu.** Ty nedá žádná černá skříňka, ať je jakkoli chytrá.

Více o tom, jak stavíme automatizace s minimem AI, píšeme v článku [Kontrolovatelné automatizace](/blog/kontrolovatelne-automatizace-s-minimem-ai). Pokud zvažujete nasazení AI agentů a chcete nezávislý pohled na rizika, [ozvěte se nám](/kontakt).

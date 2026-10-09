---
title: "Černá skříňka: rizika velkých modelů a multiagentních systémů"
description: "Pamatujete si tichou poštu? Na začátku „babička peče buchty“, na konci „Baník pije kafe“. Multiagentní AI systémy fungují nebezpečně podobně. Proč jsou pro firemní procesy riskantní a co místo nich."
pubDate: 2026-09-08
author: "Ing. Stanislav Kovařík a tým"
tags: ["AI", "bezpečnost", "rizika"]
draft: false
---

Hráli jste jako děti tichou poštu? První šeptne „babička peče buchty“ a poslední s vážnou tváří oznámí „Baník pije kafe“. Každý udělal jen malou chybu. Výsledek je k smíchu.

Ve firmě by k smíchu nebyl.

## Ukázky jsou krásné

Jeden AI agent přečte e-mail, druhý najde zákazníka, třetí napíše odpověď a čtvrtý ji zkontroluje. Bez lidí, bez programování, „samo“. Na prezentaci to vypadá jako dobře sehraný tým.

Přesto doporučujeme opatrnost. Ne proto, že by AI byla špatná. Ale **systém, kterému nerozumíte, nemůžete řídit.**

## Co je černá skříňka

Vidíte, co do ní vložíte a co z ní vypadne. Co se děje uvnitř, nevidíte. Velký jazykový model je černá skříňka z principu: jeho rozhodnutí nevzniká z pravidel, která by někdo napsal a vy si je mohli přečíst.

U jednoho dotazu to nevadí. Odpověď si přečtete a posoudíte. Problém nastává, když model **začne jednat sám**: odesílat e-maily, měnit data, objednávat.

## Proč je víc agentů víc starostí

- **Tichá pošta.** Chyba z prvního kroku se nezastaví, další agenti na ní stavějí dál. A když každý článek řetězu občas chybuje, celý řetěz chybuje častěji.
- **Nikdo neví, kdo to zavinil.** Když výsledek nesedí, dohledat, který agent a proč se spletl, je detektivka bez konce.
- **Dneska tak, zítra jinak.** Stejný vstup jednou projde a podruhé ne. A po aktualizaci od dodavatele se chování může změnit, aniž byste cokoli udělali vy.
- **Účet za tokeny.** Agenti si spolu povídají a každá věta stojí peníze. Jednoduchý úkol se může rozrůst na desítky volání drahého modelu. Jako porada, která mohla být e-mailem.
- **Dá se oblafnout.** Agent, který čte poštu a zároveň smí jednat, jde zmanipulovat textem, který se v e-mailu tváří jako pokyn. Spolehlivá obrana proti tomu zatím neexistuje.

## Kde to opravdu bolí

Riziko roste s tím, co je v sázce. Peníze (platby, objednávky), lidé (odpovědi zákazníkům, hodnocení uchazečů), data (účetnictví, sklad) a právo (GDPR, AI Act). Evropská pravidla navíc chtějí, abyste uměli vysvětlit, proč systém rozhodl, jak rozhodl. „Agent to tak nějak vymyslel“ úřadu stačit nebude.

## Jak z toho ven

AI se vzdávat nemusíte. Stačí ji zapojit jako **malý, ohraničený krok**, ne jako ředitele celého procesu:

1. **Proces řídí pravidla, ne AI.** Pořadí kroků a výjimky určuje postup, který si přečtete.
2. **AI navrhuje, neodesílá.** Akce s dopadem ven proběhne až po kontrole, u důležitých věcí po schválení člověkem.
3. **Každý běh má záznam.** Když se něco pokazí, víte kde.
4. **Méně agentů, víc jistoty.** Jeden dobře zadaný krok porazí pět agentů, kteří se domlouvají mezi sebou.

## Jak to děláme my

Automatizujeme především běžnými programovými nástroji. AI zapojíme jen tam, kde by obyčejná pravidla nestačila, a i pak většinou stačí menší model. Výsledek nehraje tichou poštu: víte, co dělá, vidíte, co udělal, a proti autonomním agentům stojí řádově méně.

Zvažujete AI agenty a chcete nezávislý pohled na rizika? S tím umíme poradit, [ozvěte se nám](/kontakt). Víc o našem přístupu najdete v článku [Kontrolovatelné automatizace](/blog/kontrolovatelne-automatizace-s-minimem-ai).

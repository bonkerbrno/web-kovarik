---
title: "Konečně použitelný model: Claude Haiku 5.5 a automatizace za pár korun"
description: "Anthropic vydal Claude Haiku 5.5, malý model, který je řádově levnější než jeho předchůdce a přitom výrazně schopnější. Proč je to pro firemní automatizaci důležitější zpráva než další rekord největších modelů, a na co si dát pozor."
pubDate: 2026-10-08
author: "Ing. Stanislav Kovařík a tým"
tags: ["AI", "modely", "náklady", "automatizace"]
draft: false
---

Novinky ze světa umělé inteligence mají obvykle stejný scénář. Nový model, nový rekord, nový graf, kde čára míří vzhůru. A pak malým písmem cena, při které si majitel menší firmy řekne: pěkné, ale ne pro nás.

Tentokrát je to jinak. A právě proto o tom píšeme.

## Co se stalo

Společnost Anthropic 7. října 2026 vydala **Claude Haiku 5.5**, nejmenší model z nové řady Claude 5.5. Není to model, který by porážel všechny ostatní. Není ani nejchytřejší v rodině, tím zůstávají větší sourozenci Sonnet a Opus. Zajímavý je z úplně jiného důvodu.

**Cena.** U běžných požadavků (do 100 000 tokenů, což je naprostá většina firemních úloh) stojí milion vstupních tokenů 0,10 dolaru a milion výstupních 0,50 dolaru. Předchozí Haiku 4.5 stál přesně desetkrát víc.

Nový model sice stejný text „rozseká“ na o něco víc tokenů, takže reálná úspora není devadesát procent. Anthropic sám uvádí, že provoz vyjde v průměru zhruba **o 75 % levněji**. Pořád je to skok, ne vylepšení.

## A přitom umí víc

Kdyby šlo jen o zlevnění, byla by to příjemná, ale nudná zpráva. Jenže Haiku 5.5 je zároveň výrazně schopnější než jeho předchůdce. V testech, které zveřejnil výrobce, se zlepšil skoro ve všem, od práce s dokumenty a grafy po ovládání počítače a prohlížeče. Firmy, které ho testovaly před vydáním, hlásí lepší přesnost i rychlejší odezvu.

Berte to s rezervou, kterou si zaslouží každý benchmark od výrobce. Ale směr je jasný: **malý model přestal být kompromisem z nouze.**

## Proč říkáme „konečně použitelný“

Na tomhle webu už nějakou dobu tvrdíme jednu věc. Pro většinu firemní rutiny nepotřebujete nejvýkonnější a nejdražší AI. Stačí malý model, kterému dobře připravíte práci: úzká otázka, čistý vstup, pevný formát odpovědi a kontrola pravidlem. Psali jsme o tom v článku [Nepotřebujete drahý model](/blog/male-modely-a-dobre-workflow).

Dosud to ale mělo háček. Malé modely byly levné, jenže na hraně spolehlivosti. Na čtení faktur, třídění pošty nebo vytahování údajů ze smluv občas chybovaly natolik, že kontroly a výjimky snědly velkou část úspory.

Haiku 5.5 tuhle hranu posouvá. Model, který stojí pár haléřů za dokument, teď zvládá úlohy, na které jsme ještě před rokem raději brali dražší sourozence. Právě v tom je zlom: **poprvé se potkává cena, kterou unese malá firma, se spolehlivostí, kterou potřebuje provoz.**

## Kolik to stojí v praxi

Udělejme si hrubý počet na úloze, kterou dobře známe: čtení přijatých faktur.

Řekněme, že průměrná faktura po převedení na text dá modelu kolem 2 500 tokenů vstupu a model vrátí asi 400 tokenů strukturovaných údajů (dodavatel, číslo, datum, položky, částky).

- **Jedna faktura** vyjde při ceníku Haiku 5.5 zhruba na 0,0005 dolaru. Tedy kolem jednoho haléře.
- **Tisíc faktur měsíčně** vás bude stát řádově desítku korun.

Pro srovnání: ruční přepis jedné faktury trvá i zkušené účetní několik minut. Náklady na AI tak přestávají být položkou, o které se jedná na poradě. Jsou to drobné v rozpočtu na kávu.

Neznamená to, že automatizace je zadarmo. Dražší než model bude vždycky **návrh workflow, napojení na vaše systémy a kontrola výsledků.** Ale argument „AI je na to moc drahá“ právě přestal platit.

## Na co si dát pozor

Nadšení je fajn, slepé nadšení ne. Než malý model nasadíte, pár věcí ke zvážení:

- **Pořád je to malý model.** Ve všech zveřejněných testech zůstává za větším Sonnetem 5.5. Na složitou analýzu, dlouhé texty nebo programování je dál lepší větší model. Haiku patří na úzké a opakované úlohy.
- **Benchmark není vaše firma.** Rozhoduje, jak si model poradí s vašimi doklady, vaší češtinou a vašimi výjimkami. Před nasazením ho vyzkoušejte na pár stovkách skutečných případů.
- **Kontroly nevyhazujte.** Levnější model neznamená, že přestane chybovat. Součty na faktuře se dál přepočítávají a IČO se dál ověřuje. Proč na tom trváme, vysvětlujeme v článku [Kontrolovatelné automatizace](/blog/kontrolovatelne-automatizace-s-minimem-ai).
- **Přechod není jen přepsání názvu.** Kdo už má workflow postavené na starším Haiku 4.5, musí počítat s drobnými úpravami nastavení. Nic dramatického, ale je potřeba to otestovat.
- **Data jdou do cloudu.** Haiku 5.5 běží u Anthropicu a jeho partnerů (Amazon, Google, Microsoft), ne na vašem serveru. U citlivých údajů platí vše, co jsme psali v článku [Firemní data a AI: cloud, nebo vlastní server?](/blog/firemni-data-a-ai-cloud-nebo-vlastni-server)

## Co si z toho odnést

Největší zprávy ze světa AI nebývají ty nejhlasitější. Rekordy největších modelů jsou zajímavé pro laboratoře a technologické giganty. Pro účetní kancelář, e-shop nebo výrobní firmu s padesáti lidmi je mnohem důležitější tohle: **spolehlivá AI na rutinní práci právě zlevnila o řád.**

Kdo odkládal automatizaci kvůli ceně, nemá už na co čekat. Kdo ji odkládal kvůli nedůvěře, má pořád pravdu, že opatrnost je na místě. Jen ji teď může vyzkoušet levně, na jednom procesu a pod kontrolou.

---

Chcete vědět, kolik by u vás stálo zpracování faktur, e-mailů nebo objednávek s novým modelem? Spočítáme to na vašich skutečných datech. [Domluvte si hovor zdarma](/kontakt).

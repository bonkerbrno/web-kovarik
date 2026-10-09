---
title: "Kontrolovatelné automatizace: co nejvíc pravidel, co nejméně AI"
description: "Babiččin recept funguje pokaždé. Kuchař improvizátor jednou uvaří zázrak a podruhé pálivý pudink. Proč stavíme automatizace hlavně na pravidlech a AI pouštíme ke sporáku jen tam, kde opravdu pomůže."
pubDate: 2026-09-15
author: "Ing. Stanislav Kovařík a tým"
tags: ["automatizace", "AI", "kontrola"]
draft: false
---

Babiččin recept na bábovku funguje pokaždé. Tolik mouky, tolik vajec, padesát minut na stoosmdesát. Žádná překvapení. Pak je kuchař improvizátor: jednou uvaří zázrak, podruhé „experimentální“ pudink s chilli.

Dnes se o automatizaci skoro vždy mluví jako o umělé inteligenci. Jako by bez ní nešla. Naše zkušenost je opačná: **čím méně improvizátora v kuchyni, tím spolehlivější, levnější a srozumitelnější výsledek.** AI má své místo, jen ne u každého hrnce.

## Kdy je automatizace „kontrolovatelná“

Stačí tři jednoduché podmínky:

1. **Víte, co dělá.** Každý krok má jméno a účel. Žádné „ono to nějak funguje“.
2. **Vidíte, co udělala.** Každý běh nechá stopu: co přišlo, co se rozhodlo, kam co odešlo.
3. **Umíte ji opravit.** Když se něco změní, upravíte jeden krok, ne celý systém.

Pokud automatizace některou podmínku nesplňuje, nepomáhá vám. Jen přestěhovala nejistotu z lidí do počítače.

## Recept udělá 80 % práce

Většina firemní rutiny je předvídatelná. Faktura má číslo, datum a částku. E-mail od dodavatele chodí z jeho domény. Na to nepotřebujete AI, stačí obyčejná pravidla:

- *když přijde e-mail od dodavatele s PDF, ulož ho do složky Faktury,*
- *když částka přesáhne 50 000 Kč, pošli ji ke schválení,*
- *když se zákazník neozve do pěti dnů, připomeň se.*

Pravidla jsou jako babiččin recept. Stejný vstup dá vždycky stejný výsledek. Dají se vyzkoušet, zapsat a vysvětlit komukoli ve firmě. A nic si nevymýšlejí.

## AI jen tam, kde recept nestačí

Pak jsou chvíle, kdy recept končí. Zákazník napíše dotaz po svém. Faktura přijde jako křivý sken. Potřebujete poznat, jestli jde o reklamaci, nebo o zvědavý dotaz.

Tady AI pomůže. Ale s jasnými pravidly hry:

- **Úzká otázka.** Ne „vyřiď tenhle e-mail“, ale „je to reklamace? ano, nebo ne“.
- **Pevný formát odpovědi.** Model vybírá z krátkého seznamu. Co do seznamu nepatří, postup odmítne.
- **Kontrola pravidlem.** Když AI vytáhne z faktury částku, pravidlo přepočítá, jestli sedí součty.
- **Člověk u důležitých věcí.** Platby a odpovědi zákazníkům schvaluje člověk. Automatizace mu jen připraví podklady.

AI je tak pomocník u jednoho hrnce, ne šéfkuchař.

## Jak to vypadá v praxi

Vezměte přijaté faktury. Pravidlo pozná, že e-mail je od dodavatele. AI přečte PDF a vypíše dodavatele, číslo, datum a částku. Pravidlo ověří součty a IČO. Když sedí, faktura jde do účetnictví. Když ne, účetní dostane úkol i s vysvětlením, co nehraje.

AI tu dělá jedinou věc: čte, co pravidla přečíst neumí. Když se něco pokazí, z historie hned vidíte, ve kterém kroku.

## Naše pravidla

Tohle není jen teorie, takhle opravdu pracujeme:

1. **Nejdřív narovnáme procesy.** Automatizovat zmatek znamená mít zmatek rychleji.
2. **Automatizujeme hlavně běžnými programovými nástroji.** Pravidla jsou levná a spolehlivá.
3. **AI nasadíme jen tam, kde by standardní nástroje nestačily.**
4. **Na většinu úloh stačí menší modely.** Jsou bezpečnější a levnější. Nad takovou automatizací máte plnou kontrolu, pravidla si nic nevymýšlejí a proti autonomním agentům vyjde řádově levněji.
5. **Neděláme nic kvůli hypu.** Automatizace musí dávat ekonomický smysl, nebo vám aspoň ubrat otravnou práci.

## Kde začít

Vezměte jeden proces, který se opakuje každý den, a rozepište ho na kroky. U každého se zeptejte: *dá se to napsat jako recept?* Pokud ano, automatizujte bez AI. Pokud ne, zeptejte se: *jak úzkou otázku můžu AI položit a jak její odpověď ověřím?*

S tímhle rozborem umíme poradit. Při [procesním auditu](/sluzby#audit) projdeme vaše postupy a navrhneme automatizaci, které budete rozumět. [Domluvte si hovor zdarma](/kontakt).

---
title: "Kontrolovatelné automatizace: co nejvíc pravidel, co nejméně AI"
description: "Nejspolehlivější automatizace je ta, které rozumíte. Ukazujeme, jak postavit workflow, kde většinu práce dělají jasná pravidla a AI nastupuje jen tam, kde opravdu pomůže, a vždy pod dohledem."
pubDate: 2026-09-15
author: "Ing. Stanislav Kovařík a tým"
tags: ["automatizace", "AI", "kontrola"]
draft: false
---

Když se dnes mluví o automatizaci, skoro vždy se mluví o umělé inteligenci. Jako by bez ní automatizace neexistovala. Z naší praxe ale platí opak: **čím méně AI v procesu, tím je spolehlivější, levnější a srozumitelnější.** AI má své místo, jen ne všude.

## Co znamená „kontrolovatelná“ automatizace

Kontrolovatelná automatizace splňuje tři jednoduché podmínky:

1. **Víte, co dělá.** Každý krok má jméno a jasný účel. Žádné „ono to nějak funguje“.
2. **Vidíte, co udělala.** Každý běh zanechá stopu: co přišlo, co se rozhodlo, kam co odešlo.
3. **Umíte ji zastavit a opravit.** Když se něco změní, upravíte jeden krok, ne celý systém.

Pokud automatizace některou z podmínek nesplňuje, nepomáhá vám. Jen přesouvá nejistotu z lidí na počítač.

## Pravidla dělají 80 % práce

Většina firemní rutiny je předvídatelná. Faktura má číslo, datum a částku. Objednávka má zákazníka a položky. E-mail od dodavatele přichází z jeho domény. Na to žádnou AI nepotřebujete, stačí obyčejná pravidla:

- *pokud e-mail přišel z domény dodavatele a má přílohu PDF, ulož ji do složky Faktury,*
- *pokud částka přesahuje 50 000 Kč, pošli ji ke schválení,*
- *pokud zákazník neodpověděl do pěti dnů, připomeň se.*

Pravidla jsou **deterministická**: stejný vstup vždy dá stejný výsledek. Dají se otestovat, zdokumentovat a vysvětlit komukoli ve firmě. A nic nestojí za každé použití.

## AI jen tam, kde pravidla nestačí

Jsou ale úlohy, kde pravidla selhávají. Zákazník napíše dotaz vlastními slovy. Faktura přijde jako sken s nečekaným rozložením. Potřebujete rozpoznat, jestli jde o reklamaci, nebo o běžný dotaz.

Tady AI pomůže. Důležité je, **jak** ji do procesu zapojíte:

- **Úzké zadání.** Místo „vyřiď tenhle e-mail“ dáme modelu jednu otázku: „Je to reklamace? Odpověz ano, nebo ne.“ Úzká otázka znamená méně prostoru pro chybu.
- **Pevný formát odpovědi.** Model nevrací volný text, ale předem dané hodnoty, například kategorii z krátkého seznamu. Co do seznamu nepatří, workflow odmítne.
- **Kontrola výsledku pravidlem.** Když AI vytáhne z faktury částku, pravidlo ověří, že součet položek sedí. Když nesedí, faktura jde k člověku.
- **Člověk u důležitých rozhodnutí.** Platby, odpovědi zákazníkům nebo změny v datech schvaluje člověk. Automatizace mu připraví podklady, rozhodnutí zůstává na něm.

Tak se AI stává jedním krokem ve workflow, ne jeho šéfem.

## Jak to vypadá v praxi

Představte si zpracování přijatých faktur:

```
E-mail s přílohou → Pravidlo: je od dodavatele? → Čtení PDF
→ AI: vytáhni dodavatele, číslo, datum, částku (pevný formát)
→ Pravidlo: sedí součty a IČO? 
   ano → zápis do účetnictví
   ne  → úkol pro účetní s vysvětlením, co nesedí
```

AI tu dělá jedinou věc: čte dokument, který pravidla neumějí přečíst. Všechno ostatní jsou pravidla, která lze zkontrolovat. Když se něco pokazí, z historie běhů hned vidíte, ve kterém kroku.

## Proč na tom záleží

- **Spolehlivost.** Pravidla nehalucinují. AI v úzké roli s kontrolou výstupu chybuje výrazně méně než AI, které necháte volnou ruku.
- **Náklady.** Každé volání AI něco stojí. Když ji voláte jen pro malou část případů, platíte zlomek.
- **Odpovědnost.** Když se zákazník nebo úřad zeptá, proč se něco stalo, máte odpověď. Černá skříňka žádnou odpověď nedá.
- **Nezávislost.** Pravidla nepatří žádnému dodavateli AI. Když se změní ceny nebo podmínky, vyměníte jeden krok, ne celé řešení.

## Kde začít

Vezměte jeden proces, který se opakuje každý den, a rozepište ho na kroky. U každého kroku si položte otázku: *dá se popsat pravidlem?* Pokud ano, automatizujte ho bez AI. Pokud ne, zeptejte se: *jak úzkou otázku můžu AI položit a jak její odpověď ověřím?*

S tímhle rozborem vám rádi pomůžeme. Při [procesním auditu](/sluzby#audit) projdeme vaše postupy a navrhneme automatizaci, které budete rozumět. [Domluvte si hovor zdarma](/kontakt).

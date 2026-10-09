---
title: "Firemní data a AI: cloud, nebo vlastní server?"
description: "Klíče od bytu taky nedáváte každému. Smí faktura se jménem zákazníka do ChatGPT? A kdy se vyplatí mít AI doma na vlastním serveru? Jednoduchý průvodce tím, kam s firemními daty."
pubDate: 2026-09-29
author: "Ing. Stanislav Kovařík a tým"
tags: ["AI", "data", "GDPR", "bezpečnost"]
draft: false
---

Když odjíždíte na dovolenou, klíče od bytu nedáte prvnímu kolemjdoucímu. Sousedce, které věříte, je možná svěříte. Rodinné stříbro ale zamknete do trezoru, a klíč od trezoru si necháte.

S firemními daty a umělou inteligencí to funguje úplně stejně. Jedna z prvních otázek, které od klientů slyšíme, nezní „co to umí“, ale „kam ta data vlastně odcházejí“. A je to správná otázka. Jakmile AI používáte na skutečnou práci, posíláte jí skutečné smlouvy, faktury a e-maily zákazníků.

Možnosti jsou v zásadě tři.

## Klíče pod rohožkou: bezplatný chat na soukromém účtu

Rychlé, pohodlné, zadarmo. A pro firemní data nejrizikovější. U bezplatných a osobních účtů si poskytovatelé obvykle vyhrazují právo použít konverzace k vylepšování svých modelů, pokud to uživatel nevypne. Firma navíc netuší, kdo co kam vložil. A když zaměstnanec odejde, historie odchází s ním.

**Hodí se na:** obecné dotazy a stylistiku bez citlivého obsahu.
**Nehodí se na:** nic s osobními údaji, obchodním tajemstvím nebo interními čísly.

## Klíče u sousedky: firemní účet velkého poskytovatele

Velcí hráči (OpenAI, Anthropic, Google, Microsoft) nabízejí firemní tarify. Smluvně se v nich zavazují, že vaše data **nepoužijí k trénování**, a podepíšou smlouvu o zpracování osobních údajů, kterou chce GDPR. U některých si můžete vybrat zpracování v datových centrech v EU.

Pro většinu firem je to rozumný start. Než ale začnete, ověřte si tři věci: máte podepsanou smlouvu o zpracování, kde se data zpracovávají a jak dlouho se uchovávají.

**Hodí se na:** běžnou agendu, zákaznickou komunikaci, dokumenty bez zvlášť citlivých údajů.

## Trezor: model na vlastním serveru

Otevřené modely (třeba Llama, Mistral, Qwen nebo Gemma) si můžete pustit na vlastním nebo pronajatém serveru. Data pak **neopustí vaši firmu**. Nikdo třetí je nevidí.

Daň za to? Modely, které rozumně poběží na dostupném hardwaru, jsou menší než ty nejlepší v cloudu. Na úzké úlohy, jako je třídění nebo vytažení údajů z dokumentu, to ale většinou stačí. Víc v článku [Nepotřebujete drahý model](/blog/male-modely-a-dobre-workflow). A někdo musí server hlídat, aktualizovat a zálohovat. To je náklad, na který se v kalkulacích rád zapomíná.

**Hodí se na:** zdravotní údaje, mzdy, smlouvy s mlčenlivostí, právní agendu.

## Jak se rozhodnout

Neřešte „cloud ano, nebo ne“ pro celou firmu. Projděte každý proces zvlášť a položte si tři otázky. Jaká data v něm tečou? Co by se stalo, kdyby unikla? A jak náročná je samotná úloha?

Výsledkem bývá kombinace. Běžné dotazy zákazníků zpracuje model v cloudu, personální dokumenty malý model doma. Obojí může běžet v jednom postupu, který jen podle typu dokumentu rozhodne, kam ho poslat.

## Malý trik: přezdívky místo jmen

Mezi sousedkou a trezorem je ještě užitečná mezicesta. Postup může **před odesláním do AI nahradit osobní údaje zástupnými značkami**. Místo „Jana Nováková, Lipová 12, Brno“ odejde „[JMÉNO_1], [ADRESA_1]“. Model odpoví a značky se vrátí zpátky. AI tak pracuje s obsahem, aniž by věděla, o koho jde. U faktur a objednávek je to jednoduchá a účinná ochrana.

## A co AI Act?

Pro běžnou firmu znamená hlavně tohle: podporovat, aby lidé AI rozuměli, dát vědět, když zákazník mluví s chatbotem, a u důležitých rozhodnutí nechat poslední slovo člověku. Přísná pravidla pro takzvané vysoce rizikové systémy se po letošní novele odsunula na konec roku 2027. Jako u GDPR platí, že dobře vedená evidence ušetří spoustu starostí.

*Tohle je praktický přehled, ne právní rada. U citlivých případů se poraďte s odborníkem na ochranu osobních údajů.*

## Jak to děláme my

Na většinu automatizací stačí menší modely, a ty se dají provozovat bezpečně, často přímo u vás. Kde to jde, necháme práci obyčejným pravidlům, která citlivá data nikam neposílají vůbec. AI zapojíme jen tam, kde pravidla nestačí.

Chcete projít, co smí do cloudu a co patří do trezoru? S tím umíme poradit, [ozvěte se nám](/kontakt).

---
title: "Firemní data a AI: cloud, nebo vlastní server?"
description: "Smí faktura se jménem zákazníka do ChatGPT? A kdy se vyplatí provozovat jazykový model na vlastním serveru? Praktický průvodce rozhodováním o tom, kam s firemními daty, když chcete využít umělou inteligenci."
pubDate: 2026-09-29
author: "Ing. Stanislav Kovařík a tým"
tags: ["AI", "data", "GDPR", "bezpečnost"]
draft: false
---

Jedna z prvních otázek, které při rozhovorech o AI slyšíme, nezní „co to umí“, ale „kam ta data vlastně odcházejí“. A je to správná otázka. Jakmile začnete AI používat na skutečnou práci, posíláte jí skutečné dokumenty: smlouvy, faktury, e-maily zákazníků, mzdové podklady.

Odpověď není černobílá. Existují zhruba tři cesty a každá se hodí na něco jiného.

## Cesta 1: Bezplatný nebo osobní účet v chatu

Zaměstnanec si otevře webový chat, vloží text a dostane odpověď. Rychlé, pohodlné, zadarmo.

Pro firemní data je to ale **nejrizikovější varianta**. U bezplatných a osobních účtů si poskytovatelé obvykle vyhrazují právo použít konverzace ke zlepšování svých modelů, pokud to uživatel výslovně nevypne. Firma navíc nemá přehled o tom, co kdo kam vložil, a když zaměstnanec odejde, historie odchází s jeho soukromým účtem.

**Vhodné pro:** obecné dotazy, formulaci textů bez citlivého obsahu, učení a zkoušení.
**Nevhodné pro:** cokoli s osobními údaji, obchodním tajemstvím nebo interními čísly.

## Cesta 2: Firemní účet nebo API velkého poskytovatele

Velcí poskytovatelé (OpenAI, Anthropic, Google, Microsoft) nabízejí firemní tarify a přístup přes API. U nich se smluvně zavazují, že vaše data **nepoužijí k trénování modelů**, a nabízejí smlouvu o zpracování osobních údajů, kterou GDPR vyžaduje. U některých lze zvolit i zpracování v datových centrech v EU.

Pro většinu firem je to rozumný výchozí bod. Získáte nejschopnější modely, nemusíte se starat o provoz a máte papírově podložené, co se s daty děje.

Než ale začnete, ověřte si tři věci:

- **Máte podepsanou smlouvu o zpracování (DPA)?** Bez ní byste osobní údaje do služby posílat neměli.
- **Kde se data zpracovávají?** Při přenosu mimo EU musí být splněny podmínky GDPR pro předávání do třetích zemí.
- **Jak dlouho se data uchovávají?** I u firemních služeb se vstupy obvykle po určitou dobu drží kvůli odhalování zneužití. Zjistěte jak dlouho.

**Vhodné pro:** běžnou firemní agendu, zákaznickou komunikaci, zpracování dokumentů bez zvlášť citlivých údajů.

## Cesta 3: Model na vlastním serveru

Otevřené jazykové modely (například rodiny Llama, Mistral, Qwen nebo Gemma) si můžete stáhnout a provozovat na vlastním hardwaru nebo na pronajatém serveru. Data pak **neopouštějí vaši infrastrukturu**. Nikdo třetí je nevidí, nic se nikam neposílá.

Za to se platí jinak než penězi za každý dotaz:

- **Výkon.** Modely, které rozumně poběží na dostupném hardwaru, jsou menší a slabší než ty nejlepší v cloudu. Na úzké úlohy typu třídění nebo vytažení údajů z dokumentu to ale často stačí. Více o tom v článku [Nepotřebujete drahý model](/blog/male-modely-a-dobre-workflow).
- **Hardware.** Pro plynulý provoz potřebujete server s grafickou kartou, nebo se smíříte s pomalejší odezvou. Na dávkové zpracování přes noc stačí i skromnější stroj.
- **Správa.** Někdo musí server aktualizovat, zálohovat a hlídat. To je reálný náklad, který se v kalkulacích často zapomíná.

**Vhodné pro:** zdravotní údaje, mzdy a personalistiku, smlouvy s doložkou mlčenlivosti, právní agendu, firmy s přísnými požadavky klientů na důvěrnost.

## Jak se rozhodnout: tři otázky

Místo obecného „cloud ano, nebo ne“ doporučujeme projít každý proces zvlášť:

1. **Jaká data v něm tečou?** Rozdělte je na veřejná, interní, osobní údaje a zvlášť citlivé údaje (zdraví, mzdy, soudní spory).
2. **Co by se stalo, kdyby unikla?** Nepříjemnost, ztráta zakázky, nebo pokuta a ztráta důvěry?
3. **Jak náročná je úloha?** Potřebujete psát dlouhé texty a uvažovat nad složitými souvislostmi, nebo jen zařadit dokument do kategorie?

Výsledkem bývá kombinace. Například běžné dotazy zákazníků zpracovává model v cloudu přes firemní API, zatímco personální dokumenty čte malý model na vlastním serveru. Obojí může běžet ve stejném workflow, které jen podle typu dokumentu rozhodne, kam ho poslat.

## Pomůže i pseudonymizace

Mezi cloudem a vlastním serverem existuje užitečný mezikrok. Workflow může **před odesláním do AI nahradit osobní údaje zástupnými značkami**: místo „Jana Nováková, Lipová 12, Brno“ odejde „[JMÉNO_1], [ADRESA_1]“. Model odpoví, workflow značky vrátí zpět. Model tak pracuje s obsahem, aniž by viděl, o koho jde.

Nefunguje to všude, například u volného textu, kde se jméno skrývá v kontextu. U strukturovaných dokumentů, jako jsou faktury nebo objednávky, je to ale jednoduchá a účinná ochrana.

## A co AI Act?

Evropský AI Act se pro běžné firemní použití týká hlavně tří věcí. Firmy, které AI nasazují, mají **podporovat, aby jejich lidé AI rozuměli** a uměli ji používat odpovědně. Od srpna 2026 platí **povinnosti transparentnosti**, například že lidé mají vědět, když komunikují s chatbotem, a že uměle vytvořený obsah má být jako takový rozpoznatelný. A přísná pravidla pro takzvané vysoce rizikové systémy (například hodnocení uchazečů o práci nebo bonity klientů) se po letošní novele odsunula na konec roku 2027.

Pro většinu malých a středních firem z toho plyne praktický závěr: vědět, kde a jak AI používáte, mít to sepsané a zajistit, aby u důležitých rozhodnutí měl poslední slovo člověk. Podobně jako u GDPR platí, že dobře vedená evidence ušetří spoustu starostí.

*Tento článek je praktický přehled, nikoli právní rada. U citlivých případů doporučujeme konzultaci s právníkem specializovaným na ochranu osobních údajů.*

---

Chcete projít, která data ve vašich procesech smějí do cloudu a kde se vyplatí vlastní řešení? [Ozvěte se nám](/kontakt), rádi vám pomůžeme najít rozumnou kombinaci.

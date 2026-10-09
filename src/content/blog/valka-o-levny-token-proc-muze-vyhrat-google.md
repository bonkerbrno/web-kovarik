---
title: "Úvaha: Válka o levný token a proč ji může vyhrát Google"
description: "Závod o nejchytřejší model se mění v závod o nejlevnější a nejrychlejší spolehlivou odpověď. Firmy už nepotřebují AI na ukázku, ale na tisíce úloh denně. Google v tom závodě zdánlivě ztrácí. V produkčním nasazení ale může být králem."
pubDate: 2026-10-09
author: "Ing. Stanislav Kovařík"
tags: ["AI", "trh", "Google", "úvaha"]
draft: false
---

Dva roky jsme sledovali jeden typ závodu: kdo má nejchytřejší model. Kdo vyřeší těžší matematickou úlohu, kdo napíše lepší kód, kdo složí náročnější zkoušku. Každý měsíc nový rekord, nový graf, nová vlna nadšení.

Letošní podzim ukazuje, že se závod potichu změnil. Nejzajímavější zprávy už nepřicházejí z vrcholu žebříčku, ale z jeho spodní, „levné“ části. A právě tam se podle mě rozhodne, kdo na umělé inteligenci skutečně vydělá.

## Dvě data, jedna cena

23. září vydal OpenAI model **GPT-6 Luna**. O dva týdny později, 7. října, Anthropic vydal **Claude Haiku 5.5**. Oba stojí za milion vstupních tokenů 0,10 dolaru a za milion výstupních 0,50 dolaru. Na cent stejně.

To není náhoda. To je cenová válka.

Oba výrobci svůj malý model otevřeně staví jako „pracanta“: pro třídění, vytahování údajů, shrnutí, zákaznickou podporu a jako pomocníka, kterému velký model rozdělí práci. OpenAI to shrnuje heslem *„Stavějte se Solem, škálujte s Lunou.“* Jinými slovy: chytrý model na vymýšlení, levný na dření.

## Proč firmy chtějí levné a rychlé, ne nejchytřejší

Důvod je prostý. **AI se přesouvá z ukázek do provozu.**

Ukázka se dělá jednou. Provoz běží tisíckrát denně. Když AI čte každou fakturu, třídí každý e-mail a odpovídá na každý dotaz zákazníka, přestává rozhodovat, jestli je model o pár procent chytřejší. Rozhodují dvě jiná čísla.

**Cena za vyřízený případ.** Rozdíl mezi haléřem a korunou za dokument je u stovky dokumentů zanedbatelný. U stovky tisíc je to rozdíl mezi projektem, který se vyplatí, a projektem, který vedení po půl roce zařízne.

**Rychlost odpovědi.** Zákazník v chatu nečeká deset vteřin. Hlasový asistent na telefonu, který před každou větou dvě vteřiny „přemýšlí“, působí rozbitě. A AI agent, který na jednu úlohu potřebuje třicet kroků, násobí každé zdržení třicetkrát. Responzivita přestala být technický detail. Je to vlastnost produktu.

Proto ten obrat. Výrobci pochopili, že masové nasazení nevznikne z nejchytřejšího modelu, ale z modelu, který je **dost chytrý, velmi rychlý a skoro zadarmo.** Výkon na jednotku ceny teď klesá strměji než kdy dřív, a to je pro firmy mnohem lepší zpráva než jakýkoli nový rekord.

## Google: na pohled ten, kdo zaostává

Při téhle optice se Google zdá být mimo hru. V titulcích a na sociálních sítích dominují OpenAI a Anthropic. Vývojáři se přou hlavně o to, jestli je lepší GPT, nebo Claude.

A co víc: Google v té cenové válce na první pohled ani nehraje. Jeho nejnovější rychlý model **Gemini 3.8 Flash** stojí 0,75 dolaru za milion vstupních a 3,75 dolaru za milion výstupních tokenů. To je víc než sedminásobek ceny Luny nebo Haiku. A to je ještě zaváděcí cena, od ledna se má zdvojnásobit. Řada Flash se posunula nahoru, k „nejchytřejšímu Flash modelu“ pro agenty a náročné firemní procesy.

Kdo by srovnával jen ceníky a benchmarky, řekl by: Google zaspal.

Myslím si, že by se mýlil.

## Proč může vyhrát právě on

Produkční nasazení AI totiž nevyhrává ten, kdo má nejlepší model v daném měsíci. Vyhrává ten, kdo umí **vyrobit odpověď nejlevněji, doručit ji nejblíž k uživateli a prodat ji tam, kde už firma nakupuje.** A v těchhle třech věcech má Google náskok, který se nedá dohnat jedním dobrým modelem.

**1. Vlastní čipy.** Google vyvíjí vlastní procesory pro AI (TPU) už od roku 2016. Většina konkurence je dnes závislá na grafických kartách od Nvidie a platí za ně tržní cenu i s marží. V cenové válce nevyhrává ten, kdo nejvíc zlevní, ale ten, kdo vydrží nejdéle zlevňovat. A to je ten, kdo má nejnižší výrobní náklad na jeden token.

**2. Distribuce.** Aplikace Gemini měla podle Alphabetu v létě 950 milionů aktivních uživatelů měsíčně. AI přehledy ve vyhledávání vidí podle Googlu přes 2,5 miliardy lidí. K tomu Android, Gmail, Dokumenty, Tabulky. Google nemusí nikoho přesvědčovat, aby si stáhl novou aplikaci. AI se prostě objeví v nástrojích, které lidé otevírají každé ráno.

**3. Firemní cloud.** Google Cloud ve druhém čtvrtletí 2026 meziročně vyrostl o 82 % a podle Alphabetu Gemini Enterprise používá skoro 90 % firem ze žebříčku Fortune 100. Velké firmy nekupují AI jako samostatnou hračku. Kupují ji od dodavatele, u kterého už mají data, smlouvy, zabezpečení a fakturaci. Nudné věci jako smluvně garantovaná dostupnost, umístění dat v EU nebo jedna faktura za všechno rozhodují v produkci víc než body v testu.

Vyšší cena modelu Flash pak nemusí být známkou slabosti. Může být známkou sebevědomí: Google si v tuto chvíli nemusí kupovat zákazníky cenou, protože je má jinde. A až bude chtít cenovou válku vést naplno, má na to nejlepší výchozí pozici.

## Co mluví proti

Úvaha, která nevidí protiargumenty, je reklama. Tak tedy poctivě.

- **Google umí produkty zabíjet.** Seznam služeb, které spustil a po pár letech zrušil, je pověstně dlouhý. Firmy, které na něj sázely, si to pamatují.
- **Firemní důvěra se buduje i jinde.** Anthropic a OpenAI mají v programování a v agentech silnou pozici a jejich modely jsou dostupné i v cloudech Amazonu, Microsoftu a Googlu. Výhoda distribuce tak není absolutní.
- **Microsoft má podobné karty.** Office, Windows, Azure a těsné spojení s OpenAI. Kdo vládne kancelářskému softwaru, vládne velké části firemní práce.
- **Dnešní ceník mluví jinak.** Pro malou firmu, která dnes staví workflow přes API, jsou levnější malé modely konkurence prostě levnější. Budoucí výhoda Googlu jí dnešní fakturu nezaplatí.

Moje sázka tedy nezní „Google určitě vyhraje“. Zní: **nejvíc podceňovaný hráč v produkční AI je ten, který na sebe nejméně křičí.**

## Co z toho plyne pro vaši firmu

Pokud AI nasazujete nebo se na to chystáte, z té války můžete jen vydělat. Stačí dodržet tři pravidla.

1. **Nesázejte na jednoho koně.** Postavte workflow tak, aby model byl vyměnitelný díl. Dnes je nejlevnější Haiku nebo Luna, za půl roku to může být Gemini. Když je výměna otázkou jednoho nastavení, cenová válka pracuje pro vás. Proč na tom trváme, píšeme v článku [Kontrolovatelné automatizace](/blog/kontrolovatelne-automatizace-s-minimem-ai).
2. **Měřte cenu za vyřízený případ, ne za token.** Levný model, který potřebuje třikrát víc pokusů nebo víc lidských kontrol, je ve skutečnosti drahý. Porovnávejte na svých datech, ne podle ceníku.
3. **Hlídejte rychlost.** U všeho, co se dotýká zákazníka, je odezva součástí kvality. Test, který měří jen přesnost, vám polovinu pravdy zamlčí.

Éra „nejchytřejšího modelu“ nekončí, jen se přesouvá do laboratoří a na nejtěžší úlohy. Pro každodenní práci ve firmách začíná éra modelu, který je **dost dobrý, bleskově rychlý a téměř zadarmo**. Kdo v ní zvítězí, se nerozhodne na žebříčcích, ale v milionech nenápadných faktur, e-mailů a dotazů, které nikdo nebude sledovat.

O tom, co nová generace malých modelů umí v praxi, jsme psali v článku [Konečně použitelný model](/blog/konecne-pouzitelny-model-claude-haiku-5-5).

---

*Tohle je osobní úvaha, nikoli investiční doporučení. Ceny a čísla odpovídají stavu k 9. říjnu 2026 a v tomhle oboru stárnou rychle.*

Chcete workflow, ve kterém model vyměníte jedním nastavením a vždycky platíte za ten nejvýhodnější? [Ozvěte se nám](/kontakt).

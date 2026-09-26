import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    homepage: singleton({
      label: 'Stránka: Domů',
      path: 'src/content/pages/homepage',
      schema: {
        heroEyebrow: fields.text({ label: 'Hero – horní popisek' }),
        heroTitleLine1: fields.text({ label: 'Hero – nadpis (1. řádek)' }),
        heroTitleLine2: fields.text({ label: 'Hero – nadpis (2. řádek, zvýrazněný)' }),
        heroText: fields.text({ label: 'Hero – text pod nadpisem', multiline: true }),
        heroCtaPrimary: fields.text({ label: 'Hero – text tlačítka 1' }),
        heroCtaSecondary: fields.text({ label: 'Hero – text tlačítka 2' }),

        problemsTitle: fields.text({ label: 'Sekce „Poznáváte se?" – nadpis' }),
        problemsSubtitle: fields.text({ label: 'Sekce „Poznáváte se?" – podnadpis' }),
        problems: fields.array(
          fields.object({
            icon: fields.text({ label: 'Ikona (emoji)' }),
            title: fields.text({ label: 'Nadpis' }),
            desc: fields.text({ label: 'Popis', multiline: true }),
          }),
          {
            label: 'Kartičky problémů',
            itemLabel: (props) => props.fields.title.value || 'Kartička',
          }
        ),

        servicesTitle: fields.text({ label: 'Sekce „Jak konkrétně pomáhám" – nadpis' }),
        services: fields.array(
          fields.object({
            icon: fields.text({ label: 'Ikona (emoji)' }),
            title: fields.text({ label: 'Nadpis' }),
            desc: fields.text({ label: 'Popis', multiline: true }),
            href: fields.text({ label: 'Odkaz (např. /sluzby#audit)' }),
          }),
          {
            label: 'Kartičky služeb',
            itemLabel: (props) => props.fields.title.value || 'Služba',
          }
        ),

        aboutEyebrow: fields.text({ label: 'O mně (zkratka) – horní popisek' }),
        aboutName: fields.text({ label: 'O mně (zkratka) – jméno' }),
        aboutText: fields.text({ label: 'O mně (zkratka) – text', multiline: true }),
        aboutLinkText: fields.text({ label: 'O mně (zkratka) – text odkazu' }),

        ctaTitle: fields.text({ label: 'Závěrečné CTA – nadpis' }),
        ctaText: fields.text({ label: 'Závěrečné CTA – text', multiline: true }),
        ctaButton: fields.text({ label: 'Závěrečné CTA – text tlačítka' }),
      },
    }),

    oMne: singleton({
      label: 'Stránka: O mně',
      path: 'src/content/pages/o-mne',
      schema: {
        subtitle: fields.text({ label: 'Podtitulek pod jménem' }),
        locationText: fields.text({ label: 'Řádek s lokací a e-mailem' }),

        storyTitle: fields.text({ label: 'Sekce příběh – nadpis' }),
        storyParagraphs: fields.array(
          fields.text({ label: 'Odstavec', multiline: true }),
          { label: 'Odstavce příběhu', itemLabel: (props) => props.value.slice(0, 60) + '…' }
        ),

        experienceTitle: fields.text({ label: 'Sekce zkušeností – nadpis' }),
        experience: fields.array(
          fields.object({
            icon: fields.text({ label: 'Ikona (emoji)' }),
            title: fields.text({ label: 'Nadpis' }),
            desc: fields.text({ label: 'Popis', multiline: true }),
          }),
          {
            label: 'Kartičky zkušeností',
            itemLabel: (props) => props.fields.title.value || 'Zkušenost',
          }
        ),

        toolsTitle: fields.text({ label: 'Sekce nástrojů – nadpis' }),
        tools: fields.array(
          fields.text({ label: 'Nástroj' }),
          { label: 'Nástroje', itemLabel: (props) => props.value }
        ),

        ctaTitle: fields.text({ label: 'CTA – nadpis' }),
        ctaText: fields.text({ label: 'CTA – text', multiline: true }),
        ctaButton: fields.text({ label: 'CTA – text tlačítka' }),
      },
    }),

    sluzby: singleton({
      label: 'Stránka: Služby',
      path: 'src/content/pages/sluzby',
      schema: {
        heroEyebrow: fields.text({ label: 'Hero – horní popisek' }),
        heroTitle: fields.text({ label: 'Hero – nadpis' }),
        heroText: fields.text({ label: 'Hero – text', multiline: true }),

        auditIcon: fields.text({ label: 'Audit – ikona' }),
        auditTitle: fields.text({ label: 'Audit – nadpis' }),
        auditText: fields.text({ label: 'Audit – text', multiline: true }),
        auditBullets: fields.array(fields.text({ label: 'Bod' }), {
          label: 'Audit – seznam bodů',
          itemLabel: (props) => props.value,
        }),
        auditCta: fields.text({ label: 'Audit – text tlačítka' }),
        auditResultsLabel: fields.text({ label: 'Audit – popisek boxu s výsledky' }),
        auditResults: fields.array(
          fields.object({
            label: fields.text({ label: 'Popisek' }),
            value: fields.text({ label: 'Hodnota' }),
          }),
          { label: 'Audit – řádky výsledků', itemLabel: (props) => props.fields.label.value }
        ),

        n8nIcon: fields.text({ label: 'n8n – ikona' }),
        n8nTitle: fields.text({ label: 'n8n – nadpis' }),
        n8nText: fields.text({ label: 'n8n – text', multiline: true }),
        n8nBullets: fields.array(fields.text({ label: 'Bod' }), {
          label: 'n8n – seznam bodů',
          itemLabel: (props) => props.value,
        }),
        n8nCta: fields.text({ label: 'n8n – text tlačítka' }),
        n8nCodeComment: fields.text({ label: 'n8n – ukázka: horní komentář' }),
        n8nCodeSteps: fields.array(fields.text({ label: 'Krok' }), {
          label: 'n8n – ukázka: kroky workflow',
          itemLabel: (props) => props.value,
        }),
        n8nCodeFooter: fields.text({ label: 'n8n – ukázka: spodní komentář' }),

        aiIcon: fields.text({ label: 'AI – ikona' }),
        aiTitle: fields.text({ label: 'AI – nadpis' }),
        aiText: fields.text({ label: 'AI – text', multiline: true }),
        aiBullets: fields.array(fields.text({ label: 'Bod' }), {
          label: 'AI – seznam bodů',
          itemLabel: (props) => props.value,
        }),
        aiCta: fields.text({ label: 'AI – text tlačítka' }),
        aiUseCases: fields.array(
          fields.object({
            icon: fields.text({ label: 'Ikona' }),
            label: fields.text({ label: 'Název' }),
            desc: fields.text({ label: 'Popis' }),
          }),
          { label: 'AI – kartičky použití', itemLabel: (props) => props.fields.label.value }
        ),

        ctaTitle: fields.text({ label: 'Závěrečné CTA – nadpis' }),
        ctaText: fields.text({ label: 'Závěrečné CTA – text', multiline: true }),
        ctaButton: fields.text({ label: 'Závěrečné CTA – text tlačítka' }),
      },
    }),

    edu: singleton({
      label: 'Stránka: Edu',
      path: 'src/content/pages/edu',
      schema: {
        heroEyebrow: fields.text({ label: 'Hero – horní popisek' }),
        heroTitle: fields.text({ label: 'Hero – nadpis' }),
        heroText: fields.text({ label: 'Hero – text', multiline: true }),

        schoolsIcon: fields.text({ label: 'Střední školy – ikona' }),
        schoolsTitle: fields.text({ label: 'Střední školy – nadpis' }),
        schoolsText: fields.text({ label: 'Střední školy – text', multiline: true }),
        schoolsBullets: fields.array(fields.text({ label: 'Bod' }), {
          label: 'Střední školy – seznam bodů',
          itemLabel: (props) => props.value,
        }),
        schoolsCta: fields.text({ label: 'Střední školy – text tlačítka' }),
        schoolsImage: fields.image({
          label: 'Střední školy – fotka (workshop / třída)',
          directory: 'public/images/edu',
          publicPath: '/images/edu/',
        }),
        schoolsImageCaption: fields.text({ label: 'Střední školy – popisek fotky' }),

        universityIcon: fields.text({ label: 'Vysoké školy – ikona' }),
        universityTitle: fields.text({ label: 'Vysoké školy – nadpis' }),
        universityText: fields.text({ label: 'Vysoké školy – text', multiline: true }),
        universityBullets: fields.array(fields.text({ label: 'Bod' }), {
          label: 'Vysoké školy – seznam bodů',
          itemLabel: (props) => props.value,
        }),
        universityCta: fields.text({ label: 'Vysoké školy – text tlačítka' }),

        publicIcon: fields.text({ label: 'Veřejnost – ikona' }),
        publicTitle: fields.text({ label: 'Veřejnost – nadpis' }),
        publicText: fields.text({ label: 'Veřejnost – text', multiline: true }),
        publicBullets: fields.array(fields.text({ label: 'Bod' }), {
          label: 'Veřejnost – seznam bodů',
          itemLabel: (props) => props.value,
        }),
        publicCta: fields.text({ label: 'Veřejnost – text tlačítka' }),

        companiesIcon: fields.text({ label: 'Firmy – ikona' }),
        companiesTitle: fields.text({ label: 'Firmy – nadpis' }),
        companiesText: fields.text({ label: 'Firmy – text', multiline: true }),
        companiesBullets: fields.array(fields.text({ label: 'Bod' }), {
          label: 'Firmy – seznam bodů',
          itemLabel: (props) => props.value,
        }),
        companiesCta: fields.text({ label: 'Firmy – text tlačítka' }),
        companiesImage: fields.image({
          label: 'Firmy – fotka (workshop)',
          directory: 'public/images/edu',
          publicPath: '/images/edu/',
        }),
        companiesImageCaption: fields.text({ label: 'Firmy – popisek fotky' }),

        processTitle: fields.text({ label: 'Sekce „Jak to probíhá" – nadpis' }),
        processSteps: fields.array(fields.text({ label: 'Krok', multiline: true }), {
          label: 'Kroky domluvy',
          itemLabel: (props) => props.value,
        }),

        ctaTitle: fields.text({ label: 'Závěrečné CTA – nadpis' }),
        ctaText: fields.text({ label: 'Závěrečné CTA – text', multiline: true }),
        ctaButton: fields.text({ label: 'Závěrečné CTA – text tlačítka' }),
      },
    }),

    kontakt: singleton({
      label: 'Stránka: Kontakt',
      path: 'src/content/pages/kontakt',
      schema: {
        heroTitle: fields.text({ label: 'Hero – nadpis' }),
        heroText: fields.text({ label: 'Hero – text', multiline: true }),

        formTitle: fields.text({ label: 'Formulář – nadpis' }),
        topics: fields.array(
          fields.object({
            value: fields.text({ label: 'Hodnota (interní)' }),
            label: fields.text({ label: 'Zobrazený text' }),
          }),
          { label: 'Formulář – možnosti v „O co máte zájem?"', itemLabel: (props) => props.fields.label.value }
        ),
        submitButton: fields.text({ label: 'Formulář – text tlačítka odeslat' }),

        contactTitle: fields.text({ label: 'Přímý kontakt – nadpis' }),
        email: fields.text({ label: 'E-mail' }),
        linkedinUrl: fields.text({ label: 'LinkedIn – odkaz' }),
        linkedinLabel: fields.text({ label: 'LinkedIn – zobrazený text' }),

        processTitle: fields.text({ label: 'Box „Jak to probíhá?" – nadpis' }),
        processSteps: fields.array(fields.text({ label: 'Krok', multiline: true }), {
          label: 'Kroky procesu',
          itemLabel: (props) => props.value,
        }),
      },
    }),
  },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Název článku' } }),
        description: fields.text({
          label: 'Perex',
          multiline: true,
        }),
        pubDate: fields.date({
          label: 'Datum publikace',
        }),
        author: fields.text({
          label: 'Autor',
          defaultValue: 'Stan Kovařík',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tagy',
          itemLabel: (props) => props.fields.value.value,
        }),
        draft: fields.checkbox({
          label: 'Koncept (nepublikovat)',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Obsah',
        }),
      },
    }),
  },
});

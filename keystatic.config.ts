import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
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
          defaultValue: 'Radek Kovařík',
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

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig(async ({ command }) => {
  const integrations = [tailwind()];

  // Keystatic CMS admin UI only makes sense during local development
  // (`astro dev`). It requires on-demand server routes that a static
  // production build (`astro build`) cannot serve without an adapter,
  // so we never include it there — locally or in CI.
  if (command === 'dev') {
    const keystatic = (await import('@keystatic/astro')).default;
    integrations.push(keystatic());
  }

  return {
    output: 'static',
    integrations,
    site: 'https://kovarik.us',
  };
});

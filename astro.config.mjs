import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const integrations = [tailwind()];

// Keystatic CMS admin UI is only needed during local development
// (`astro dev`). It requires on-demand server routes that a static
// production build (`astro build`) cannot serve without an adapter,
// so skip it for every build — locally or in CI.
if (process.argv.includes('dev')) {
  const keystatic = (await import('@keystatic/astro')).default;
  integrations.push(keystatic());
}

export default defineConfig({
  output: 'static',
  integrations,
  site: 'https://kovarik.us',
});

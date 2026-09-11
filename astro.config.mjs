import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const integrations = [tailwind()];

// Keystatic CMS only works in dev mode with local storage
// Skip it in CI/production builds (GitHub Actions sets CI=true)
if (!process.env.CI) {
  const keystatic = (await import('@keystatic/astro')).default;
  integrations.push(keystatic());
}

export default defineConfig({
  output: 'static',
  integrations,
  site: 'https://kovarik.us',
});

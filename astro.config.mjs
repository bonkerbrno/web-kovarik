import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { ICON_NAMES } from './src/lib/icons.ts';

// Icon names come from the CMS at build time, so the editor's icon list must be bundled.
const integrations = [tailwind(), icon({ include: { tabler: ICON_NAMES } })];

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

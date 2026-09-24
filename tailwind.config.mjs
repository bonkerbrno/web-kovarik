import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
          extend: {
                  colors: {
                            // Derived from the logo blue #2C588F: same hue, calmer than the old indigo.
                            brand: {
                                        50:  '#EEF3F9',
                                        100: '#DBE6F2',
                                        200: '#C5D5E8',
                                        500: '#4570A8',
                                        600: '#3A6297',
                                        700: '#2C588F',
                                        900: '#1C3A61',
                            },
                            navy: {
                                        DEFAULT: '#2C588F',
                                        dark:    '#23466F',
                            },
                            // Muted teal-green with the logo blue's saturation and depth.
                            accent: {
                                        400: '#6FB8A4',
                                        500: '#3C957E',
                                        600: '#307E6A',
                            },
                            ivory: {
                                        DEFAULT: '#FCFAF6',
                                        50:  '#FFFDFA',
                            },
                            mist: {
                                        50:  '#F3F6FA',
                                        100: '#EAF0F6',
                                        200: '#DAE3EE',
                                        300: '#C2D0E1',
                                        400: '#9DB2CB',
                                        mid:  '#E8EEF5',
                                        deep: '#DCE5F0',
                            },
                            dusk: {
                                        500: '#546E9C',
                                        600: '#48608E',
                            },
                  },
                  fontFamily: {
                            sans: ['Figtree', 'system-ui', 'sans-serif'],
                            heading: ['Figtree', 'system-ui', 'sans-serif'],
                  },
                  fontWeight: {
                            bold: '650',
                  },
                  lineHeight: {
                            relaxed: '1.7',
                  },
          },
    },
    plugins: [typography],
};

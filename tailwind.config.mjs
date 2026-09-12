import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
          extend: {
                  colors: {
                            brand: {
                                        50:  '#f0f4ff',
                                        100: '#dce6fd',
                                        500: '#3b5bdb',
                                        600: '#2f4ecf',
                                        700: '#2541b2',
                                        900: '#1a2f80',
                            },
                            accent: {
                                        400: '#38d9a9',
                                        500: '#20c997',
                                        600: '#12b886',
                            },
                  },
                  fontFamily: {
                            sans: ['Inter', 'system-ui', 'sans-serif'],
                            heading: ['Outfit', 'Inter', 'sans-serif'],
                  },
          },
    },
    plugins: [typography],
};

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
                            ivory: {
                                        DEFAULT: '#FBF8F1',
                                        50:  '#FEFCF8',
                            },
                            mist: {
                                        50:  '#F3F6FA',
                                        100: '#EAF0F6',
                                        200: '#DAE3EE',
                                        300: '#C2D0E1',
                                        400: '#9DB2CB',
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

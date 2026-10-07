// Kontaktní formulář odesílá data na Cloudflare Pages Function functions/api/kontakt.js.
// Na kovarik.us (GitHub Pages) volá funkci na Cloudflare přes CORS, na *.pages.dev a lokálně stejnou doménu.
export const CONTACT_ENDPOINT = '/api/kontakt';
export const CONTACT_REMOTE_ENDPOINT = 'https://web-kovarik.pages.dev/api/kontakt';
// Veřejný klíč Cloudflare Turnstile (volitelný). Nastavuje se jako PUBLIC_TURNSTILE_SITE_KEY při buildu.
export const TURNSTILE_SITE_KEY: string = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '';

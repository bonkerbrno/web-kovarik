// Kontaktní formulář odesílá data na Cloudflare Pages Function functions/api/kontakt.js (stejná doména, bez CORS).
export const CONTACT_ENDPOINT = '/api/kontakt';
// Veřejný klíč Cloudflare Turnstile (volitelný). Nastavuje se ve Vercelu jako PUBLIC_TURNSTILE_SITE_KEY.
export const TURNSTILE_SITE_KEY: string = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '';

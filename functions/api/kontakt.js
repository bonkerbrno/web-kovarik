// Kontaktní formulář: Cloudflare Pages Function na /api/kontakt.
// Přijme JSON z formuláře, zkontroluje ochranu proti robotům a pošle e-mail přes SMTP.
// Nastavení (proměnné a tajné hodnoty v Cloudflare) je popsané v docs/KONTAKTNI-FORMULAR.md.
import { WorkerMailer } from 'worker-mailer';

const MIN_FILL_MS = 3000; // rychleji formulář člověk nevyplní
const MAX_TOKEN_AGE_MS = 2 * 60 * 60 * 1000;
const RATE_LIMIT = 5; // odeslání na IP za hodinu (na jednu instanci funkce)
const RATE_WINDOW_MS = 60 * 60 * 1000;
const LIMITS = { name: 120, email: 200, company: 200, topic: 120, message: 5000 };
const ALLOWED_HOSTS = new Set(['kovarik.us', 'www.kovarik.us', 'localhost']);
// Weby, které smějí funkci volat z jiné domény (CORS). Web na kovarik.us běží na GitHub Pages.
const CORS_ORIGINS = new Set(['https://kovarik.us', 'https://www.kovarik.us']);

const hits = new Map();
const encoder = new TextEncoder();

const secretKey = (env) => env.FORM_SECRET || env.SMTP_PASS || '';

const sign = async (env, ts) => {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secretKey(env)), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(String(ts)));
  return [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');
};

const safeEqual = (a, b) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

const clean = (value, max) =>
  String(value ?? '')
    .replace(/\r/g, '')
    .trim()
    .slice(0, max);
// Do hlaviček e-mailu nesmí proniknout nový řádek.
const oneLine = (value, max) => clean(value, max).replace(/\n+/g, ' ');

const validEmail = (value) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(value);

const originAllowed = (request) => {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    const { hostname } = new URL(origin);
    return ALLOWED_HOSTS.has(hostname) || hostname.endsWith('.pages.dev');
  } catch {
    return false;
  }
};

const corsHeaders = (request) => {
  const origin = request.headers.get('origin');
  let allowed = false;
  if (origin) {
    if (CORS_ORIGINS.has(origin)) allowed = true;
    else {
      try {
        const { protocol, hostname } = new URL(origin);
        allowed = protocol === 'https:' && hostname.endsWith('.pages.dev');
      } catch {
        allowed = false;
      }
    }
  }
  if (!allowed) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
};

const rateLimited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) for (const [key, list] of hits) if (!list.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(key);
  return false;
};

const verifyTurnstile = async (env, token, ip, fetchImpl) => {
  if (!env.TURNSTILE_SECRET) return true; // Turnstile je volitelný
  if (!token) return false;
  try {
    const response = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip }),
    });
    const data = await response.json();
    return data.success === true;
  } catch {
    return false;
  }
};

const defaultSend = (env, mail) =>
  WorkerMailer.send(
    {
      host: env.SMTP_HOST || 'smtp.webhosting.fm',
      port: Number(env.SMTP_PORT || 587),
      secure: false, // port 587: spojení se hned po navázání přepne na šifrované (STARTTLS)
      startTls: true,
      credentials: { username: env.SMTP_USER, password: env.SMTP_PASS },
      authType: 'plain',
    },
    mail,
  );

export function createHandler({ sendMail = defaultSend, fetchImpl = fetch } = {}) {
  return async function handler({ request, env }) {
    const send = (status, body) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...corsHeaders(request) },
      });

    // Předběžný dotaz prohlížeče (CORS) na odeslání z kovarik.us.
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    if (!secretKey(env)) return send(503, { ok: false, error: 'not_configured' });

    // GET vydá podepsaný čas načtení formuláře.
    if (request.method === 'GET') {
      const t = Date.now();
      return send(200, { t, sig: await sign(env, t) });
    }
    if (request.method !== 'POST') return send(405, { ok: false, error: 'method' });
    if (!originAllowed(request)) return send(403, { ok: false, error: 'origin' });

    let body = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }
    if (!body || typeof body !== 'object') body = {};
    const ip = (request.headers.get('cf-connecting-ip') || '').trim();

    // Robot vyplnil skryté pole: tváříme se, že vše dopadlo dobře, a nic neposíláme.
    if (clean(body.website, 200)) return send(200, { ok: true });

    const t = Number(body.t);
    const age = Date.now() - t;
    const tokenOk = Number.isFinite(t) && typeof body.sig === 'string' && /^[0-9a-f]{64}$/.test(body.sig) && safeEqual(body.sig, await sign(env, t));
    if (!tokenOk || age > MAX_TOKEN_AGE_MS) return send(400, { ok: false, error: 'token' });
    if (age < MIN_FILL_MS) return send(429, { ok: false, error: 'too_fast' });

    if (rateLimited(ip)) return send(429, { ok: false, error: 'rate_limit' });
    if (!(await verifyTurnstile(env, body.turnstile, ip, fetchImpl))) return send(400, { ok: false, error: 'captcha' });

    const name = oneLine(body.name, LIMITS.name);
    const email = oneLine(body.email, LIMITS.email);
    const company = oneLine(body.company, LIMITS.company);
    const topic = oneLine(body.topic, LIMITS.topic);
    const message = clean(body.message, LIMITS.message);
    if (!name || !message || !validEmail(email)) return send(400, { ok: false, error: 'invalid' });

    const to = env.MAIL_TO || 'team@kovarik.us';
    const from = env.MAIL_FROM || env.SMTP_USER || to;
    try {
      await sendMail(env, {
        from: { name: 'Web kovarik.us', email: from },
        to: { email: to },
        reply: { name: name.replace(/"/g, "'"), email },
        subject: `Dotaz z webu: ${name}${topic ? ` (${topic})` : ''}`,
        text: [`Jméno: ${name}`, `E-mail: ${email}`, `Firma / organizace: ${company || '—'}`, `Téma: ${topic || '—'}`, '', message].join('\n'),
      });
    } catch (error) {
      console.error('kontakt: odeslání e-mailu selhalo', error?.code || error?.message);
      return send(502, { ok: false, error: 'send_failed' });
    }
    return send(200, { ok: true });
  };
}

export const onRequest = createHandler();

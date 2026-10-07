// Kontaktní formulář: Vercel Function na /api/kontakt.
// Přijme JSON z formuláře, zkontroluje ochranu proti robotům a pošle e-mail přes SMTP.
// Nastavení (proměnné prostředí ve Vercelu) je popsané v docs/KONTAKTNI-FORMULAR.md.
import crypto from 'node:crypto';
import nodemailer from 'nodemailer';

const MIN_FILL_MS = 3000; // rychleji formulář člověk nevyplní
const MAX_TOKEN_AGE_MS = 2 * 60 * 60 * 1000;
const RATE_LIMIT = 5; // odeslání na IP za hodinu (na jednu instanci funkce)
const RATE_WINDOW_MS = 60 * 60 * 1000;
const LIMITS = { name: 120, email: 200, company: 200, topic: 120, message: 5000 };
const ALLOWED_HOSTS = new Set(['kovarik.us', 'www.kovarik.us', 'localhost']);

const hits = new Map();

const secretKey = () => process.env.FORM_SECRET || process.env.SMTP_PASS || '';
const sign = (ts) => crypto.createHmac('sha256', secretKey()).update(String(ts)).digest('hex');

const clean = (value, max) =>
  String(value ?? '')
    .replace(/\r/g, '')
    .trim()
    .slice(0, max);
// Do hlaviček e-mailu nesmí proniknout nový řádek.
const oneLine = (value, max) => clean(value, max).replace(/\n+/g, ' ');

const validEmail = (value) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(value);

const originAllowed = (req) => {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    const { hostname } = new URL(origin);
    return ALLOWED_HOSTS.has(hostname) || hostname.endsWith('.vercel.app');
  } catch {
    return false;
  }
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

const verifyTurnstile = async (token, ip, fetchImpl) => {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true; // Turnstile je volitelný
  if (!token) return false;
  try {
    const response = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = await response.json();
    return data.success === true;
  } catch {
    return false;
  }
};

const defaultTransport = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.webhosting.fm',
    port: Number(process.env.SMTP_PORT || 587),
    secure: false, // port 587: spojení se hned po navázání přepne na šifrované (STARTTLS)
    requireTLS: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

export function createHandler({ getTransport = defaultTransport, fetchImpl = fetch } = {}) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    const send = (status, body) => res.status(status).json(body);

    if (!secretKey()) return send(503, { ok: false, error: 'not_configured' });

    // GET vydá podepsaný čas načtení formuláře.
    if (req.method === 'GET') {
      const t = Date.now();
      return send(200, { t, sig: sign(t) });
    }
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return send(405, { ok: false, error: 'method' });
    }
    if (!originAllowed(req)) return send(403, { ok: false, error: 'origin' });

    const body = typeof req.body === 'object' && req.body ? req.body : {};
    const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();

    // Robot vyplnil skryté pole: tváříme se, že vše dopadlo dobře, a nic neposíláme.
    if (clean(body.website, 200)) return send(200, { ok: true });

    const t = Number(body.t);
    const age = Date.now() - t;
    const tokenOk =
      Number.isFinite(t) &&
      typeof body.sig === 'string' &&
      /^[0-9a-f]{64}$/.test(body.sig) &&
      crypto.timingSafeEqual(Buffer.from(body.sig), Buffer.from(sign(t)));
    if (!tokenOk || age > MAX_TOKEN_AGE_MS) return send(400, { ok: false, error: 'token' });
    if (age < MIN_FILL_MS) return send(429, { ok: false, error: 'too_fast' });

    if (rateLimited(ip)) return send(429, { ok: false, error: 'rate_limit' });
    if (!(await verifyTurnstile(body.turnstile, ip, fetchImpl))) return send(400, { ok: false, error: 'captcha' });

    const name = oneLine(body.name, LIMITS.name);
    const email = oneLine(body.email, LIMITS.email);
    const company = oneLine(body.company, LIMITS.company);
    const topic = oneLine(body.topic, LIMITS.topic);
    const message = clean(body.message, LIMITS.message);
    if (!name || !message || !validEmail(email)) return send(400, { ok: false, error: 'invalid' });

    const to = process.env.MAIL_TO || 'team@kovarik.us';
    const from = process.env.MAIL_FROM || process.env.SMTP_USER || to;
    try {
      await getTransport().sendMail({
        from: `"Web kovarik.us" <${from}>`,
        to,
        replyTo: `"${name.replace(/"/g, "'")}" <${email}>`,
        subject: `Dotaz z webu: ${name}${topic ? ` (${topic})` : ''}`,
        text: [
          `Jméno: ${name}`,
          `E-mail: ${email}`,
          `Firma / organizace: ${company || '—'}`,
          `Téma: ${topic || '—'}`,
          '',
          message,
        ].join('\n'),
      });
    } catch (error) {
      console.error('kontakt: odeslání e-mailu selhalo', error?.code || error?.message);
      return send(502, { ok: false, error: 'send_failed' });
    }
    return send(200, { ok: true });
  };
}

export default createHandler();

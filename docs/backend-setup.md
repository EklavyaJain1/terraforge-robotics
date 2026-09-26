# FarmBro Backend Setup Guide

*Oracle Always Free database · Clerk authentication · WhatsApp & email automation*

This guide walks through connecting the FarmBro backend to real infrastructure. The Express API (`server/index.ts`), Clerk auth guards, Sentry monitoring, and rate limiting are already built and live-verified — these steps light them up with real services.

---

## 1. Oracle Always Free Database

> "Oracle free version" = **Oracle Cloud Always Free** tier: 2 Autonomous Databases, 20 GB each, ₹0 forever.

### Provision the database

1. Sign up at **cloud.oracle.com** (a card is required for verification; Always Free charges nothing). Choose home region **Mumbai (ap-mumbai-1)** — closest to your Indian users.
2. Console → **Oracle Database → Autonomous Database → Create Autonomous Database**.
3. Workload type: **Transaction Processing** · Deployment: **Always Free**.
4. Set the `ADMIN` password and store it safely.
5. Network access: **Secure access from everywhere** (public endpoint — simplest for a single-region API).
6. Connection type: keep **mutual TLS (wallet)** for reliability, or switch TLS off for the simpler password-only connection. Download the **wallet zip** if using mTLS and keep it on the server only — never in git.
7. Open the database → **Database connection** → copy a connection string (the `medium` TNS alias is a good default).

### Create the app user (least privilege)

Run in **Database Actions → SQL** (as ADMIN):

```sql
CREATE USER farmbro_app IDENTIFIED BY "StrongPassword#2026";
GRANT CREATE SESSION, CREATE TABLE, CREATE SEQUENCE, CREATE TRIGGER TO farmbro_app;
ALTER USER farmbro_app QUOTA 5G ON DATA;
```

Never connect the app as `ADMIN`.

### Recommended code architecture (when implementation is green-lit)

- `oracledb` driver in **thin mode** — no Oracle client install needed on the server.
- Connection pool in `server/db.ts`, initialized from env, with a `dbHealth()` check surfaced by `/api/health`.
- Schema auto-created on boot if missing: `orders`, `contacts`, `notifications`, `users_audit` — each row records `ip_address`, `user_agent`, `created_at`.
- **Oracle primary, JSONL fallback:** if Oracle env is absent or the DB is unreachable, writes fall back to the existing JSONL files in `server/data/` so development never breaks. API responses are identical either way.
- All queries parameterized (bind variables) — no string-built SQL.

### Environment variables

```env
ORACLE_USER=farmbro_app
ORACLE_PASSWORD=StrongPassword#2026
ORACLE_CONNECT_STRING=ap-mumbai-1.adb.oraclecloud.com:1522/xxxx_medium.farmbro.adb.oraclecloud.com
# If using mTLS, point to the unzipped wallet directory:
# TNS_ADMIN=/path/to/wallet
```

---

## 2. Clerk Authentication

The client sign-in modal, HttpOnly `__session` cookie handling, `requireAuth` server guards, svix-verified webhook route, and the admin-role check are already wired. Only console setup + keys are needed.

1. **clerk.com** → Dashboard → **Create application** → enable sign-in methods (Email, Phone, Google, etc.).
2. Copy **Publishable key** (`pk_test_…`) and **Secret key** (`sk_test_…`) into `.env`. The sign-in UI, session cookies, and server auth activate automatically.
3. **Webhook:** Clerk dashboard → Webhooks → add endpoint `https://your-domain/api/webhooks/clerk` → subscribe to `user.created` and `user.deleted` → paste the signing secret (`whsec_…`) into `.env`.
4. **Admin access:** your user → Metadata → Public metadata → `{"role":"admin"}`. This unlocks `GET /api/admin/enquiries`.
5. **IP addresses:** Clerk does not expose client IPs. The API captures `req.ip` (proxy-aware) and user-agent on every submission into the database — that is the audit trail.

> **Honest note on "cookies for performance":** Clerk cookies carry the *login session*, not a page cache — they don't speed the site up. Performance levers are separate: code-splitting the ~1.37 MB JS bundle, HTTP caching/CDN, and image optimization.

### Environment variables

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
```

---

## 3. WhatsApp Automation — owner booking alerts (Meta Cloud API)

Goal: whenever someone books a machine, the **owner's WhatsApp** receives the full form data (customer name, machine, quantity, contact, notes, source page, IP, time) so he can call the lead directly.

1. **business.facebook.com** → verify the client's business.
2. **developers.facebook.com** → create an app → add the **WhatsApp** product → note the **Phone number ID** → generate a **System User token** (permanent; grant `whatsapp_business_messaging`).
3. Create a message template named `booking_alert`, category **UTILITY**. Business-initiated messages require a pre-approved template. Suggested body with named parameters:

   > 🔔 *New booking from the website*
   > Customer: `{{1}}`
   > Machine: `{{2}}` × `{{3}}`
   > Contact: `{{4}}`
   > Notes: `{{5}}`
   > Source: `{{6}}`
   > IP: `{{7}}`
   > At: `{{8}}`

4. Submit for approval (minutes to ~24 h). Add the owner's WhatsApp number as a test/recipient.

### Server-side flow on every booking (designed, non-blocking)

write to Oracle → WhatsApp template → owner → log row in `notifications` (retry once, **Sentry alert on failure**) → confirmation email → customer.

### Environment variables

```env
WHATSAPP_TOKEN=EAAG...
WHATSAPP_PHONE_NUMBER_ID=123456789
WHATSAPP_OWNER_NUMBER=919154153925
WHATSAPP_TEMPLATE_NAME=booking_alert
```

---

## 4. Email to the customer (Nodemailer + SMTP)

The customer receives: *"Thanks for booking — our team will call you within a few hours to recommend the right configuration."*

Gmail route: enable 2FA → create an **App Password** → use it as `SMTP_PASS`. Corporate SMTP works the same way.

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=bookings@farmbro.in
SMTP_PASS=abcd efgh ijkl mnop
SMTP_FROM="FarmBro Robotics <bookings@farmbro.in>"
```

---

## 5. Security checklist (nationwide production)

**Already implemented & live-verified:**

| Control | Status |
|---|---|
| helmet (CSP, HSTS, nosniff, frame options) | ✅ on every response |
| Rate limits — 20/10 min writes, 120/min general | ✅ 429 verified |
| 16 KB request body cap | ✅ 413 verified |
| Zod validation on all writes | ✅ 400 with field errors |
| Clerk webhook svix signature verification | ✅ raw-body verified |
| Sentry error monitoring + PII redaction | ✅ server + browser |
| CORS allow-list | ✅ |
| Auth fail-closed (503 when unconfigured, 401 when signed out) | ✅ |
| HttpOnly session cookies via Clerk | ✅ |

**Added with the database plan:** least-privilege DB user, parameterized queries only, IP + user-agent audit trail, notification retry + Sentry alerting.

**Rule for all of the above:** secrets live in `.env` only — never in git. `.gitignore` already covers `.env*`.

---

## 6. Deployment notes

- `PORT=3005` behind nginx (proxy `/api` + serve `dist/public`) or any Node host.
- Set `NODE_ENV=production` and `CLIENT_ORIGIN` to the public site origin.
- Oracle wallet files (if mTLS) stay on the server, referenced by `TNS_ADMIN` — never committed.
- Build: `pnpm build` · Start: `pnpm start` (runs `NODE_ENV=production node dist/index.js`).

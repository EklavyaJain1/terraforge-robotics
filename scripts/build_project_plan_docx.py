#!/usr/bin/env python3
"""Generate FarmBro master project plan as editable .docx"""

from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt, RGBColor

OUT = Path(__file__).resolve().parents[1] / "docs" / "FarmBro_Project_Master_Plan.docx"


def add_heading(doc, text, level=1):
    doc.add_heading(text, level=level)


def add_para(doc, text, bold=False):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.bold = bold
    return p


def add_bullets(doc, items):
    for item in items:
        doc.add_paragraph(item, style="List Bullet")


def add_table(doc, headers, rows):
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.style = "Table Grid"
    hdr = table.rows[0].cells
    for i, h in enumerate(headers):
        hdr[i].text = h
    for ri, row in enumerate(rows):
        for ci, cell in enumerate(row):
            table.rows[ri + 1].cells[ci].text = cell
    doc.add_paragraph()


def main():
    doc = Document()
    title = doc.add_heading("FarmBro Robotics — Master Project Plan", 0)
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER

    sub = doc.add_paragraph()
    sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = sub.add_run(
        "Consolidated planning document: production website, backend, payments, security, and launch timeline.\n"
        "Prepared for client and development workflow. Editable — update dates and decisions as you go."
    )
    r.italic = True
    r.font.size = Pt(11)

    doc.add_paragraph()
    add_para(doc, "Document version: 1.0  |  Reference date: 21 September 2025  |  Repository: terraforge-robotics / FarmBro")
    doc.add_page_break()

    # 1
    add_heading(doc, "1. Executive summary", 1)
    add_para(
        doc,
        "FarmBro (package name: terraforge-robotics) is a marketing and lead-generation website for Indian-made "
        "agricultural robots. The frontend is largely complete. The business still needs a real backend: lead storage, "
        "WhatsApp notifications, payments (Razorpay), invoices, optional Google login, and production security.",
    )
    add_para(doc, "Recommendation:", bold=True)
    add_bullets(
        doc,
        [
            "Move forward with the project in phases — do not attempt the full wishlist in one release.",
            "Launch mid-October 2025 as Version 1 (MVP): live site + Enquiry + Order/Contact capture + client alerts.",
            "Ship Oracle DB, Razorpay, PDF invoices, Google login, and hardening as Version 1.1 / 2 after launch.",
            "Add a dedicated Enquiry form — buyers need to satisfy themselves before ordering high-ticket machines.",
        ],
    )

    # 2
    add_heading(doc, "2. Current state (what exists today)", 1)
    add_heading(doc, "2.1 Technology stack", 2)
    add_bullets(
        doc,
        [
            "Frontend: React 19, Vite 7, Wouter routing, Tailwind 4, Framer Motion, Lenis smooth scroll.",
            "UI: shadcn/Radix components, 7 languages (EN, HI, ML, TE, KN, GU, PA).",
            "Backend today: Express serves static SPA only — no APIs, database, or CRM.",
            "Catalog: client/src/data/catalog.ts (machines, attachments, slugs, media paths).",
            "Lead capture: Order dialog + Contact form — toast only; data is not persisted or emailed.",
        ],
    )

    add_heading(doc, "2.2 Routes and pages", 2)
    add_table(
        doc,
        ["Route", "Purpose"],
        [
            ["/", "Home — hero, machines, performance, pillars, mission, FAQ, order CTA"],
            ["/farmbro", "Store — lineup, compare, savings calculator, attachments"],
            ["/farmbro/:slug", "Product detail — gallery, specs, order CTA"],
            ["/services", "Services, warranty, warranty FAQ"],
            ["/gallery", "Filtered field photos + attachments"],
            ["/about", "Company story and principles"],
            ["/contact", "Contact form + direct lines"],
        ],
    )

    add_heading(doc, "2.3 Product catalog", 2)
    add_table(
        doc,
        ["Machine", "Type", "Pricing (site)"],
        [
            ["Remote Controlled Mulcher (Hybrid)", "4×4 UGV — Flagship", "Price on request"],
            ["Mulcher, Sprayer & Cargo Carrier", "6×6 UGV — Best seller", "Price on request"],
            ["Mini Mulcher (Electric)", "4×4 UGV — slopes to 45°", "Price on request"],
            ["Canopy Scout", "Scouting drone", "Price on request"],
        ],
    )
    add_para(doc, "Attachments (indicative prices on site): Rotary tiller ₹42,000; Boom sprayer ₹38,000; Brush cutter ₹26,000; Field trailer ₹55,000.")

    add_heading(doc, "2.4 Intended buyers", 2)
    add_bullets(
        doc,
        [
            "B2C — Progressive farmers (demos, training, WhatsApp follow-up).",
            "B2B — Estates, cooperatives, contractors (fleet pricing, pilots).",
            "Enterprise / Government — Civil and defence enquiry options in order form; FAQ mentions fleet and defence.",
        ],
    )
    add_para(
        doc,
        "Note: Copy for “One store. Three kinds of buyers” exists in i18n but is not yet rendered on a page. Order dropdown already includes Fleet/B2B and Government options.",
    )

    add_heading(doc, "2.5 Gaps for production", 2)
    add_bullets(
        doc,
        [
            "No lead persistence (Oracle or other DB).",
            "Placeholder email: hello@farmbro.example.",
            "Media paths reference /images/agri and /videos — ensure real assets are deployed.",
            "No Razorpay, invoices, or WhatsApp automation on sales.",
            "No Google login or customer/admin portal.",
            "Legal pages (privacy, terms) and full SEO per product/language.",
        ],
    )

    doc.add_page_break()

    # 3
    add_heading(doc, "3. Phased roadmap (marketing → platform)", 1)

    add_heading(doc, "Phase 0 — Lock decisions (workshop)", 2)
    add_bullets(
        doc,
        [
            "Brand: FarmBro vs TerraForge.",
            "Domain, business email, WhatsApp Business number.",
            "Sales model: quote-first for machines; optional cart for attachments/deposits.",
            "Buyer paths: farmer / fleet / government.",
            "Geo: India-first vs export.",
            "Content owners: photos, specs, pricing rules, legal, GST details.",
        ],
    )
    add_para(doc, "Deliverable: one-page project brief signed by client.")

    add_heading(doc, "Phase 1 — Live-ready marketing + lead backend", 2)
    add_bullets(
        doc,
        [
            "Wire Enquiry, Order, and Contact forms to API → storage → WhatsApp/email to client.",
            "Validation (Zod), rate limits, CAPTCHA/honeypot on public forms.",
            "Replace placeholder contact details; privacy + terms stubs.",
            "Real images/videos; sitemap, meta, OG tags.",
            "Analytics + error monitoring.",
            "Render three buyer audiences section OR remove unused copy.",
        ],
    )
    add_para(doc, "Exit: every enquiry reaches the client and is stored.")

    add_heading(doc, "Phase 2 — Split buying journeys", 2)
    add_bullets(
        doc,
        [
            "B2C: Book field demo — crop, acres, district, machine interest.",
            "B2B: Fleet pricing — company, GSTIN, machine count, sites, timeline.",
            "Gov/Defence: separate institutional form — organisation, tender/RFP, compliance, NDA.",
        ],
    )

    add_heading(doc, "Phase 3 — Product system of record", 2)
    add_bullets(
        doc,
        [
            "Move catalog to CMS or Oracle-backed admin (machines, attachments, specs, media).",
            "PDF spec sheets; attachment configurator → indicative total → RFQ.",
        ],
    )

    add_heading(doc, "Phase 4 — Sales ops (without full e-commerce for machines)", 2)
    add_bullets(
        doc,
        [
            "Lead pipeline: New → Demo → Quoted → Won/Lost.",
            "Quote PDF generator; demo scheduling.",
            "Dealer lead routing when applicable.",
        ],
    )

    add_heading(doc, "Phase 5 — Trust and enterprise polish", 2)
    add_bullets(
        doc,
        [
            "Warranty/AMC PDFs; compliance hub (e.g. drone regulations).",
            "Real testimonials/field footage only (no fabricated reviews).",
            "Multi-language QA; accessibility; performance (video compression, CDN).",
        ],
    )

    add_heading(doc, "Phase 6 — Scale (after Phases 1–4)", 2)
    add_bullets(
        doc,
        [
            "Dealer portal; fleet dashboard product login.",
            "Spare parts with real checkout.",
            "Tender document packs.",
        ],
    )

    doc.add_page_break()

    # 4 Backend architecture
    add_heading(doc, "4. Target backend architecture (client requirements)", 1)
    add_para(
        doc,
        "Browser (FarmBro React) → CDN/cache (e.g. Cloudflare) → API backend (Node: Express/Nest) → "
        "Oracle Database → Razorpay → WhatsApp Business API → PDF invoice service → Email (optional).",
    )
    add_para(doc, "Roles (later): Guest, Customer, Dealer (optional), Admin (client — 2FA required).")
    add_para(doc, "Public pages stay open for SEO. Login for orders, invoices, and protected engineering assets — not required to browse machines.")

    add_heading(doc, "4.1 Oracle Database (free tier ~20 GB)", 2)
    add_bullets(
        doc,
        [
            "Suitable for: users, leads, orders, payments, invoice metadata.",
            "Not for storing all raw videos/3D files — use object storage + CDN; store URLs in Oracle.",
            "Browser never connects to Oracle; only the API uses credentials from environment secrets.",
        ],
    )

    add_heading(doc, "4.2 Razorpay", 2)
    add_bullets(
        doc,
        [
            "Start with attachments and/or machine deposits — not full open checkout for lakh-rupee machines on day one.",
            "Webhook is source of truth for payment.captured (not browser redirect alone).",
            "Idempotent webhooks to avoid duplicate invoices.",
        ],
    )

    add_heading(doc, "4.3 WhatsApp on sale / enquiry", 2)
    add_bullets(
        doc,
        [
            "On enquiry: notify client with all form fields.",
            "On successful payment: notify client + customer; attach or link invoice PDF.",
            "Requires WhatsApp Business API (Meta) or approved provider (Twilio, etc.).",
        ],
    )

    add_heading(doc, "4.4 Google login and sessions", 2)
    add_bullets(
        doc,
        [
            "OAuth for customers/dealers after MVP — not required for mid-October launch.",
            "httpOnly Secure cookies; CSRF protection.",
            "Log IP and user-agent for audit only — not as sole identity verification.",
        ],
    )

    add_heading(doc, "4.5 PDF invoices", 2)
    add_bullets(
        doc,
        [
            "Generate server-side on payment success (GSTIN, HSN, place of supply per client legal input).",
            "Send to buyer and to client (email and/or WhatsApp).",
        ],
    )

    doc.add_page_break()

    # 5 Security
    add_heading(doc, "5. Security — what to build vs what to promise", 1)

    add_heading(doc, "5.1 Implement (real production security)", 2)
    add_table(
        doc,
        ["Layer", "Measures"],
        [
            ["Transport", "HTTPS only, HSTS"],
            ["Application", "Input validation, parameterized SQL, CSRF, security headers"],
            ["Auth", "httpOnly cookies, session rotation, 2FA for admin"],
            ["Abuse", "Rate limits, CAPTCHA on forms/login, WAF (e.g. Cloudflare)"],
            ["Secrets", "Environment vault; never in frontend"],
            ["Data", "TLS to Oracle; encrypt sensitive PII columns if required; encrypted backups"],
            ["Payments", "Verify Razorpay webhook signatures; never trust client-submitted amounts alone"],
            ["Media IP", "High-res / 3D / CAD behind auth + short-lived signed URLs"],
            ["Cache", "CDN for static assets and safe public pages; do not cache authenticated/checkout responses"],
        ],
    )

    add_heading(doc, "5.2 Do not promise (browser limitations)", 2)
    add_table(
        doc,
        ["Client ask", "Reality"],
        [
            ["No screenshots", "Cannot be enforced on web or mobile OS"],
            ["No DevTools / no viewing code", "Frontend is always inspectable; obfuscation only slows casual users"],
            ["No image/video/3D download", "Deterrents (watermark, no right-click) only; protect source files server-side"],
            ["Unhackable / everything encrypted = no hack", "Aim for strong, audited, least-privilege — not absolute guarantees"],
            ["IP address as login verification", "Use as fraud signal only; IPs change and VPNs exist"],
        ],
    )
    add_para(
        doc,
        "Client messaging: “We protect payments, customer data, and engineering files with server security. "
        "We cannot guarantee blocking all screenshots on the open web. We lock down admin, APIs, and downloadable source assets.”",
    )

    doc.add_page_break()

    # 6 Enquiry form
    add_heading(doc, "6. Enquiry form (recommended — add or clarify)", 1)
    add_para(
        doc,
        "Yes — add or prominently label an Enquiry flow. High-ticket agri robots convert better enquiry-first than buy-now.",
    )
    add_heading(doc, "6.1 Suggested fields", 2)
    add_bullets(
        doc,
        [
            "Name, phone/WhatsApp, location/district",
            "Crop or use case, acres (optional)",
            "Interest type: demo / pricing / fleet / government / other",
            "Free-text message",
        ],
    )
    add_heading(doc, "6.2 Relationship to existing forms", 2)
    add_table(
        doc,
        ["Form", "When to use"],
        [
            ["Enquiry", "“I want information / demo / satisfy myself first”"],
            ["Order request", "“I know what I want — machine + quantity”"],
            ["Contact", "General topics — service, partnership, etc."],
        ],
    )
    add_para(doc, "Backend: single leads table with type = enquiry | order | contact.")

    doc.add_page_break()

    # 7 Timeline
    add_heading(doc, "7. Timeline and capacity (21 Sep → mid-October 2025)", 1)

    add_heading(doc, "7.1 Your available hours", 2)
    add_table(
        doc,
        ["Period", "Hours"],
        [
            ["Weekdays (~19 days × 1 hr/day)", "~19 hours"],
            ["Weekends (3 × 2–3 hrs)", "~6–9 hours"],
            ["Total to ~15 October", "~25–28 hours"],
        ],
    )
    add_para(doc, "This is roughly one full-time engineering week — not enough for the complete backend + payments + login + fortress stack by mid-October.")

    add_heading(doc, "7.2 What fits mid-October (MVP — Version 1)", 2)
    add_bullets(
        doc,
        [
            "Polish current site; dedicated Enquiry CTA/page",
            "Forms → WhatsApp/email (+ simple storage if time allows)",
            "Real media, privacy/terms, basic SEO",
            "Form validation, HTTPS, basic rate limiting / CAPTCHA",
            "Optional only if time remains: Razorpay deposit for attachments",
        ],
    )

    add_heading(doc, "7.3 What to schedule after launch (Version 1.1 / 2)", 2)
    add_para(doc, "At 1 hr/day + weekends, expect roughly 4–6 additional weeks after mid-October for:")
    add_bullets(
        doc,
        [
            "Oracle schema + full API",
            "Razorpay webhooks + GST invoice PDFs",
            "WhatsApp on paid orders",
            "Google login + customer/admin portal",
            "CDN, WAF, full hardening",
        ],
    )

    add_heading(doc, "7.4 Suggested week-by-week (MVP)", 2)
    add_table(
        doc,
        ["Week", "Dates (approx.)", "Focus (~8–10 hrs each)"],
        [
            ["Week 1", "22–28 Sep", "Client decisions; Enquiry UX; lead destination (WhatsApp/email)"],
            ["Week 2", "29 Sep – 5 Oct", "Wire all forms; legal stubs; real assets; SEO basics"],
            ["Week 3", "6–12 Oct", "Client UAT; mobile/bugs; security basics on forms"],
            ["Buffer", "13–15 Oct", "Final QA; content freeze; go live"],
        ],
    )

    add_heading(doc, "7.5 One-line message for client", 2)
    add_para(
        doc,
        "“We launch mid-October with a production marketing site, Enquiry + Order capture, and WhatsApp/email alerts. "
        "Razorpay, invoices, Oracle backend, and Google login follow in Phase 2 immediately after launch.”",
        bold=False,
    )

    doc.add_page_break()

    # 8 MVP checklist
    add_heading(doc, "8. Implementation checklists", 1)

    add_heading(doc, "8.1 MVP launch checklist (mid-October)", 2)
    add_bullets(
        doc,
        [
            "[ ] Brand, domain, phone, WhatsApp confirmed",
            "[ ] Enquiry form live with clear CTA",
            "[ ] Order + Contact wired to client notifications",
            "[ ] Leads stored (spreadsheet/API/DB — minimum viable record)",
            "[ ] Privacy policy and terms published",
            "[ ] Product images and videos on CDN/host",
            "[ ] Sitemap and page meta tags",
            "[ ] CAPTCHA or rate limit on public forms",
            "[ ] Client UAT on real phones (regional languages spot-check)",
        ],
    )

    add_heading(doc, "8.2 Phase 2 checklist (post-launch)", 2)
    add_bullets(
        doc,
        [
            "[ ] Oracle: leads, orders, payments, users tables",
            "[ ] API: POST /leads, POST /orders, Razorpay create + webhook",
            "[ ] Invoice PDF template (GST fields from client)",
            "[ ] WhatsApp templates approved by Meta",
            "[ ] Google OAuth + customer “my orders/invoices”",
            "[ ] Admin panel with 2FA",
            "[ ] Signed URLs for protected media",
            "[ ] Cloudflare CDN + WAF",
        ],
    )

    add_heading(doc, "8.3 Suggested database tables (Phase 2)", 2)
    add_table(
        doc,
        ["Table", "Purpose"],
        [
            ["leads", "enquiry | order | contact; JSON payload; source page; created_at"],
            ["users", "Google id, email, role, created_at"],
            ["orders", "user_id, line items, amounts, status, razorpay_order_id"],
            ["payments", "order_id, razorpay_payment_id, status, captured_at"],
            ["invoices", "order_id, pdf_url, invoice_number, gst details"],
        ],
    )

    doc.add_page_break()

    # 9 What not to do
    add_heading(doc, "9. What not to do", 1)
    add_bullets(
        doc,
        [
            "Full cart/checkout for machines before CRM and lead flow work.",
            "Dealer portal before first conversions.",
            "Another full visual redesign — brand direction is already strong.",
            "More languages before EN/HI forms and flows are solid.",
            "Fabricated testimonials or fake enterprise case studies.",
            "Promising unhackable site or no screenshots to the client.",
        ],
    )

    # 10 Next steps
    add_heading(doc, "10. Next steps for developer", 1)
    add_bullets(
        doc,
        [
            "Run Phase 0 workshop with client; fill in Section 11 decision log.",
            "Choose MVP lead path: WhatsApp-only vs email vs Oracle from day one.",
            "Implement Enquiry + form wiring (Phase 1).",
            "Set launch date with client as soft launch MVP; document Phase 2 start date.",
            "Optional: request WhatsApp Business API and Razorpay merchant approval early (lead times).",
        ],
    )

    add_heading(doc, "11. Decision log (edit this section with client)", 1)
    add_table(
        doc,
        ["Decision", "Client answer", "Date"],
        [
            ["Official brand name", "", ""],
            ["Production domain", "", ""],
            ["Business email", "", ""],
            ["WhatsApp Business number", "", ""],
            ["GSTIN for invoices", "", ""],
            ["Launch date (MVP)", "Mid-October 2025", ""],
            ["Phase 2 start date", "", ""],
            ["Oracle account owner", "", ""],
            ["Razorpay account status", "", ""],
        ],
    )

    doc.add_paragraph()
    add_para(doc, "— End of document —")
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run("You may edit any section in Microsoft Word, Google Docs (upload), or LibreOffice.")
    run.font.size = Pt(10)
    run.font.color.rgb = RGBColor(0x64, 0x73, 0x6C)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc.save(OUT)
    print(OUT)


if __name__ == "__main__":
    main()

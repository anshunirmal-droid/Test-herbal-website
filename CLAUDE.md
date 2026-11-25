# Project: herbal supplement brand website (scaleprove.com)

## What this is
A one-page brand + launch-waitlist site for an India-sourced herbal supplement brand selling in the US (Amazon US first). Currently a personal/hobby project hosted on Vercel's free Hobby plan.

## Stack
- Vite + React 18, plain CSS (no Tailwind), react-router-dom for /login, /set-password, /dashboard
- Supabase (database + auth) via `@supabase/supabase-js`; `vercel.json` rewrites all paths to index.html
- Deployed on Vercel from GitHub (`main` branch auto-deploys)
- Domain: scaleprove.com (registered at GoDaddy; DNS A record + www CNAME point to Vercel)

## Commands
- `npm install` then `npm run dev` (http://localhost:5173)
- `npm run build` outputs to `dist/`

## Where things live
- `src/config.js`: brand name, email, Amazon store URL, waitlist endpoint, products, FAQs. Edit content here first.
- `src/App.jsx`: landing sections (Nav, Hero, Products, Sourcing, Quality, Faq, Contact, Waitlist, Footer) and the routes
- `src/pages/`: Login (log in / sign up / forgot password), SetPassword (invite + reset links), Dashboard (account info + tools)
- `src/auth.jsx`, `src/supabaseClient.js`, `src/forms.js`: auth context, Supabase client, form inserts
- `supabase/schema.sql`: all tables + Row Level Security. Run it in the Supabase SQL Editor. Env vars in `.env` (see `.env.example`); only the public anon key is ever used
- `src/styles.css`: design tokens (CSS variables) at the top; palette is forest green #1F3A2E, cream #F7F3EA, sand #ECE5D3, turmeric #B5651D. Fonts are Fraunces (headings) and Inter (body).
- `index.html`: page title and meta description

## Product line (launch plan)
1. Root-only ashwagandha, 600 mg × 60 (hero)
2. Organic psyllium husk
3. Boswellia AKBA (joint)

## Rules for content changes
- Supplement claims must stay structure/function only ("supports…"), marked with `*`, and the FDA disclaimer must stay in the footer. Never say a product treats, cures or prevents a disease.
- Keep the ashwagandha caution (pregnancy, liver/thyroid, medication).
- No fake reviews or testimonials.
- "Vanyaa Roots" is a placeholder brand name; prices are placeholders.

## Accounts model
- Customers sign up on the site (status `pending`) or are invited from the Supabase dashboard (status `approved`). Approve by setting `profiles.status = 'approved'`.
- Dashboard tools come from the `tools` table (approved users only). Never put the service_role key in the frontend.
- Do not collect health information in forms or profiles.

## Open to-dos
- Replace placeholder brand name, email and prices
- Create the Supabase project, run `supabase/schema.sql`, set env vars locally and in Vercel (forms and login are inactive until then)
- Email notifications for new form entries (Supabase Database Webhook + Edge Function + Resend, optional)
- Add a Privacy Policy page before collecting emails

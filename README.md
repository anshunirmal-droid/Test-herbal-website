# Vanyaa Roots: brand website

A one-page brand and launch-waitlist site for an India-sourced herbal supplement brand. Built with Vite + React, deployable to Vercel in a few clicks.

"Vanyaa Roots" is a placeholder name. Check USPTO (Class 5) availability before using it.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Deploy (GitHub + Vercel)

1. Create a new GitHub repo and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In Vercel: **Add New → Project → Import** the repo. Vercel detects Vite automatically (build `npm run build`, output `dist`). Click **Deploy**.
3. Add your domain under **Project → Settings → Domains**.

Every push to `main` redeploys automatically.

## Customise

Almost everything lives in **`src/config.js`**:

| Setting | What it does |
| --- | --- |
| `brand.name`, `tagline` | Brand name and hero line |
| `brand.email` | Contact address shown on the site |
| `brand.amazonStoreUrl` | When set, product cards show "Buy on Amazon" instead of "Coming soon" |
| `brand.waitlistEndpoint` | A form endpoint (e.g. Formspree) to collect waitlist emails. Empty = opens the visitor's email app |
| `products` | Names, formats, prices, benefits, cautions |
| `faqs` | FAQ questions and answers |

Colours and fonts are CSS variables at the top of `src/styles.css`. The page title and meta description are in `index.html`.

### Collecting waitlist emails

1. Create a free form at https://formspree.io (or similar).
2. Paste its endpoint URL into `brand.waitlistEndpoint`.
3. Commit and push. Vercel redeploys.

## Before going live: compliance check

- **Claims:** keep benefit text to structure/function wording ("supports…"), each marked `*`, with the FDA disclaimer in the footer (already included). Never say a product treats, cures or prevents a disease.
- **Quality promises:** the site says every lot is tested by an ISO 17025 lab and made in a cGMP facility. Make sure that is true for your supply chain before launch, or edit the copy.
- **Cautions:** keep the pregnancy and liver/thyroid cautions on ashwagandha.
- **Prices** are placeholders from the launch plan. Update them to match your Amazon listings.
- Add a Privacy Policy page before you collect emails or run ads.

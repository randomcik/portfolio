## Denis Sava — Portfolio

Ultra-minimal, mobile-first portfolio built with Next.js (App Router) + Tailwind, deployed on Netlify.

## Getting Started

Install and run the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Pages
- Home: `src/app/page.tsx`
- About + contact form: `src/app/about/page.tsx`
- Portfolios: `src/app/portfolio/[category]/page.tsx` where `category` is `graphic`, `web`, or `uiux`

## Projects (file-based)
Edit:
- `src/content/projects.ts` (project list + categories)

Images live in `public/`:
- `public/projects/<category>/<projectSlug>/<01>.jpg`

Example:
- `public/projects/graphic/sample-brand-system/01.jpg`

## Contact form (SMTP)
The form posts to `POST /api/contact` (`src/app/api/contact/route.ts`) and sends email using SMTP.

### Local dev
Create `.env.local` with the variables from `.env.example`.

### Netlify
Add the same environment variables in your Netlify site settings.

Required variables:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

## Deploy
This repo includes `netlify.toml` with the Next.js plugin enabled.

If you prefer another hosting option later, the app is also compatible with any Node-capable platform.

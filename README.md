# Sarbjot.dev

Next.js (App Router) + Tailwind CSS 4 + Framer Motion portfolio.

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

## Things to personalise
- `public/images/portrait.jpg` (or .png/.webp): your photo. Until it exists, a placeholder is shown.
- `public/resume.pdf`: currently a placeholder PDF; replace with your resume.
- `data/projects.js`: set `github` and `demo` URLs (empty = disabled button), or add `image: "/images/x.png"` for real screenshots.
- `data/socialLinks.js`: GitHub, LinkedIn, email, X.
- `data/site.js`: stats, quote, tagline, and `contactEndpoint`.
- Contact form: set `NEXT_PUBLIC_CONTACT_ENDPOINT` (e.g. a Formspree URL) in `.env.local`. Until then the form validates but says nothing was sent.
- `data/skills.js`: edit technologies and categories.

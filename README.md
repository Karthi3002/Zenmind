# Zenmind Technologies

A responsive multi-page website built with React, TypeScript, Vite, React Router, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local address after the server starts.

## Build and preview

```bash
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static host configured to serve `index.html` for client-side routes. Routes include `/`, `/about`, `/services`, `/services/:slug`, `/work`, and `/contact`.

## Before launch

- Replace the contact email, phone, and city placeholders in `src/App.tsx`.
- Replace sample portfolio entries, project imagery, team, and testimonial placeholders with approved company material.
- Connect the contact form to an email or form service. It currently validates in the browser and displays a local success state; submissions are not sent or stored.
- Replace `YOUR_DOMAIN_HERE` in `public/sitemap.xml` and `public/robots.txt`, then add a production-domain canonical URL and Open Graph image before deployment.
- Replace the sample Unsplash imagery with appropriately licensed project photography.

## Included

- Home, About, Services, six service detail routes, Portfolio, and Contact pages.
- Responsive navigation, light/dark theme toggle, category filters, and browser-native contact form validation.
- Per-page title and description updates, keywords and Open Graph metadata, and reduced-motion support.

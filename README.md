# Austin Creamer — Portfolio

Personal site of **Austin Creamer ("Apollo")**, Senior Full-Stack Engineer.

**Live:** https://apollo0229.github.io/portfolio/

The site has one view per role, and each view reorders the headline, metrics, case studies and skills for that role:

| View | URL |
| --- | --- |
| Full Stack | [`/`](https://apollo0229.github.io/portfolio/) |
| Frontend | [`/frontend/`](https://apollo0229.github.io/portfolio/frontend/) |
| Backend | [`/backend/`](https://apollo0229.github.io/portfolio/backend/) |
| AI Engineer | [`/ai/`](https://apollo0229.github.io/portfolio/ai/) |

Ten case studies from Zapier, Regions Bank and Shipt live under `/projects/<slug>/`. Each covers the focus, architecture, the hard part, the approach and reported outcomes, with an animated system-flow diagram. A "How I build" section links six recurring engineering patterns to the projects that use them.

Every page has its own share card (`og.png`, rendered at build time) and is listed in `sitemap.xml`.

## Stack

- **Next.js 16** (App Router, static export) · **React 19** · **TypeScript**
- **Tailwind CSS v4** for the design system (theme tokens in `src/app/globals.css`)
- **Motion** for scroll reveals, layout transitions and spring physics
- A hand-written **Canvas 2D** service-graph animation in the hero (`src/components/effects/network-canvas.tsx`), paused off-screen and disabled under `prefers-reduced-motion`
- **GitHub Actions → GitHub Pages** deployment (`.github/workflows/deploy.yml`)

## Structure

```
src/
  data/          # all content: profile, case studies, per-role configuration
  app/           # routes: /, /[role], /projects/[slug]
  components/
    sections/    # hero, work, experience, skills, contact
    effects/     # canvas graph, count-up, spotlight cards, typed code, reveals
```

All content lives in `src/data`, so editing text never means editing components.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
```

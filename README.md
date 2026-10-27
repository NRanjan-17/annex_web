# Annex website

The website for [Annex](https://github.com/NRanjan-17/Annex): use another computer as a second screen, or mirror its screen. Mac, Windows and Linux, encrypted end to end.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static pages) and React 19, in TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with Annex's design tokens in `app/globals.css`
- [Motion](https://motion.dev) for the tabs and scene transitions
- Geist and Geist Mono through `next/font`

## Run it

Needs Node.js 24 (Vercel builds with 24.x, set in `package.json`).

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Deploy

Built for [Vercel](https://vercel.com): import the repository and keep the defaults (framework preset **Next.js**). Every push to `main` deploys; pull requests get preview links.

## Layout

```
app/
  layout.tsx       fonts, metadata, skip link
  page.tsx         the page, section by section
  globals.css      Tailwind, Annex tokens, buttons and chips
components/
  hero.tsx         wordmark, headline, download and install command
  stage.tsx        the tabbed product panel (Extend, Mirror, Control, Anywhere)
  bento.tsx        feature grid
  steps.tsx        how it works
  privacy.tsx      encryption and privacy
  downloads.tsx    per-platform downloads
  faq.tsx, footer.tsx, nav.tsx
  links.ts         every download link and install command in one place
public/assets/     the app icon
```

Download buttons use GitHub's `releases/latest/download/<file>` links, so they always serve the newest release without changes here.

## Design

Black and white, with every fill and line white at an alpha, and green only for something live: the same look as the Annex apps. Glass is used once, on the privacy panel. Motion respects *Reduce motion*.

## License

MIT. See [LICENSE](LICENSE).

# Annex website

The website for [Annex](https://github.com/NRanjan-17/annex), live at [getannex.dev](https://getannex.dev): use another computer as a second screen, or mirror its screen. Mac, Windows and Linux, encrypted end to end.

Two pages: the home page, and [`/docs`](https://getannex.dev/docs) (install, pair, try every feature, shortcuts, troubleshooting, uninstall).

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static pages) and React 19, in TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with Annex's design tokens in `app/globals.css`
- [Motion](https://motion.dev) for the tabs, scene transitions and the shortcut gallery
- Canvas 2D for the hero's dot field and the dotted globe
- Geist and Geist Mono through `next/font`
- [Vercel Web Analytics](https://vercel.com/docs/analytics) for page views (no cookies)

## Run it

Needs Node.js 24 (Vercel builds with 24.x, set in `package.json`).

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Deploy

Built for [Vercel](https://vercel.com): import the repository and keep the defaults (framework preset **Next.js**). Every push to `main` deploys; pull requests get preview links. `next.config.ts` sets the security headers and sends `docs.getannex.dev` to `getannex.dev/docs`.

## Layout

```
app/
  layout.tsx           fonts, metadata, icons, analytics, skip link
  page.tsx             the home page, section by section
  docs/page.tsx        the docs
  globals.css          Tailwind, Annex tokens, buttons, chips, framed surfaces
components/
  nav.tsx, footer.tsx  header (clear over the hero, then a blurred bar) and footer
  hero.tsx             full-screen dot field (dot-field.tsx), download and install command
  stats.tsx            dotted globe and the numbers
  stage.tsx            the tabbed product panel (Extend, Mirror, Control, Anywhere)
  bento.tsx            feature grid
  steps.tsx            how it works
  privacy.tsx          encryption and privacy
  downloads.tsx        per-platform downloads and install commands
  faq.tsx, cta.tsx     questions, and the closing call to action
  keyboard-gallery.tsx the docs' shortcut gallery: Mac, Windows and Linux keyboards
  docs-ui.tsx          keys, steps and app labels used on the docs page
  links.ts             every download link and install command in one place
public/assets/         the app icon and the bare mark (favicon)
```

Each component credits the design it was built from (via lookap) in a comment at its top.

Download buttons use GitHub's `releases/latest/download/<file>` links, so they always serve the newest release without changes here.

## Design

Black and white, with every fill and line white at an alpha, and green only for something live: the same look as the Annex apps. Sections sit in thin framed surfaces with corner brackets. Every page works down to phone width, and motion respects *Reduce motion*.

## License

MIT. See [LICENSE](LICENSE).

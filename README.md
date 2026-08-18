# TableTap — Marketing Site

The public marketing website for TableTap, the all-in-one restaurant platform. A
standalone Next.js app that showcases every feature and role, with a dedicated
page per feature.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** (design tokens in [`app/globals.css`](app/globals.css))
- **Framer Motion** for scroll-reveal + micro-animations
- **TypeScript**, **ESLint** (flat config) + **Prettier**
- **Husky** + **lint-staged** pre-commit hooks

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | What it does               |
| ------------------- | -------------------------- |
| `npm run dev`       | Start the dev server       |
| `npm run build`     | Production build           |
| `npm run start`     | Serve the production build |
| `npm run lint`      | ESLint                     |
| `npm run lint:fix`  | ESLint with `--fix`        |
| `npm run typecheck` | `tsc --noEmit`             |
| `npm run format`    | Prettier write             |

## Structure

```
app/
  layout.tsx            Root layout — fonts + site chrome
  page.tsx              Home / overview
  about, pricing, contact, <feature>/  One route per page
  _components/          Nav, sections, animated demos, feature-page template
components/ui/          Button, Input, Label
lib/utils.ts           cn() class merger
```

## Theming

The whole palette flows from a few CSS variables in `app/globals.css`
(`--brand`, `--accent`, and their tints). Swap those hex values to rebrand — no
component changes needed.

## Notes

- The **Sign in / Get started** buttons and the contact form are wired to
  placeholders (`/login`, a local success state). Point them at the real app URL
  and a contact endpoint when available.

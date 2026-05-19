# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (Vite, localhost:5173)
npm run build      # TypeScript compile + Vite production build
npm run typecheck  # type-check without emitting (tsconfig.app.json)
npm run lint       # ESLint
npm run preview    # preview the production build locally
```

No test suite is configured.

## Architecture

Single-page portfolio site. `App.tsx` composes all sections in order: `Navbar → Hero → About → Skills → Projects → Experience → Testimonials → Contact → Footer`. All routing is anchor-based (`#section-id`); there is no React Router.

**Styling conventions:**
- Tailwind CSS only — no CSS modules or styled-components
- Dark theme (`bg-neutral-950` base) with `sky-400`/`cyan-300` accent colors
- Two utility classes defined in `index.css` are used heavily: `.text-gradient` (sky→cyan gradient text) and `.section-padding` (responsive horizontal padding). `.font-display` applies Playfair Display.
- Section headers follow a consistent pattern: small `text-sky-400` label above a `font-display` h2, followed by `text-neutral-400` description.

**Icons:** Use `lucide-react` exclusively — no other icon libraries.

**Backend — Supabase:**
- Client is initialized in `src/lib/supabase.ts` from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` env vars.
- The only database table is `contact_messages` (see migration in `supabase/migrations/`). RLS allows anon INSERT only; no public reads.
- The `Contact` component is the sole consumer of the Supabase client.

**Environment variables needed for local dev:**
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

A `cv.pdf` file should be placed in the `public/` directory to enable the "Download CV" button in the Hero section.

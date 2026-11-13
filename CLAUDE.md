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

`App.tsx` is a `BrowserRouter` with two routes; anything unmatched redirects to `/`.

| Route | Page | Notes |
| --- | --- | --- |
| `/` | `pages/Portfolio.tsx` | The public site |
| `/admin` | `pages/Admin.tsx` | Private message portal |

`pages/Portfolio.tsx` composes all sections in order: `Navbar → Hero → About → Skills → Projects → Experience → Testimonials → Contact → Footer`. Navigation *within* the portfolio is anchor-based (`#section-id`) — React Router only distinguishes the portfolio from the admin portal.

Because `/admin` is a client-side route, static hosts need an SPA fallback so a hard refresh does not 404. Two configs are committed, and each host ignores the other's file:

| Host | File |
| --- | --- |
| Netlify | `public/_redirects` |
| Vercel | `vercel.json` |

Both are catch-all rewrites to `/index.html`. This does not shadow the hashed bundles in `/assets`, because both hosts resolve real files before applying rewrites. Other hosts (Cloudflare Pages, GitHub Pages, S3/CloudFront) need their own equivalent.

**Admin portal (`/admin`):**
- `pages/Admin.tsx` resolves the Supabase session, then renders either `components/admin/AdminLogin.tsx` or `components/admin/AdminDashboard.tsx`. It subscribes to `onAuthStateChange`, so sign-in and sign-out swap the view without a reload.
- The client-side gate is UX only. The actual protection is RLS — see below.
- `AdminDashboard` owns the message list, including the Realtime subscription. It lives here rather than in `Admin.tsx` because that is where the `messages` state is; putting it a level up would mean lifting state for no benefit.
- Realtime merges `postgres_changes` events into local state instead of refetching, so the list does not flicker. INSERT prepends (guarded against duplicating a row the initial fetch already returned), UPDATE patches in place, DELETE removes by id. `contact_messages` must be in the `supabase_realtime` publication or the channel reports `SUBSCRIBED` and silently delivers nothing — hence the migration. The header shows a Live/Connecting/Offline dot, and Refresh remains as a manual fallback.

**Styling conventions:**
- Tailwind CSS only — no CSS modules or styled-components
- Dark theme (`bg-neutral-950` base) with `sky-400`/`cyan-300` accent colors
- Two utility classes defined in `index.css` are used heavily: `.text-gradient` (sky→cyan gradient text) and `.section-padding` (responsive horizontal padding). `.font-display` applies Playfair Display.
- Section headers follow a consistent pattern: small `text-sky-400` label above a `font-display` h2, followed by `text-neutral-400` description.

**Icons:** Use `lucide-react` exclusively — no other icon libraries.

**Backend — Supabase:**
- Client is initialized in `src/lib/supabase.ts` from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` env vars, which also exports the `ContactMessage` / `ContactMessageInput` types. The module throws when loaded if either env var is missing.
- The client is kept out of the public bundle: `App.tsx` lazy-loads `pages/Admin.tsx`, and `Contact` imports `lib/supabase` dynamically on submit (type-only import at the top). So a missing env var no longer breaks the public page at startup — it surfaces as the contact form's error state, and as a load failure on `/admin`. Do not add a static `import { supabase }` to anything `Portfolio.tsx` renders.
- The only database table is `contact_messages` (see migrations in `supabase/migrations/`). Columns: `id`, `name`, `email`, `subject`, `message`, `is_read`, `created_at`.
- RLS: anon may INSERT (public form). SELECT / UPDATE / DELETE are restricted to the admin identified by `public.is_portfolio_admin()`, which matches the JWT email claim against one allow-listed address. **Being merely authenticated is not enough**, so enabling public sign-ups cannot leak message contents. To change admin, edit that function.
- Consumers: `Contact` (insert) and `components/admin/*` (read, update `is_read`, delete, auth).
- The contact form has a honeypot field (`fax`): if it is filled, the form shows success without inserting. `subject` is optional and is stored as `''` when left blank.

**Admin setup (one-time, in the Supabase dashboard):**
1. Apply the migrations in `supabase/migrations/`.
2. Create the admin user under Authentication → Users, using the same email allow-listed in `is_portfolio_admin()`.
3. Keep Authentication → Providers → Email → "Confirm email" consistent with how you created the user, or sign-in will fail on an unconfirmed address.

**Environment variables needed for local dev** (copy `.env.example` to `.env`):
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

A `cv.pdf` file should be placed in the `public/` directory to enable the "Download CV" button in the Hero section.

**Other static assets in `public/`:**
- `profile.webp` — the portrait. The hero shows it at `lg` and up, About shows it below `lg`, so it never renders twice.
- `favicon.svg`, `og-image.jpg` (1200×630 share image).
- `index.html` hard-codes the deployed origin in `canonical`, `og:url`, `og:image` and `twitter:image`, because social crawlers need absolute URLs. Update all four if the domain changes.

**Accessibility conventions:**
- Primary buttons are `bg-sky-500` with `text-neutral-950` — white on `sky-500` is only 2.77:1.
- `text-neutral-400` is the dimmest colour used for readable text; `neutral-500`/`600` fail AA on this background.
- Every `<section>` has `aria-labelledby` pointing at its `h2`. Focus styling comes from the global `:focus-visible` rule in `index.css`, which also holds the `prefers-reduced-motion` overrides.

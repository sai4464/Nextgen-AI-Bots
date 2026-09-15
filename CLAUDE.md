# NextGen AI Bots website

Next.js 13.5 (App Router), Tailwind, static export (`output: 'export'` in `next.config.js`).

## Deploy
- Vercel builds and deploys automatically on every push to `main` of `sai4464/Nextgen-AI-Bots`. There is no GitHub Actions workflow and no GitHub Pages.
- There is no server. API routes do not work under static export; anything that needs a backend runs from the browser (the contact form uses EmailJS).

## Local dev
- `npm install`, then `npm run dev` → http://localhost:3000
- Do NOT run `npm run build` while `npm run dev` is running: the build overwrites `.next` and the dev server starts serving unstyled pages. Stop dev, build, delete `.next`, restart dev.
- `.env.local` is gitignored. See `.env.local.example`. The EmailJS IDs are inlined as fallbacks in `app/contact/page.tsx`, so only the gallery's Drive API key is needed locally.

## Contact form
- The live form is inline in `app/contact/page.tsx`. There is no separate contact component.
- EmailJS template `template_go6tgeo` still has the stock auto-reply body, so the payload sends both `{{name}}`/`{{title}}` and `{{from_name}}`/`{{reply_to}}`/`{{role}}`/`{{message}}`.

## Build manual (`/manual`)
- Pages: `components/manual/manualPages.tsx`. Flip-book shell: `FlipBook.tsx`. 3D: `AssemblyView.tsx` (three.js driven directly, not react-three-fiber, which renders blank under this setup).
- Assembly model, one source of truth: `lib/robo-dog-steps.ts` (every part instance, its step, position and animation) and `lib/robo-dog.ts` (measured geometry, linkage solver).
- STLs in `public/kit/stl`. Coordinates are the STL's own mm frame: X across the body, Y nose (−) to tail (+), Z up.
- Style rules from the owner: no em-dashes in visible text; gold (`#C4A76A`/`#A98F4F`) for top cap, short legs and nuts, charcoal `#3F454E` for everything else.

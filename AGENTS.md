# AGENTS.md

## Project

`heal-myself` is a mobile-first health knowledge atlas for「全身健康关注地图」. It is a pure frontend educational page built with Vite + React + TypeScript. The product is not a diagnosis tool, not a checkup sales page, and not a medical recommendation engine.

## Commands

- `npm install` installs project dependencies.
- `npm run dev` starts the local Vite server on `127.0.0.1`.
- `npm run build` runs TypeScript and production build verification.
- `npm test -- --run` runs the full Vitest suite once.
- `npm test -- --run src/__tests__/content.test.ts` checks the health content and image assets.
- `npm run assets:fallback` regenerates deterministic local WebP cartoon fallback images in `src/assets/generated`.

## Architecture

- `src/App.tsx` composes the page shell, hero, atlas sections, and footer.
- `src/components/layout` contains header, sticky section navigation, and footer.
- `src/components/atlas` contains reusable atlas cards, image panels, grade advice, and details blocks.
- `src/components/motion/Reveal.tsx` contains lightweight reveal behavior with reduced-motion handling.
- `src/hooks/useScrollSpy.ts` owns active section detection for the mobile navigation.
- `src/data/bodyParts.ts` is the source of truth for all 13 health topics.
- `src/data/sections.ts` defines the four page groups.
- `src/data/imagePrompts.ts` stores stable GPT-Image-2 prompts and expected asset file names.
- `src/assets/generated` contains local raster image files referenced by the atlas.

## Product Rules

- Keep the experience 移动端优先. Desktop should enhance the reading layout, not replace the mobile flow.
- Do not rebuild the old SVG body hotspot interaction as the core UX.
- Prefer image-first cards, short copy, and clear section colors.
- Keep all long health copy in `src/data/bodyParts.ts`; components should not hard-code health content.
- Every body part should include daily observation, when to seek professional evaluation, and what not to do blindly.
- Do not use copy that implies diagnosis, certainty, cure, prescription, or a must-do checkup.
- Always show that the page provides educational health information only.

## Image Workflow

- GPT-Image-2 prompts live in `src/data/imagePrompts.ts`.
- Final assets should keep the same file names as the prompt entries.
- Put project-bound images in `src/assets/generated`.
- If generated assets are unavailable, run `npm run assets:fallback` to create deterministic WebP raster fallback images.
- Avoid embedded text inside generated images. Overlay labels with HTML when needed.
- Avoid scary, bloody, photorealistic disease imagery.

## Verification

Before handing off changes, run:

```bash
npm test -- --run
npm run build
```

For frontend changes, also inspect the page at mobile widths around 390px and desktop width around 1280px.

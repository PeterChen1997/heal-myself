# 全身健康关注地图

移动端优先的卡通科普健康图鉴。页面用图像、颜色分区和短文案解释常规体检之外容易被忽略的身体关注点。

本页面提供健康科普信息，不构成医疗诊断、治疗建议或检查处方。

## Tech Stack

- Vite + React + TypeScript
- Vitest + Testing Library
- Framer Motion for lightweight reveal behavior
- Local TypeScript content data
- Local raster assets in `src/assets/generated`

## Local Development

```bash
npm install
npm run dev
```

Open the printed `127.0.0.1` URL.

## Verification

```bash
npm test -- --run
npm run build
```

## Deployment

The public Fly.io deployment is available at:

```text
https://heal-myself.fly.dev/
```

Deploy to Fly.io with:

```bash
flyctl deploy --remote-only
```

The Docker image builds the Vite app with root-relative assets for Fly.io. The GitHub Pages deployment still uses the default `/heal-myself/` base path.

## Scripts

- `npm run dev` starts the local Vite dev server.
- `npm run build` runs TypeScript and creates a production bundle.
- `npm test -- --run` runs the complete test suite once.
- `npm run assets:fallback` regenerates deterministic WebP fallback images.

## Architecture

```text
src/
  App.tsx
  components/
    atlas/
    layout/
    motion/
  data/
    bodyParts.ts
    imagePrompts.ts
    sections.ts
  assets/
    generated/
  hooks/
  styles/
```

`src/data/bodyParts.ts` owns the 13 health topics. Components render from data and should not hard-code long health content.

## Content Model

The atlas is grouped into four sections:

- 头面部：眼睛、口腔、鼻腔、头皮
- 颈肩躯干：颈椎、甲状腺、胃肠、脊柱
- 运动系统：膝盖、足弓
- 系统关注：睡眠、过敏、营养

Each topic includes:

- what the user should understand
- daily observation
- when to seek professional evaluation
- what not to do blindly
- departments to consult
- one or two local image assets

## Image Workflow

Stable GPT-Image-2 prompts live in `src/data/imagePrompts.ts`. Final generated files should keep the same names and be placed in `src/assets/generated`.

When GPT-Image-2 assets are unavailable, run:

```bash
npm run assets:fallback
```

This creates deterministic local WebP fallback images so the page remains fully visual.

## Product Boundaries

- Pure frontend display page.
- No login, backend, CMS, questionnaire, saved checklist, or medical data storage.
- No SVG body hotspot as the core interaction.
- No copy that implies diagnosis, certainty, cure, prescription, or mandatory testing.

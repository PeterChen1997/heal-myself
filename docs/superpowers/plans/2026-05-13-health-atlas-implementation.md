# Health Atlas Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing static landing page into a mobile-first React health atlas with cartoon science visuals, static content data, scroll navigation, synced agent docs, and a fresh README.

**Architecture:** Replace the current hand-authored HTML/CSS/JS page with a Vite + React + TypeScript single-page app. Keep all health content and image prompts in `src/data`, render grouped atlas sections from data, and use lightweight CSS/Framer Motion-style reveal behavior without making SVG body hotspots the core interaction.

**Tech Stack:** Vite, React, TypeScript, Vitest, Testing Library, Tailwind CSS, local static assets, generated/cartoon fallback illustrations.

---

## File Map

- Create `package.json`: scripts and dependencies for Vite, tests, lint-free type checking, and preview.
- Create `index.html`: Vite HTML entry.
- Create `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`: TypeScript and Vite configuration.
- Create `src/main.tsx`, `src/App.tsx`: React app entry and page composition.
- Create `src/styles/globals.css`: design tokens, mobile-first layout, cards, nav, responsive desktop enhancement, reduced-motion behavior.
- Create `src/data/sections.ts`: the four atlas section definitions.
- Create `src/data/bodyParts.ts`: all 13 health topics and their copy.
- Create `src/data/imagePrompts.ts`: stable GPT-Image-2 prompt list for every visual asset.
- Create `src/components/layout/Header.tsx`, `SectionNav.tsx`, `Footer.tsx`: page chrome and scroll navigation.
- Create `src/components/atlas/AtlasSection.tsx`, `BodyPartCard.tsx`, `GradeAdvice.tsx`, `PartImage.tsx`, `ExpandableDetails.tsx`: atlas rendering components.
- Create `src/components/motion/Reveal.tsx`: viewport reveal wrapper.
- Create `src/hooks/useScrollSpy.ts`: active section detection.
- Create `src/assets/generated/*.webp`: project visual assets. Use generated raster assets when available and deterministic cartoon fallback assets while generation is incomplete.
- Create `src/__tests__/content.test.ts`: validates the 13-part content model, section coverage, and image mapping.
- Create `src/__tests__/app.test.tsx`: verifies major page affordances render.
- Create `AGENTS.md` and `CLAUDE.md`: synchronized project instructions for coding agents.
- Rewrite `README.md`: final project overview, scripts, architecture, and asset workflow.
- Delete `script.js` and `styles.css`: remove obsolete non-React implementation after the app is migrated.

## Task 1: Create The React Project Skeleton

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/globals.css`

- [ ] **Step 1: Write a failing app smoke test**

Create `src/__tests__/app.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders the health atlas hero and section navigation', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: '全身健康关注地图' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: '健康图鉴分区' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '头面部' })).toHaveAttribute('href', '#head-face')
    expect(screen.getByRole('link', { name: '颈肩躯干' })).toHaveAttribute('href', '#neck-torso')
    expect(screen.getByRole('link', { name: '运动系统' })).toHaveAttribute('href', '#movement')
    expect(screen.getByRole('link', { name: '系统关注' })).toHaveAttribute('href', '#system')
  })
})
```

- [ ] **Step 2: Run the test and verify it fails because dependencies/app are missing**

Run:

```bash
npm test -- --run src/__tests__/app.test.tsx
```

Expected: command fails before running because `package.json` and dependencies do not exist.

- [ ] **Step 3: Add Vite, React, TypeScript and test configuration**

Create `package.json`:

```json
{
  "name": "heal-myself",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "tsc -b && vite build",
    "preview": "vite preview --host 127.0.0.1",
    "test": "vitest",
    "test:run": "vitest run"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "vite": "^7.0.0",
    "typescript": "^5.8.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^12.0.0",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "vitest": "^3.0.0",
    "jsdom": "^25.0.0"
  }
}
```

Create `index.html`, TypeScript configs, Vite config, and minimal `src/main.tsx` / `src/App.tsx` rendering the hero and nav labels from the test.

- [ ] **Step 4: Install dependencies and run the smoke test**

Run:

```bash
npm install
npm test -- --run src/__tests__/app.test.tsx
```

Expected: test passes.

- [ ] **Step 5: Commit skeleton**

Run:

```bash
git add package.json package-lock.json index.html tsconfig.json tsconfig.node.json vite.config.ts src
git commit -m "feat: initialize React health atlas app"
```

## Task 2: Add Static Health Content And Content Tests

**Files:**
- Create: `src/data/sections.ts`
- Create: `src/data/bodyParts.ts`
- Create: `src/data/imagePrompts.ts`
- Create: `src/__tests__/content.test.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write failing content model tests**

Create `src/__tests__/content.test.ts`:

```ts
import { bodyParts } from '../data/bodyParts'
import { imagePrompts } from '../data/imagePrompts'
import { sections } from '../data/sections'

describe('health atlas content', () => {
  it('covers the approved 13 body parts across 4 sections', () => {
    expect(sections).toHaveLength(4)
    expect(bodyParts).toHaveLength(13)
    expect(new Set(bodyParts.map((part) => part.id)).size).toBe(13)
    expect(bodyParts.map((part) => part.name)).toEqual([
      '眼睛',
      '口腔',
      '鼻腔',
      '头皮',
      '颈椎',
      '甲状腺',
      '胃肠',
      '脊柱',
      '膝盖',
      '足弓',
      '睡眠',
      '过敏',
      '营养'
    ])
  })

  it('keeps featured parts image-rich and compact parts lightweight', () => {
    const featured = bodyParts.filter((part) => part.priority === 'featured')
    const compact = bodyParts.filter((part) => part.priority === 'compact')

    expect(featured.map((part) => part.id)).toEqual([
      'eyes',
      'oral',
      'neck',
      'gut',
      'knee',
      'feet',
      'sleep'
    ])
    expect(compact).toHaveLength(6)
    featured.forEach((part) => {
      expect(part.images.principle).toBeTruthy()
      expect(part.images.lifestyle).toBeTruthy()
    })
  })

  it('has prompts for every referenced image asset', () => {
    const referenced = bodyParts.flatMap((part) =>
      [part.images.principle, part.images.lifestyle].filter(Boolean)
    )

    expect(imagePrompts.map((prompt) => prompt.fileName)).toEqual(
      expect.arrayContaining(['hero-health-map.webp', ...referenced])
    )
  })
})
```

- [ ] **Step 2: Run content tests and verify they fail because data files are missing**

Run:

```bash
npm test -- --run src/__tests__/content.test.ts
```

Expected: FAIL with module resolution errors for missing `src/data/*` files.

- [ ] **Step 3: Implement `sections.ts`, `bodyParts.ts`, and `imagePrompts.ts`**

Create strongly typed data files matching the spec. Use concise, medically bounded copy and the exact 13 body part order from the test.

- [ ] **Step 4: Run content tests**

Run:

```bash
npm test -- --run src/__tests__/content.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit content**

Run:

```bash
git add src/data src/__tests__/content.test.ts
git commit -m "feat: add health atlas content model"
```

## Task 3: Build The Mobile-First Atlas UI

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/SectionNav.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/atlas/AtlasSection.tsx`
- Create: `src/components/atlas/BodyPartCard.tsx`
- Create: `src/components/atlas/GradeAdvice.tsx`
- Create: `src/components/atlas/PartImage.tsx`
- Create: `src/components/atlas/ExpandableDetails.tsx`
- Create: `src/components/motion/Reveal.tsx`
- Create: `src/hooks/useScrollSpy.ts`
- Modify: `src/App.tsx`
- Modify: `src/styles/globals.css`
- Modify: `src/__tests__/app.test.tsx`

- [ ] **Step 1: Extend the app test for atlas rendering**

Update `src/__tests__/app.test.tsx` to assert the hero, four sections, disclaimer, and at least one advice block render.

- [ ] **Step 2: Run the app test and verify it fails because atlas components are missing**

Run:

```bash
npm test -- --run src/__tests__/app.test.tsx
```

Expected: FAIL because the richer UI has not been implemented.

- [ ] **Step 3: Implement layout and atlas components**

Implement components that render from `sections` and `bodyParts`. Use semantic headings, accessible nav links, image alt text, three-color advice cards, and expandable details. Use CSS classes from `globals.css`.

- [ ] **Step 4: Implement mobile-first styling and reduced-motion behavior**

Add global CSS tokens, responsive section layouts, sticky mobile nav, desktop sticky side rail, card reveal styles, and `@media (prefers-reduced-motion: reduce)`.

- [ ] **Step 5: Run app tests**

Run:

```bash
npm test -- --run src/__tests__/app.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit UI**

Run:

```bash
git add src
git commit -m "feat: build mobile-first health atlas UI"
```

## Task 4: Add Cartoon Visual Assets

**Files:**
- Create: `src/assets/generated/*.webp`
- Modify: `src/components/atlas/PartImage.tsx`
- Modify: `src/data/imagePrompts.ts`

- [ ] **Step 1: Add a test that image files exist for every prompt**

Extend `src/__tests__/content.test.ts` to use Node filesystem APIs and assert every `imagePrompts.fileName` exists under `src/assets/generated`.

- [ ] **Step 2: Run the content test and verify it fails because image files are missing**

Run:

```bash
npm test -- --run src/__tests__/content.test.ts
```

Expected: FAIL listing missing image files.

- [ ] **Step 3: Generate or create raster cartoon science assets**

Use GPT-Image-2 assets where practical. If a batch cannot be generated in time, create deterministic raster fallback assets with the same file names and keep the final prompts in `src/data/imagePrompts.ts` so the assets can be regenerated without code changes.

- [ ] **Step 4: Run content tests**

Run:

```bash
npm test -- --run src/__tests__/content.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit assets**

Run:

```bash
git add src/assets/generated src/data/imagePrompts.ts src/__tests__/content.test.ts
git commit -m "feat: add cartoon health atlas visuals"
```

## Task 5: Sync Agent Docs And Final README

**Files:**
- Create: `AGENTS.md`
- Create: `CLAUDE.md`
- Rewrite: `README.md`
- Delete: `script.js`
- Delete: `styles.css`

- [ ] **Step 1: Write a documentation consistency test**

Create `src/__tests__/docs.test.ts` that reads `AGENTS.md`, `CLAUDE.md`, and `README.md` and checks for the project commands and architecture markers.

- [ ] **Step 2: Run docs test and verify it fails because docs are stale or missing**

Run:

```bash
npm test -- --run src/__tests__/docs.test.ts
```

Expected: FAIL because `AGENTS.md` and `CLAUDE.md` do not exist and README is still the old static-server version.

- [ ] **Step 3: Create synced `AGENTS.md` and `CLAUDE.md`**

Both files must include identical project-specific commands, architecture notes, content rules, image asset workflow, and medical copy boundaries. `CLAUDE.md` can add a one-line note that it mirrors `AGENTS.md`.

- [ ] **Step 4: Rewrite `README.md`**

Write the final README with product positioning, local commands, architecture, content model, asset generation workflow, and deployment notes.

- [ ] **Step 5: Remove obsolete static assets**

Delete `script.js` and `styles.css`. Keep `index.html` as the Vite entry.

- [ ] **Step 6: Run docs test**

Run:

```bash
npm test -- --run src/__tests__/docs.test.ts
```

Expected: PASS.

- [ ] **Step 7: Commit docs**

Run:

```bash
git add AGENTS.md CLAUDE.md README.md src/__tests__/docs.test.ts script.js styles.css
git commit -m "docs: add agent guidance and README"
```

## Task 6: Final Verification

**Files:**
- Modify only if verification finds issues.

- [ ] **Step 1: Run all tests**

Run:

```bash
npm test -- --run
```

Expected: all tests pass.

- [ ] **Step 2: Build production bundle**

Run:

```bash
npm run build
```

Expected: TypeScript and Vite build pass.

- [ ] **Step 3: Launch preview for visual QA**

Run:

```bash
npm run dev -- --port 5173
```

Expected: dev server starts at `http://127.0.0.1:5173/`.

- [ ] **Step 4: Check mobile and desktop manually**

Open the dev URL and inspect:

- 390px mobile viewport has no horizontal overflow.
- Sticky navigation highlights section context.
- Cards are readable with image-first layout.
- Desktop layout uses enhanced width without feeling stretched.

- [ ] **Step 5: Commit verification fixes if needed**

Run only if files changed:

```bash
git add src AGENTS.md CLAUDE.md README.md package.json package-lock.json index.html tsconfig.json tsconfig.node.json vite.config.ts docs/superpowers/plans/2026-05-13-health-atlas-implementation.md
git commit -m "fix: polish health atlas verification issues"
```

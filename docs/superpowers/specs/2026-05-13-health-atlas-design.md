# 健康小人全身扫描前端重构设计

日期：2026-05-13  
状态：已确认设计方向，待实现计划  
范围：前端纯展示知识分享页，不包含后端、登录、CMS、问卷或数据保存

## 1. 背景与目标

当前产品文档将「健康小人全身扫描」定义为一个面向 C 端的健康科普工具：帮助用户理解常规体检之外容易被忽略的身体关注点，同时明确不构成医疗诊断、治疗建议或检查处方。

本轮重构目标不是继续强化手写 SVG 小人交互，而是将页面重构为一个移动端优先的卡通科普滚动图鉴页。页面应当更现代、更简洁、更适合阅读和分享，通过 GPT-Image-2 生成统一风格的科普图片，让用户主要通过图片理解健康知识，文字负责解释边界和行动建议。

核心目标：

- 移动端优先，320px 起可舒适阅读。
- 纯前端静态展示，可部署为静态站点。
- 用文字分区、颜色分区和滚动切换替代 SVG 热区小人。
- 使用卡通科普风图片承载主要信息。
- 保留医疗科普边界，不制造诊断感或体检销售感。

## 2. 范围

本轮包含：

- 前端工程重构为 Vite + React + TypeScript。
- 移动端优先的信息架构和组件体系。
- 13 个健康关注部位的静态图鉴展示。
- GPT-Image-2 图片资产清单与 prompt 策略。
- 滚动分区导航、卡片进入动效、三色建议展示。
- 静态数据模型，便于后续替换为 CMS 或 API。

本轮不包含：

- 后端 API。
- 登录、用户档案、收藏或清单保存。
- 问卷与个性化推荐。
- CMS 管理后台。
- 手写 SVG 小人热区作为核心交互。
- 复杂 3D、重型滚动叙事或医疗器械式扫描效果。

## 3. 产品体验

最终页面是一套可滚动阅读的身体健康图鉴，而不是一个点击小人的工具。

移动端结构：

```text
┌────────────────────┐
│ Sticky 顶部导航     │
│ 头面  颈躯  运动  系统 │
└────────────────────┘
          ↓
┌────────────────────┐
│ Hero               │
│ 卡通科普主图         │
│ 全身健康关注地图      │
│ [开始阅读]           │
└────────────────────┘
          ↓
┌────────────────────┐
│ 头面部              │
│ 眼睛 / 口腔 / 鼻腔 / 头皮 │
└────────────────────┘
          ↓
┌────────────────────┐
│ 颈肩躯干            │
│ 颈椎 / 甲状腺 / 胃肠 / 脊柱 │
└────────────────────┘
          ↓
┌────────────────────┐
│ 运动系统            │
│ 膝盖 / 足弓          │
└────────────────────┘
          ↓
┌────────────────────┐
│ 系统关注            │
│ 睡眠 / 过敏 / 营养   │
└────────────────────┘
```

桌面端作为增强布局：

```text
┌───────────────┬────────────────────────┐
│ Sticky 目录    │ 图文图鉴流              │
│ 头面部         │ 大图 + 科普卡 + 三色建议 │
│ 颈肩躯干       │                        │
│ 运动系统       │                        │
│ 系统关注       │                        │
└───────────────┴────────────────────────┘
```

## 4. 内容结构

页面按照身体区域分为 4 组：

- 头面部：眼睛、口腔、鼻腔、头皮。
- 颈肩躯干：颈椎、甲状腺、胃肠、脊柱。
- 运动系统：膝盖、足弓。
- 系统关注：睡眠、过敏、营养。

单个部位模块结构：

```text
┌────────────────────┐
│ [卡通科普图]         │
│                    │
│ 眼睛                │
│ 视力正常不等于眼睛舒服 │
│                    │
│ 🟢 日常怎么看        │
│ 🟡 什么情况就诊      │
│ 🔴 不建议盲做什么    │
└────────────────────┘
```

每个部位保留三层文字：

- 这是什么问题：一句话说明用户为什么应该关注。
- 日常怎么看：绿色，强调观察、自我管理和生活习惯。
- 什么情况去看医生：黄色，强调症状、风险因素和专业就诊。
- 不建议盲做什么：红色，强调过度检查边界。

文字风格应克制、清楚、非营销化。避免使用「诊断」「确诊」「治愈」「处方」「必须检查」等容易越界的表达。

## 5. 图片策略

图片统一为卡通科普风：

- 可爱但不幼稚。
- 像健康科普绘本与信息图的结合。
- 不使用真实病变照片。
- 不出现血腥、恐怖、强焦虑画面。
- 不在图片里放复杂文字，文字标签由前端 HTML 叠加。
- 尽量使用场景、箭头、局部放大和简单结构关系讲清楚问题。

重点部位使用双图：

- 眼睛：原理图 + 生活观察图。
- 口腔：原理图 + 生活观察图。
- 颈椎：原理图 + 生活观察图。
- 胃肠：原理图 + 生活观察图。
- 膝盖：原理图 + 生活观察图。
- 足弓：原理图 + 生活观察图。
- 睡眠：原理图 + 生活观察图。

其他部位使用单图：

- 头皮。
- 鼻腔。
- 甲状腺。
- 脊柱。
- 过敏。
- 营养。

资产清单：

```text
hero-health-map.webp
eyes-principle.webp
eyes-lifestyle.webp
oral-principle.webp
oral-lifestyle.webp
neck-principle.webp
neck-lifestyle.webp
gut-principle.webp
gut-lifestyle.webp
knee-principle.webp
knee-lifestyle.webp
feet-principle.webp
feet-lifestyle.webp
sleep-principle.webp
sleep-lifestyle.webp
scalp-overview.webp
nose-overview.webp
thyroid-overview.webp
spine-overview.webp
allergy-overview.webp
nutrition-overview.webp
```

统一 prompt 基础模板：

```text
A clean modern cartoon health education illustration, warm off-white background,
friendly but credible, soft rounded shapes, simple infographic composition,
gentle green, blue and yellow accents, no scary medical imagery,
no photorealistic disease, no embedded text labels, no watermark,
enough empty space for web UI overlay.
```

每张图片的具体 prompt 应保存在 `src/data/imagePrompts.ts`，便于复用和重生成。

## 6. 视觉系统

整体感觉：

- 温和。
- 可信。
- 轻松。
- 好读。
- 适合手机上连续阅读。

避免：

- 医院蓝白冷感。
- 电商卖检查感。
- 儿童游戏感。
- AI 海报式花哨感。
- 大面积红色警告感。

建议色彩：

```text
背景：#F7F8F5
主文字：#1F2420
辅助文字：#68706A
健康绿：#3E8F73
信息蓝：#4E8FD8
提示黄：#F2B84B
克制红：#D95C4A
```

分区颜色应低饱和、浅底色，不要让页面变成一套单色主题：

- 头面部：浅绿 / 浅蓝。
- 颈肩躯干：浅青 / 浅灰蓝。
- 运动系统：浅黄 / 浅橙。
- 系统关注：浅紫灰 / 浅灰绿。

## 7. 交互与动效

保留轻量动效：

- 首屏主图轻微浮动。
- Sticky 分区导航根据滚动位置高亮。
- 点击分区导航平滑滚动。
- 图鉴卡片进入视口时淡入上移。
- 三色建议可轻量展开或折叠。

动效原则：

- 优先使用 `transform` 和 `opacity`。
- 遵守 `prefers-reduced-motion`，系统减弱动效时关闭大部分动画。
- 不使用大面积旋转、强弹跳、复杂 3D 或持续闪烁。
- 红色只用于边界提醒，不做强刺激动效。

## 8. 前端技术架构

建议技术栈：

```text
Vite + React + TypeScript
Framer Motion
Tailwind CSS
本地 TypeScript 数据
静态图片资产
纯前端部署
```

选择 Vite 而不是 Next.js 的原因：

- 当前需求是纯展示页，不需要 SSR、后端路由或服务端数据获取。
- Vite 工程轻、启动快、构建快，适合从当前轻量仓库平滑重构。
- 静态部署简单，可直接部署到 Vercel、Netlify、GitHub Pages 或任意 CDN。

建议目录：

```text
src/
  App.tsx
  main.tsx

  components/
    layout/
      Header.tsx
      SectionNav.tsx
      Footer.tsx

    atlas/
      AtlasSection.tsx
      BodyPartCard.tsx
      PartImage.tsx
      GradeAdvice.tsx
      ExpandableDetails.tsx

    motion/
      Reveal.tsx
      ScrollSpy.tsx

  data/
    bodyParts.ts
    sections.ts
    imagePrompts.ts

  assets/
    generated/
      hero-health-map.webp
      eyes-principle.webp
      ...

  styles/
    globals.css
```

数据对象：

```ts
type BodyPart = {
  id: string
  name: string
  sectionId: 'head-face' | 'neck-torso' | 'movement' | 'system'
  priority: 'featured' | 'compact'
  grade: 'green' | 'yellow' | 'red'
  tagline: string
  summary: string
  dailyObservation: string
  whenToCheck: string
  dontDoBlindly?: string
  departments: string[]
  images: {
    principle: string
    lifestyle?: string
  }
}
```

## 9. 性能与可访问性

移动端性能：

- 首屏只加载 hero 图片与必要 CSS/JS。
- 图鉴图片使用 `loading="lazy"`。
- 图片输出为 WebP，必要时补充 AVIF。
- 控制首屏 JS 体积，不引入重型可视化库。
- 所有动画只影响合成层属性。

可访问性：

- 所有图片提供准确 `alt` 文本。
- 三色分级不只依赖颜色，同时显示文字标签。
- Sticky 导航可键盘访问。
- 卡片展开按钮有明确 aria 属性。
- 对比度满足 WCAG 2.1 AA。
- 减弱动效时页面仍完整可读。

## 10. 验收标准

体验验收：

- 手机端打开后，首屏清楚表达「全身健康关注地图」。
- 用户不用点击小人，也能通过滚动理解所有重点部位。
- 顶部分区导航能清楚提示当前位置。
- 每张卡片在 10 秒内能读懂核心意思。
- 页面没有医疗恐吓感，也没有卖检查项目的感觉。

技术验收：

- 项目可通过 `npm run build` 构建。
- 移动端 375px、390px、430px 下无文字溢出。
- 桌面端 1280px 下布局不空、不散、不像移动页硬拉宽。
- `prefers-reduced-motion` 下动效可降级。
- 图片懒加载生效。
- 数据内容集中在 `src/data`，组件不硬编码长文案。

内容验收：

- 覆盖 13 个部位。
- 重点 7 个部位有双图位。
- 其他 6 个部位有单图位。
- 每个部位包含日常观察、就诊触发、不建议盲做三类信息。
- 全站保留医疗免责声明。

## 11. 后续实现顺序

建议实施顺序：

1. 初始化 Vite + React + TypeScript 工程。
2. 建立设计 tokens、全局样式和移动端布局框架。
3. 整理 `bodyParts.ts` 与 `sections.ts`。
4. 搭建 Hero、分区导航、图鉴分区、部位卡片。
5. 接入临时图片素材（可先使用统一风格草图）。
6. 生成并替换 GPT-Image-2 卡通科普图。
7. 加入滚动高亮、Reveal 动效、减弱动效适配。
8. 做移动端和桌面端视觉 QA。
9. 补充最终免责声明、alt 文本与构建验证。

export type ImagePrompt = {
  fileName: string
  title: string
  prompt: string
}

const baseStyle =
  'Premium Apple-style scientific health education raster illustration, warm off-white background, friendly but credible, soft 3D editorial infographic composition, refined anatomy-inspired details, gentle green, blue and muted yellow accents, no scary medical imagery, no photorealistic disease, no embedded text labels, no watermark, generous safe margins for mobile web UI.'

export const imagePrompts: ImagePrompt[] = [
  {
    fileName: 'hero-health-map.webp',
    title: 'Hero 全身健康图鉴',
    prompt: `${baseStyle} A cheerful health atlas cover image with a friendly abstract person surrounded by small body-system cards, scroll-map feeling, mobile website hero composition.`
  },
  {
    fileName: 'eyes-principle.webp',
    title: '眼睛原理图',
    prompt: `${baseStyle} Explain dry eye with a clean eye cross-section, tear film layers, meibomian gland dots, simple arrows, no text.`
  },
  {
    fileName: 'eyes-lifestyle.webp',
    title: '眼睛生活观察图',
    prompt: `${baseStyle} Office worker using a laptop with gentle eye dryness cues, a small reminder to look far away, cozy desk scene, no text.`
  },
  {
    fileName: 'oral-principle.webp',
    title: '口腔原理图',
    prompt: `${baseStyle} Clean tooth and gum cutaway showing gum pocket, floss path, and wisdom tooth area with simple arrows, no text.`
  },
  {
    fileName: 'oral-lifestyle.webp',
    title: '口腔生活观察图',
    prompt: `${baseStyle} Friendly bathroom scene with toothbrush, floss, mirror, and a tiny gum check moment, no blood, no text.`
  },
  {
    fileName: 'neck-principle.webp',
    title: '颈椎原理图',
    prompt: `${baseStyle} Side-view scientific neck and head posture diagram showing screen height and neck load with soft arrows, no text.`
  },
  {
    fileName: 'neck-lifestyle.webp',
    title: '颈椎生活观察图',
    prompt: `${baseStyle} Warm office desk scene showing ergonomic monitor height, relaxed shoulders, and simple neck stretch cue, no text.`
  },
  {
    fileName: 'gut-principle.webp',
    title: '胃肠原理图',
    prompt: `${baseStyle} Friendly stomach and intestine diagram showing reflux path, gut rhythm, and a tiny bacteria icon, no text.`
  },
  {
    fileName: 'gut-lifestyle.webp',
    title: '胃肠生活观察图',
    prompt: `${baseStyle} Cozy meal and journal scene for tracking reflux, bloating, and food triggers using simple icons, no text.`
  },
  {
    fileName: 'knee-principle.webp',
    title: '膝盖原理图',
    prompt: `${baseStyle} Scientific knee joint diagram with patella, meniscus cushion, running impact arrow, no injury gore, no text.`
  },
  {
    fileName: 'knee-lifestyle.webp',
    title: '膝盖生活观察图',
    prompt: `${baseStyle} Runner pausing after a jog, gently checking knee comfort, with shoes and trail elements, no text.`
  },
  {
    fileName: 'feet-principle.webp',
    title: '足弓原理图',
    prompt: `${baseStyle} Clean foot arch and footprint pressure map illustration with simple colored pressure zones, no text.`
  },
  {
    fileName: 'feet-lifestyle.webp',
    title: '足弓生活观察图',
    prompt: `${baseStyle} Shoes, footprints, and a person standing comfortably, showing shoe-wear observation and foot arch awareness, no text.`
  },
  {
    fileName: 'sleep-principle.webp',
    title: '睡眠原理图',
    prompt: `${baseStyle} Scientific sleep rhythm diagram with moon, sun, gentle wave phases, recovery heart icon, no text.`
  },
  {
    fileName: 'sleep-lifestyle.webp',
    title: '睡眠生活观察图',
    prompt: `${baseStyle} Calm bedtime scene with phone away, warm lamp, relaxed breathing, and sleep routine cues, no text.`
  },
  {
    fileName: 'scalp-overview.webp',
    title: '头皮概览图',
    prompt: `${baseStyle} Friendly scalp and hair follicle illustration showing hair density trend, gentle scalp care, no text.`
  },
  {
    fileName: 'scalp-lifestyle.webp',
    title: '头皮生活观察图',
    prompt: `${baseStyle} Morning mirror and hairbrush scene showing gentle hair shedding observation and scalp care routine, no text.`
  },
  {
    fileName: 'nose-overview.webp',
    title: '鼻腔概览图',
    prompt: `${baseStyle} Clean nose and sinus airflow illustration with pollen dots and sleep connection cue, no text.`
  },
  {
    fileName: 'nose-lifestyle.webp',
    title: '鼻腔生活观察图',
    prompt: `${baseStyle} Bedside and window scene showing morning sneezing, pollen, tissue, and sleep comfort cues, no text.`
  },
  {
    fileName: 'thyroid-overview.webp',
    title: '甲状腺概览图',
    prompt: `${baseStyle} Simple neck illustration highlighting butterfly-shaped thyroid area, checkup card, calm non-scary tone, no text.`
  },
  {
    fileName: 'thyroid-lifestyle.webp',
    title: '甲状腺生活观察图',
    prompt: `${baseStyle} Calm self-observation scene with neck mirror check, heartbeat and energy cues, friendly non-diagnostic tone, no text.`
  },
  {
    fileName: 'spine-overview.webp',
    title: '脊柱概览图',
    prompt: `${baseStyle} Friendly posture diagram showing shoulders, spine alignment, pelvis tilt, and mirror observation, no text.`
  },
  {
    fileName: 'spine-lifestyle.webp',
    title: '脊柱生活观察图',
    prompt: `${baseStyle} Mirror posture check scene with shoulders and pelvis alignment, cozy home setting, no text.`
  },
  {
    fileName: 'allergy-overview.webp',
    title: '过敏概览图',
    prompt: `${baseStyle} Scientific allergy map with pollen, pet dander, food plate, and IgE-style shield metaphor, no text.`
  },
  {
    fileName: 'allergy-lifestyle.webp',
    title: '过敏生活观察图',
    prompt: `${baseStyle} Everyday trigger diary scene with window pollen, pet dander, meal plate, and gentle symptom tracking icons, no text.`
  },
  {
    fileName: 'nutrition-overview.webp',
    title: '营养概览图',
    prompt: `${baseStyle} Friendly nutrition plate with vitamin D sun, iron, B12, and balanced food icons, no pills overload, no text.`
  },
  {
    fileName: 'nutrition-lifestyle.webp',
    title: '营养生活观察图',
    prompt: `${baseStyle} Daily food journal scene with sunlight, balanced plate, fatigue and dietary pattern cues, no text.`
  }
]

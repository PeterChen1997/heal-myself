export type SectionId = 'head-face' | 'neck-torso' | 'movement' | 'system'

export type AtlasSection = {
  id: SectionId
  title: string
  summary: string
  tone: 'mint' | 'blue' | 'amber' | 'violet'
}

export const sections: AtlasSection[] = [
  {
    id: 'head-face',
    title: '头面部',
    summary: '从眼睛、口腔到鼻腔和头皮，关注那些常规体检容易漏掉、却很影响生活质量的小信号。',
    tone: 'mint'
  },
  {
    id: 'neck-torso',
    title: '颈肩躯干',
    summary: '久坐、反酸、甲状腺和体态问题常常慢慢积累，先学会观察，再判断是否需要专业评估。',
    tone: 'blue'
  },
  {
    id: 'movement',
    title: '运动系统',
    summary: '膝盖、足弓和步态决定了很多运动体验，重点是看懂疼痛和磨损背后的身体线索。',
    tone: 'amber'
  },
  {
    id: 'system',
    title: '系统关注',
    summary: '睡眠、过敏和营养不是单个器官的问题，更适合用长期观察和克制检查来管理。',
    tone: 'violet'
  }
]

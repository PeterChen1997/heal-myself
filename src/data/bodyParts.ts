import type { SectionId } from './sections'

export type Grade = 'green' | 'yellow' | 'red'
export type Priority = 'featured' | 'compact'

export type BodyPart = {
  id: string
  name: string
  sectionId: SectionId
  priority: Priority
  grade: Grade
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

export const bodyParts: BodyPart[] = [
  {
    id: 'eyes',
    name: '眼睛',
    sectionId: 'head-face',
    priority: 'featured',
    grade: 'green',
    tagline: '视力正常，不等于眼睛舒服。',
    summary: '屏幕时间长的人更容易忽略干眼、睑板腺和眼疲劳，常规体检的视力表通常看不出这些问题。',
    dailyObservation: '观察用眼后是否干涩、酸胀、畏光或眨眼变多；每 20 分钟看远处 20 秒，主动眨眼。',
    whenToCheck: '干涩异物感持续超过 2 周、短期飞蚊明显增多、视力突然变化或眼睛反复充血时，建议看眼科。',
    dontDoBlindly: '无症状时不需要把 OCT、角膜地形图等高价检查当作常规筛查。',
    departments: ['眼科', '干眼门诊'],
    images: {
      principle: 'eyes-principle.webp',
      lifestyle: 'eyes-lifestyle.webp'
    }
  },
  {
    id: 'oral',
    name: '口腔',
    sectionId: 'head-face',
    priority: 'featured',
    grade: 'yellow',
    tagline: '不疼，不代表牙周没问题。',
    summary: '牙周、龋齿和智齿问题可以安静发展很久，普通体检通常不会系统检查口腔。',
    dailyObservation: '刷牙时看牙龈是否出血，闻口气是否异常，注意牙缝是否越来越大；每天使用牙线或冲牙器。',
    whenToCheck: '刷牙出血超过 2 周、牙龈反复肿痛、智齿反复发炎或冷热刺激痛明显时，建议看口腔科。',
    dontDoBlindly: '无明确指征时不建议频繁做 CBCT；洁牙通常按 6-12 个月节奏即可。',
    departments: ['口腔科', '牙周科'],
    images: {
      principle: 'oral-principle.webp',
      lifestyle: 'oral-lifestyle.webp'
    }
  },
  {
    id: 'nose',
    name: '鼻腔',
    sectionId: 'head-face',
    priority: 'compact',
    grade: 'yellow',
    tagline: '长期鼻塞会悄悄影响睡眠。',
    summary: '鼻炎、过敏和鼻中隔问题常被当作小毛病，但它们会影响睡眠质量、注意力和日常舒适度。',
    dailyObservation: '记录鼻塞是否季节性发作、是否单侧更明显，晨起喷嚏和清水鼻涕是否频繁。',
    whenToCheck: '单侧鼻塞超过 4 周、反复鼻出血、嗅觉明显下降或黄绿色鼻涕伴头痛时，建议看耳鼻喉科。',
    dontDoBlindly: '无症状时不建议常规做鼻窦 CT，是否需要影像检查应由医生判断。',
    departments: ['耳鼻喉科', '变态反应科'],
    images: {
      principle: 'nose-overview.webp'
    }
  },
  {
    id: 'scalp',
    name: '头皮',
    sectionId: 'head-face',
    priority: 'compact',
    grade: 'yellow',
    tagline: '脱发常常先是趋势问题。',
    summary: '头皮油腻、瘙痒、脱屑和发量变化，可能和头皮环境、压力、营养或内分泌有关。',
    dailyObservation: '留意枕头、浴缸和梳子上的脱发量，观察发际线、头皮屑和瘙痒是否持续变化。',
    whenToCheck: '脱发明显持续 3 个月以上、出现圆形斑秃、头皮反复红斑脓疱或剧烈瘙痒时，建议看皮肤科。',
    dontDoBlindly: '无明确症状时不建议把头发微量元素检测作为脱发判断依据。',
    departments: ['皮肤科', '毛发门诊'],
    images: {
      principle: 'scalp-overview.webp'
    }
  },
  {
    id: 'neck',
    name: '颈椎',
    sectionId: 'neck-torso',
    priority: 'featured',
    grade: 'yellow',
    tagline: '先看症状，再决定是否影像检查。',
    summary: '久坐低头会让颈肩长期紧张，但影像上的突出或曲度变化不一定等于症状来源。',
    dailyObservation: '检查屏幕是否与视线平齐，每坐 45 分钟做下巴内收和肩颈活动，留意转头是否受限。',
    whenToCheck: '上肢麻木、刺痛、无力超过 1 周，颈痛放射到手臂，或走路有踩棉花感时，建议尽快就诊。',
    dontDoBlindly: '无神经症状时不建议直接做颈椎 MRI，也不建议未经评估做强力颈椎推拿。',
    departments: ['骨科', '康复科', '运动医学科'],
    images: {
      principle: 'neck-principle.webp',
      lifestyle: 'neck-lifestyle.webp'
    }
  },
  {
    id: 'thyroid',
    name: '甲状腺',
    sectionId: 'neck-torso',
    priority: 'compact',
    grade: 'yellow',
    tagline: '结节常见，关键是分层管理。',
    summary: '甲状腺结节和功能异常很常见，重点不是恐慌，而是看功能、超声特征和家族史。',
    dailyObservation: '留意颈前肿块、怕热心慌、怕冷乏力、体重异常变化，以及家族甲状腺疾病史。',
    whenToCheck: '摸到颈前肿块、声音嘶哑持续、心慌手抖或明显乏力怕冷时，建议做甲状腺相关评估。',
    dontDoBlindly: '不要因为发现小结节就反复高频复查，复查间隔应根据超声分级和医生建议决定。',
    departments: ['内分泌科', '甲状腺外科'],
    images: {
      principle: 'thyroid-overview.webp'
    }
  },
  {
    id: 'gut',
    name: '胃肠',
    sectionId: 'neck-torso',
    priority: 'featured',
    grade: 'yellow',
    tagline: '反酸、腹胀和排便变化值得记录。',
    summary: '胃肠问题经常和饮食、压力、幽门螺杆菌、反流和肠道节律有关，单次不适不等于严重疾病。',
    dailyObservation: '记录反酸、腹胀、腹痛、排便频率和食物触发因素，观察是否反复出现或影响睡眠。',
    whenToCheck: '反酸每周多次、黑便便血、体重下降、吞咽困难或腹痛持续加重时，建议看消化科。',
    dontDoBlindly: '无症状年轻人不建议把胃肠镜当作随意加项，是否需要应结合年龄、症状和家族史。',
    departments: ['消化内科'],
    images: {
      principle: 'gut-principle.webp',
      lifestyle: 'gut-lifestyle.webp'
    }
  },
  {
    id: 'spine',
    name: '脊柱',
    sectionId: 'neck-torso',
    priority: 'compact',
    grade: 'green',
    tagline: '体态先从镜子和照片里看。',
    summary: '高低肩、骨盆前倾和脊柱侧弯并不都需要医疗处理，但持续疼痛或明显不对称值得评估。',
    dailyObservation: '用正面和侧面照片观察肩膀高度、骨盆位置和站姿变化，结合久坐后的酸痛感记录。',
    whenToCheck: '背痛持续、弯腰明显不对称、青少年体态快速变化或疼痛影响运动时，建议看康复科或骨科。',
    dontDoBlindly: '不要只凭体态照片购买矫正器或课程，明显问题应先做专业评估。',
    departments: ['康复科', '骨科'],
    images: {
      principle: 'spine-overview.webp'
    }
  },
  {
    id: 'knee',
    name: '膝盖',
    sectionId: 'movement',
    priority: 'featured',
    grade: 'yellow',
    tagline: '运动后的疼痛需要分辨来源。',
    summary: '跑步、球类和登山后的膝痛，可能来自负荷变化、髌股关节、半月板或肌力控制问题。',
    dailyObservation: '记录疼痛位置、运动类型、是否肿胀卡住，以及上下楼和下蹲时是否明显加重。',
    whenToCheck: '膝盖肿胀、卡住、打软腿、无法负重，或疼痛持续超过 2 周影响运动时，建议看运动医学科。',
    dontDoBlindly: '不要一疼就自行贴“修复半月板”的产品；MRI 是否需要应结合体格检查。',
    departments: ['运动医学科', '骨科', '康复科'],
    images: {
      principle: 'knee-principle.webp',
      lifestyle: 'knee-lifestyle.webp'
    }
  },
  {
    id: 'feet',
    name: '足弓',
    sectionId: 'movement',
    priority: 'featured',
    grade: 'green',
    tagline: '脚底压力会影响全身运动链。',
    summary: '扁平足、高弓足、拇外翻和鞋底磨损，都会影响走路、跑步和膝髋受力。',
    dailyObservation: '观察鞋底磨损是否明显偏一侧，久站后脚底是否疼痛，湿脚印是否几乎没有足弓空隙。',
    whenToCheck: '足底痛、跟腱痛、拇外翻疼痛、运动后反复膝髋不适时，建议看足踝或运动医学门诊。',
    dontDoBlindly: '不要随意购买高价矫形鞋垫；是否需要鞋垫应结合足底压力和步态评估。',
    departments: ['足踝外科', '运动医学科', '康复科'],
    images: {
      principle: 'feet-principle.webp',
      lifestyle: 'feet-lifestyle.webp'
    }
  },
  {
    id: 'sleep',
    name: '睡眠',
    sectionId: 'system',
    priority: 'featured',
    grade: 'green',
    tagline: '睡得够，不一定恢复得好。',
    summary: '睡眠质量、昼夜节律、压力恢复和打鼾，会共同影响精神状态、体重管理和长期健康。',
    dailyObservation: '记录入睡时间、夜醒次数、醒后精神、午后困倦和周末补觉幅度，睡前减少强光屏幕刺激。',
    whenToCheck: '长期失眠、白天明显嗜睡、响亮打鼾伴憋醒，或情绪压力影响睡眠超过 2 周时，建议就诊。',
    dontDoBlindly: '不建议自行长期服用助眠药或褪黑素，持续睡眠问题应先找原因。',
    departments: ['睡眠门诊', '呼吸科', '心理科'],
    images: {
      principle: 'sleep-principle.webp',
      lifestyle: 'sleep-lifestyle.webp'
    }
  },
  {
    id: 'allergy',
    name: '过敏',
    sectionId: 'system',
    priority: 'compact',
    grade: 'yellow',
    tagline: '过敏检测要看症状和类型。',
    summary: '吸入性过敏、食物过敏和不耐受不是一回事，检测结果需要结合真实症状理解。',
    dailyObservation: '记录打喷嚏、皮疹、腹泻或咳喘是否和季节、环境、食物或宠物接触有关。',
    whenToCheck: '反复鼻炎、喘息、荨麻疹、进食后明确不适或过敏反应影响生活时，建议看变态反应科。',
    dontDoBlindly: '不建议用 IgG 食物检测来判断“食物过敏”，容易造成不必要忌口。',
    departments: ['变态反应科', '皮肤科', '耳鼻喉科'],
    images: {
      principle: 'allergy-overview.webp'
    }
  },
  {
    id: 'nutrition',
    name: '营养',
    sectionId: 'system',
    priority: 'compact',
    grade: 'green',
    tagline: '补剂之前，先看饮食和风险。',
    summary: '维生素 D、铁、B12、钙镁锌等指标和饮食结构、日晒、月经、素食习惯都有关系。',
    dailyObservation: '观察日晒、蛋白质摄入、蔬果摄入、月经量、长期疲劳和饮食限制，先从生活记录开始。',
    whenToCheck: '长期素食、月经过多、骨量风险、明显乏力或医生怀疑缺乏时，可考虑针对性检测。',
    dontDoBlindly: '不建议长期叠加多种高剂量补剂，脂溶性维生素和矿物质过量也可能带来风险。',
    departments: ['营养科', '全科医学科', '内分泌科'],
    images: {
      principle: 'nutrition-overview.webp'
    }
  }
]

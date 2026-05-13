/* ═══════════════════════════════════════════════════════════════════
   全身健康关注地图 · Full-Body Health Awareness Map
   script.js  —  Three.js particle field + body part data + UI logic
   ═══════════════════════════════════════════════════════════════════ */

/* ─── Three.js Particle Background ────────────────────────────── */
(function initThree() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 28;

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  /* ── Particles ── */
  const COUNT = window.innerWidth < 768 ? 80 : 160;
  const positions = new Float32Array(COUNT * 3);
  const vels = [];
  const spread = { x: 40, y: 28, z: 6 };

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3]     = (Math.random() - .5) * spread.x * 2;
    positions[i * 3 + 1] = (Math.random() - .5) * spread.y * 2;
    positions[i * 3 + 2] = (Math.random() - .5) * spread.z * 2;
    vels.push({
      x: (Math.random() - .5) * .016,
      y: (Math.random() - .5) * .012,
      z: (Math.random() - .5) * .004,
    });
  }

  const ptGeo = new THREE.BufferGeometry();
  ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const ptMat = new THREE.PointsMaterial({
    color: 0x4a90d9,
    size: .22,
    transparent: true,
    opacity: .55,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(ptGeo, ptMat);
  scene.add(points);

  /* ── Connection lines ── */
  const MAX_DIST = 6.5;
  const lineGeo = new THREE.BufferGeometry();
  const maxLines = COUNT * 6;
  const linePts = new Float32Array(maxLines * 6);
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePts, 3));
  const lineMat = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
    color: 0x6aaae0, transparent: true, opacity: .18,
  }));
  scene.add(lineMat);

  function updateLines() {
    let idx = 0;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = positions[i*3]   - positions[j*3];
        const dy = positions[i*3+1] - positions[j*3+1];
        const dz = positions[i*3+2] - positions[j*3+2];
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < MAX_DIST && idx + 5 < maxLines * 6) {
          linePts[idx++] = positions[i*3];
          linePts[idx++] = positions[i*3+1];
          linePts[idx++] = positions[i*3+2];
          linePts[idx++] = positions[j*3];
          linePts[idx++] = positions[j*3+1];
          linePts[idx++] = positions[j*3+2];
        }
      }
    }
    // clear remainder
    for (; idx < maxLines * 6; idx++) linePts[idx] = 0;
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.setDrawRange(0, Math.floor(idx / 3));
  }

  /* ── Mouse parallax ── */
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth  - .5) * .6;
    my = (e.clientY / window.innerHeight - .5) * .4;
  });

  /* ── Animate ── */
  let frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    frame++;

    for (let i = 0; i < COUNT; i++) {
      positions[i*3]   += vels[i].x;
      positions[i*3+1] += vels[i].y;
      positions[i*3+2] += vels[i].z;
      if (Math.abs(positions[i*3])   > spread.x) vels[i].x *= -1;
      if (Math.abs(positions[i*3+1]) > spread.y) vels[i].y *= -1;
      if (Math.abs(positions[i*3+2]) > spread.z) vels[i].z *= -1;
    }
    ptGeo.attributes.position.needsUpdate = true;
    if (frame % 2 === 0) updateLines();

    // Gentle camera sway
    camera.position.x += (mx - camera.position.x) * .04;
    camera.position.y += (-my - camera.position.y) * .04;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();
})();


/* ═══════════════════════════════════════════════════════════════════
   Body Part Data — 13 P0 Parts
   ═══════════════════════════════════════════════════════════════════ */
const PARTS = {
  scalp: {
    name: '头皮 & 头发',
    icon: '💇',
    level: 'yellow',
    levelLabel: '🟡 症状出现可考虑',
    summary: '脱发不只是美观问题，往往是头皮环境、激素水平或营养状况的外在信号。',
    overview: `大多数人的常规体检不会系统评估头皮与毛发健康。雄激素性脱发（男女均可发生）、休止期脱发（压力/产后/营养缺乏诱发）和斑秃在人群中非常常见，但大多数人缺乏早期识别能力，往往等到脱发明显才就诊，错过了最佳干预窗口期。

头皮状态还与皮脂腺功能、真菌（马拉色菌）平衡密切相关。脂溢性皮炎、银屑病等也可首先表现为头皮问题。`,
    green: {
      label: '🟢 日常观察方法',
      text: '每天观察枕头/浴缸中的脱发量（正常每日 50–100 根）；洗发时感受头皮是否有油腻、瘙痒或脱屑感；留意发际线变化趋势。使用温和洗发水，避免过度抓挠头皮。',
    },
    yellow: {
      label: '🟡 这些情况建议就诊',
      text: '每日脱发明显超过 100 根、持续 3 个月以上；发量在数月内肉眼可见减少；出现斑秃（圆形脱发）；头皮持续红斑、脓疱、剧烈瘙痒。',
    },
    red: {
      label: '🔴 不建议盲目做',
      text: '无明确症状时不建议进行头发微量元素检测（不被主流皮肤科指南推荐，结果可靠性低，商业机构常用于推销补剂）。',
    },
    depts: ['皮肤科', '毛发专科门诊'],
    tests: ['毛发镜检查', '皮肤镜', '激素六项（雄激素）', '甲状腺功能（TSH）', '血清铁蛋白', '维生素 D'],
    ref: '参考：中国临床皮肤病学（第二版）；AAD 雄激素性脱发指南 2023',
  },

  eyes: {
    name: '眼睛',
    icon: '👁',
    level: 'green',
    levelLabel: '🟢 日常观察为主',
    summary: '视力正常不等于眼睛舒服。眼表健康（干眼、睑板腺功能）是最常被体检忽略的眼部问题。',
    overview: `常规体检通常只查静态视力和眼底（部分套餐），但对于现代人最常见的干眼症、视疲劳、睑板腺功能障碍（MGD）缺乏覆盖。

研究显示中国城市人群干眼患病率超过 21%，长时间使用数字屏幕是主要诱因。干眼若长期不干预，会影响角膜健康。此外，飞蚊症突然增多、视野缺损等信号需要及时评估排除视网膜问题。`,
    green: {
      label: '🟢 日常观察方法',
      text: '每使用屏幕 20 分钟，看 6 米外景物 20 秒（20-20-20 法则）；主动眨眼，保持泪膜完整；留意用眼后是否出现酸涩、干痒、畏光、眨眼增多。',
    },
    yellow: {
      label: '🟡 这些情况建议就诊',
      text: '干涩、异物感持续超过 2 周；眼睛反复充血发红；视力突然变化；飞蚊症在短期内明显增多或伴随闪光感；有青光眼家族史（每年眼压检查）。',
    },
    red: {
      label: '🔴 不建议盲目做',
      text: '无明确症状时无需常规进行 OCT 视网膜断层扫描或角膜地形图（费用高，需临床指征）。',
    },
    depts: ['眼科', '干眼专科门诊'],
    tests: ['泪膜破裂时间（BUT）', 'Schirmer 泪液分泌试验', '睑板腺成像', '角膜荧光素染色', '眼压测量'],
    ref: '参考：中华眼科学 2023；Tear Film & Ocular Surface Society DEWS II 报告',
  },

  nose: {
    name: '鼻腔 & 鼻窦',
    icon: '👃',
    level: 'yellow',
    levelLabel: '🟡 症状出现可考虑',
    summary: '长期鼻炎、鼻塞不只是"小毛病"，会影响睡眠质量、注意力和生活质量。',
    overview: `慢性鼻炎和过敏性鼻炎在中国城市人群中患病率超过 17%，常规体检几乎不覆盖。鼻中隔偏曲导致的单侧长期鼻塞也非常常见，许多人未能察觉。

鼻腔问题还与睡眠呼吸障碍（打鼾、OSA）密切相关——鼻腔通气不畅是上气道阻力综合征的常见诱因。嗅觉减退在 COVID-19 后遗症或早期神经退行性疾病中也可能出现，值得关注。`,
    green: {
      label: '🟢 日常观察方法',
      text: '观察是否有季节性或常年性鼻塞、晨起喷嚏连续 3 次以上；留意嗅觉是否正常；记录鼻塞是否以单侧为主（提示结构问题）。',
    },
    yellow: {
      label: '🟡 这些情况建议就诊',
      text: '单侧持续鼻塞超过 4 周；反复鼻出血；嗅觉明显下降或消失；头痛合并黄绿色鼻涕（提示鼻窦炎）；怀疑过敏性鼻炎影响生活质量。',
    },
    red: {
      label: '🔴 不建议盲目做',
      text: '无症状时不建议常规进行鼻窦 CT（辐射量可观，需医生评估指征后再做）。',
    },
    depts: ['耳鼻喉科（鼻科方向）', '变态反应科（过敏科）'],
    tests: ['鼻内镜检查', '过敏原皮肤点刺试验（SPT）', '总 IgE + 吸入性特异性 IgE', '鼻窦 CT（有指征时）'],
    ref: '参考：中国变应性鼻炎诊断和治疗指南（2022 年修订版）；ARIA 2019 指南',
  },

  oral: {
    name: '口腔 & 牙齿',
    icon: '🦷',
    level: 'yellow',
    levelLabel: '🟡 症状出现可考虑',
    summary: '不疼不代表没问题——牙周和智齿问题可以悄悄发展多年，且与全身炎症密切相关。',
    overview: `研究显示中国成年人牙周病患病率超过 85%，但大多数体检套餐完全不包含口腔检查。牙周病与心血管疾病、糖尿病、早产等系统性疾病存在明确相关性。

阻生智齿（第三磨牙）在 20–35 岁人群中极为常见，无症状并不代表没有风险——隐性的牙周袋、邻牙龋坏或牙根吸收往往需要全景 X 光才能发现。每年 1 次口腔检查应当成为健康基础习惯。`,
    green: {
      label: '🟢 日常观察方法',
      text: '使用软毛牙刷，每次刷牙 2 分钟，早晚各一次；每天使用牙线或冲牙器清洁牙缝；刷牙后检查牙龈是否出血；注意口腔是否有异味。',
    },
    yellow: {
      label: '🟡 这些情况建议就诊',
      text: '刷牙出血超过 2 周；牙龈反复肿痛或脓肿；有疼痛、反复发炎的智齿；牙齿敏感（冷热刺激痛）明显加重；口腔黏膜出现持续 2 周以上的白斑或溃疡。',
    },
    red: {
      label: '🔴 不建议盲目做',
      text: '没有牙结石问题时不需要每月洗牙（正常频率为每 6–12 个月一次）；不建议无指征进行 CBCT 锥形束 CT（辐射量大，需口腔科医生明确指征）。',
    },
    depts: ['口腔科（全科）', '牙周科', '口腔外科（智齿手术）'],
    tests: ['口腔全景 X 光（OPG）', '牙周探诊（牙周袋深度）', '龋齿检查', '洁牙（牙周基础治疗）'],
    ref: '参考：第四次全国口腔健康流行病学调查（2018）；AAP 牙周病分类系统 2017',
  },

  neck: {
    name: '颈椎 & 肩颈',
    icon: '🦴',
    level: 'yellow',
    levelLabel: '🟡 症状出现可考虑',
    summary: '别一上来就做核磁——先看姿态和神经症状，判断是否有影像学检查的必要。',
    overview: `颈椎病是现代城市人群中高发的肌骨问题，久坐、低头、工位设置不合理是主要诱因。但"颈椎病"本身是一个宽泛的概念，包含颈型、神经根型、脊髓型等多种类型，处理原则差异很大。

临床上过度影像化的问题突出——许多人一有颈部不适就直接做核磁，结果对"椎间盘突出"等影像表现感到焦虑，却忽略了这些表现在健康人群中也非常普遍。评估应从症状、体格检查开始，影像学仅在有明确指征时使用。`,
    green: {
      label: '🟢 日常观察方法',
      text: '检查工位：屏幕高度与视线平齐，不要长期低头；每坐 45 分钟做颈肩拉伸（耳到肩、下巴内收）；留意转头时是否受限、肩颈是否长期僵硬。',
    },
    yellow: {
      label: '🟡 这些情况建议就诊',
      text: '上肢麻木、刺痛或无力超过 1 周；颈部疼痛明显放射至肩膀、手臂；颈痛伴随头痛、耳鸣；行走有踩棉花感（提示脊髓型，需及时就诊）。',
    },
    red: {
      label: '🔴 不建议盲目做',
      text: '无神经症状时不建议直接做颈椎 MRI（应先从 X 光和体格检查开始）；不建议在未经专业评估的情况下进行强力颈椎推拿（有风险）。',
    },
    depts: ['骨科', '康复科', '运动医学科'],
    tests: ['颈椎 X 光（评估曲度与骨质）', '颈椎 MRI（有神经症状时）', '神经电生理检查', '姿态评估'],
    ref: '参考：中国颈椎病诊治技术专家共识（2020）；NICE 颈痛管理指南',
  },

  thyroid: {
    name: '甲状腺',
    icon: '🫀',
    level: 'yellow',
    levelLabel: '🟡 症状出现可考虑',
    summary: '甲状腺结节很常见，但大多数良性，有家族史者更需主动筛查功能与结构。',
    overview: `中国成年人甲状腺结节总体检出率超过 20%，绝大多数为良性。随着超声分辨率提升，越来越多人在体检中发现结节，但过度焦虑和过度处理的问题也随之出现。

关键是把握"结节大小、TI-RADS 分级、甲状腺功能"三维评估，而不是发现结节就焦虑或立刻进行穿刺活检。甲状腺功能（亢进或减退）有时表现为非特异症状（疲倦、怕热/怕冷、体重变化、心跳异常），容易被忽略。`,
    green: {
      label: '🟢 日常观察方法',
      text: '注意有无异常疲劳（特别是休息后也不恢复）、明显怕冷或怕热、体重在短期内无故变化、心跳加快或心跳异常感；轻触颈前检查是否有明显肿胀或结节。',
    },
    yellow: {
      label: '🟡 这些情况建议就诊',
      text: '有甲状腺疾病（甲亢、甲减、甲状腺癌）一级亲属家族史；近期无故体重变化超过 5kg；持续心慌、手抖、脱发、面部浮肿；颈前出现可触及包块。',
    },
    red: {
      label: '🔴 不建议盲目做',
      text: '无症状时不建议常规进行甲状腺核素扫描（ECT）；不建议仅凭"结节存在"就自行要求穿刺活检（需由内分泌科/超声科医生根据 TI-RADS 分级决定）。',
    },
    depts: ['内分泌科', '甲状腺/头颈外科（手术指征时）'],
    tests: ['TSH（促甲状腺激素）', 'FT3、FT4', '抗 TPO 抗体、抗 Tg 抗体', '甲状腺彩超（评估结节 TI-RADS）', '颈部淋巴结超声'],
    ref: '参考：中国甲状腺结节和分化型甲状腺癌诊治指南（第二版）；ATA 指南 2023',
  },

  spine: {
    name: '脊柱 & 体态',
    icon: '🩻',
    level: 'yellow',
    levelLabel: '🟡 症状出现可考虑',
    summary: '脊柱侧弯和骨盆前倾往往无痛，但长期会影响全身力线，改变疼痛的分布模式。',
    overview: `脊柱侧弯（Scoliosis）在青少年中患病率约 2–4%，成年后常被遗忘。骨盆前倾、高低肩在久坐人群中极为普遍，它们会通过力线传导影响腰椎、髋部和膝盖。

许多腰背痛的根源其实是体态问题而非器质性病变，通过功能性评估和康复训练可以有效改善。过度依赖影像学（特别是腰椎 MRI）而忽视功能评估，是目前临床处理中的常见误区。`,
    green: {
      label: '🟢 日常观察方法',
      text: '对镜检查：两肩高度是否对称、两侧腰部曲线是否均匀（Adam 前屈测试：前弯时背部两侧是否等高）；站立时检查骨盆是否有明显前倾（腰椎过度前凸）；穿单色紧身衣观察更清晰。',
    },
    yellow: {
      label: '🟡 这些情况建议就诊',
      text: '两肩或两髋高度明显不对称；腰背痛影响日常生活超过 6 周；青少年（10–18 岁）发育期应常规筛查脊柱侧弯；腰痛伴下肢放射痛或麻木。',
    },
    red: {
      label: '🔴 不建议盲目做',
      text: '无症状、无外伤时不建议常规进行全脊柱 CT（辐射量大）；不建议未经评估就购买矫形背带（可能加重代偿）。',
    },
    depts: ['骨科（脊柱方向）', '康复科', '运动医学科'],
    tests: ['体态评估（功能性动作筛查 FMS）', 'Adam 前屈测试', '脊柱全长 X 光（有医学指征时）', '腰椎 MRI（有神经症状时）'],
    ref: '参考：Scoliosis Research Society 指南；中国腰痛诊疗指南 2022',
  },

  gut: {
    name: '胃肠',
    icon: '🫙',
    level: 'yellow',
    levelLabel: '🟡 症状出现可考虑',
    summary: '反流、胀气、幽门螺杆菌是日常高频问题，不是"忍一忍"的小事。',
    overview: `胃食管反流病（GERD）在中国的患病率约为 5–10% 且呈上升趋势；幽门螺杆菌（Hp）感染率依然超过 40%。常规体检几乎不覆盖这两项。

Hp 感染与胃溃疡、胃癌有明确相关性，C13/C14 呼气试验是便捷无创的检测方式。对于年龄 ≥ 45 岁、有胃癌家族史或长期消化不良症状者，胃镜是值得主动考虑的选项。肠镜则建议 50 岁（有家族史提前至 40 岁）时进行第一次筛查。`,
    green: {
      label: '🟢 日常观察方法',
      text: '饭后是否有烧心或反酸感；大便是否规律（3 次/天到 3 次/周均属正常区间）；大便颜色和性状是否正常（布里斯托大便分类量表 3–4 型为最佳）；腹胀是否与特定食物相关。',
    },
    yellow: {
      label: '🟡 这些情况建议就诊',
      text: '反酸、烧心频率超过每周 2 次；大便颜色发黑或肉眼见血；无故腹痛持续超过 2 周；腹泻与便秘交替出现；年龄 ≥ 45 岁且从未做过胃镜；有胃癌家族史。',
    },
    red: {
      label: '🔴 不建议盲目做',
      text: '无症状时不建议将胃肠镜作为常规体检「加项」（有指征时才做）；不建议购买益生菌产品作为"万能消化改善方案"（需明确症状和菌株才有意义）。',
    },
    depts: ['消化内科', '胃肠外科（有手术指征时）'],
    tests: ['幽门螺杆菌 C13/C14 呼气试验', '胃镜（有指征时）', '结肠镜（≥50 岁初次筛查）', '粪便常规 + 潜血试验', '腹部超声'],
    ref: '参考：中国胃食管反流病诊断与治疗指南（2020）；幽门螺杆菌感染处理 Maastricht V 共识',
  },

  knee: {
    name: '膝关节',
    icon: '🦵',
    level: 'yellow',
    levelLabel: '🟡 症状出现可考虑',
    summary: '运动频率高的人需要学会读懂膝盖的信号，不是每次酸痛都需要 MRI。',
    overview: `膝关节是人体最复杂的关节之一，也是运动损伤最高发的部位。髌股关节综合征（「跑者膝」）、髂胫束综合征、半月板退变是青中年常见问题，多数可通过调整训练量和康复训练改善。

临床上存在两个极端：一是「忍痛不就医」导致小问题变大；二是「过度影像化」——轻微症状直接做 MRI，对"半月板轻度退变"等常见影像表现产生不必要焦虑。学会识别需要就医的红旗信号，才是正确的自我管理起点。`,
    green: {
      label: '🟢 日常观察方法',
      text: '跑步或运动后记录膝盖的具体不适位置（内侧/外侧/前方/后方）；上下楼梯时是否有明显不适；静息后活动开是否缓解（提示劳损而非结构性损伤）；每次运动后做充分拉伸。',
    },
    yellow: {
      label: '🟡 这些情况建议就诊',
      text: '膝关节明显肿胀超过 3 天不消；疼痛影响日常行走；受伤后感到"脱位感"或关节突然无力（提示韧带损伤）；膝盖绞锁（无法完全伸直）；运动后疼痛反复发作超过 4 周。',
    },
    red: {
      label: '🔴 不建议盲目做',
      text: '普通运动后一两天的酸胀感不需要立即做膝关节 MRI（可观察 1–2 周）；不建议自行购买玻璃酸钠注射（需医生评估适应症）。',
    },
    depts: ['运动医学科', '骨科（关节方向）', '康复科'],
    tests: ['膝关节 MRI（有外伤或长期症状时）', 'X 光（评估骨质与对线）', '运动功能评估', '步态分析'],
    ref: '参考：JOSPT 髌股关节综合征指南 2019；中国运动损伤诊疗规范 2021',
  },

  feet: {
    name: '足弓 & 步态',
    icon: '🦶',
    level: 'green',
    levelLabel: '🟢 日常观察为主',
    summary: '脚底是身体的地基，足弓问题会通过力线传导，悄悄影响膝盖和腰背。',
    overview: `足弓异常（扁平足/高弓足）和步态偏差在人群中非常普遍，但几乎从不出现在体检报告中。研究显示，扁平足人群膝盖内侧室骨关节炎的风险明显高于正常足弓人群。

拇外翻（大脚趾向外偏斜）在女性中尤为常见，与不合适的鞋型密切相关，早期可以保守处理，进展后可能需要手术矫正。足底筋膜炎是久站或跑量大人群最常见的足部问题，早期干预效果好。`,
    green: {
      label: '🟢 日常观察方法',
      text: '湿脚踩纸观察足印（正常足弓内侧约 1/3 不着地）；检查鞋底磨损是否均匀（内侧过磨提示足弓塌陷倾向）；久站后脚底是否有明显酸痛；早晨起床踩地时足跟是否有疼痛感（足底筋膜炎信号）。',
    },
    yellow: {
      label: '🟡 这些情况建议就诊',
      text: '足底疼痛影响正常行走；拇外翻角度持续增大或出现疼痛；运动后足跟或足底反复疼痛；儿童（5 岁以上）扁平足明显且伴随走路异常。',
    },
    red: {
      label: '🔴 不建议盲目做',
      text: '无症状时不建议自行购买定制矫形鞋垫（需专科评估足底压力分布后配制）；不建议在未确诊前自行进行足跟皮质醇注射。',
    },
    depts: ['骨科（足踝专科）', '运动医学科', '康复科'],
    tests: ['足底压力测试（Pedobarograph）', '步态分析', '足踝 X 光（有指征时）', '足底筋膜超声'],
    ref: '参考：AOFAS 足踝科普指南；足底筋膜炎临床诊疗专家共识（2022）',
  },

  allergy: {
    name: '过敏源',
    icon: '🌿',
    level: 'yellow',
    levelLabel: '🟡 症状出现可考虑',
    summary: '找到真正的致敏原比盲目忌口更重要。过敏反应往往被严重低估。',
    overview: `过敏性疾病（鼻炎、哮喘、特应性皮炎、食物过敏）影响全球约 20–30% 的人口，且患病率仍在上升。但许多人对自己是否过敏、对什么过敏并不清楚，导致要么盲目忌口、要么忽视症状。

一个重要的区别：IgE 介导的真正过敏反应（皮试或特异性 IgE 可检测）与"食物不耐受"是两个完全不同的概念。目前商业机构大量推广的"IgG 食物不耐受检测"不被 AAAAI、EAACI 等主流变态反应学会认可，其结果常导致不必要的大规模食物限制。`,
    green: {
      label: '🟢 日常观察方法',
      text: '记录接触特定食物或环境后的身体反应（出疹、流涕、眼痒、腹泻、胸闷等）；留意是否有季节性规律；避免高浓度香料、宠物毛发等常见诱因后症状是否改善。',
    },
    yellow: {
      label: '🟡 这些情况建议就诊',
      text: '反复荨麻疹或皮疹（特别是接触特定物质后）；季节性鼻炎、眼痒严重影响生活和工作；怀疑食物引起的过敏反应（进食后 2 小时内出现皮疹/腹痛/呼吸困难）。',
    },
    red: {
      label: '🔴 不建议盲目做',
      text: '不建议进行 IgG 食物不耐受检测（不被主流过敏指南认可，结果缺乏临床意义，常导致不必要的食物限制）；不建议未经检测就大规模限制饮食。',
    },
    depts: ['变态反应科（过敏科）', '皮肤科', '呼吸科（哮喘相关）'],
    tests: ['总 IgE', '特异性 IgE（ImmunoCAP）', '皮肤点刺试验（SPT）', '食物激发试验（金标准，在医院进行）'],
    ref: '参考：AAAAI 过敏诊断实践参数（2023）；EAACI 食物过敏指南；ARIA 鼻炎指南',
  },

  sleep: {
    name: '睡眠 & 压力',
    icon: '😴',
    level: 'green',
    levelLabel: '🟢 日常观察为主',
    summary: '睡眠质量对代谢、情绪和免疫力的影响远超一般人的认知，体检查不到。',
    overview: `睡眠是最被体检忽略的健康维度之一。中国成年人睡眠障碍患病率超过 38%，睡眠呼吸暂停综合征（OSA）的漏诊率极高——大量患者以为自己只是"睡眠浅"，实际上每晚呼吸反复暂停，导致低氧、碎片化睡眠，长期增加心血管病、代谢综合征风险。

心理压力与睡眠质量密切相关，持续高压力水平与皮质醇失调、免疫抑制、肠道菌群紊乱均有关联。但睡眠问题的评估应从简单、有效的量表工具开始，而非直接进行多导睡眠图。`,
    green: {
      label: '🟢 日常观察方法',
      text: '使用 PSQI 匹兹堡睡眠质量指数或 ESS 日间嗜睡量表进行自评；记录睡前 1 小时屏幕时间；观察早晨醒后是否仍感疲倦（"睡不够"感）；使用可穿戴设备辅助监测心率变异性（HRV）趋势。',
    },
    yellow: {
      label: '🟡 这些情况建议就诊',
      text: '大声打鼾伴随白天明显困倦（高度提示 OSA）；入睡困难或早醒持续超过 3 个月（慢性失眠）；白天有难以抗拒的入睡冲动（提示发作性睡病）；情绪低落、焦虑症状明显影响日常功能。',
    },
    red: {
      label: '🔴 不建议盲目做',
      text: '无明确症状时不建议常规进行多导睡眠图（PSG）检查（费用高、需临床指征）；不建议未经医生评估就长期服用镇静催眠药物（包括 OTC 助眠产品）。',
    },
    depts: ['睡眠医学科', '神经内科', '心理科 / 精神科'],
    tests: ['PSQI 睡眠质量指数（自评量表）', 'ESS 嗜睡量表', '家庭睡眠呼吸暂停测试（HSAT）', '多导睡眠图（PSG，金标准，有指征时）', '心理健康量表（PHQ-9、GAD-7）'],
    ref: '参考：中国成人失眠诊断与治疗指南（2023 版）；AASM 睡眠呼吸暂停诊断标准 2023',
  },

  nutrition: {
    name: '微量元素 & 维生素',
    icon: '💊',
    level: 'yellow',
    levelLabel: '🟡 症状出现可考虑',
    summary: '血常规看不到的缺乏：维生素 D 和 B12 是现代人最常见的隐性不足，长期缺乏影响全身。',
    overview: `常规血常规只覆盖贫血筛查，无法反映维生素 D、B12、铁蛋白等关键营养素的状态。研究显示中国城市居民维生素 D 不足（25-OH-D3 < 30 ng/mL）比例超过 70%；长期素食/纯素食者 B12 缺乏的风险极高，但症状出现往往滞后数年。

另一个常被忽视的问题是铁蛋白——即使血红蛋白正常，铁蛋白偏低也会导致疲劳、注意力下降和脱发（储存性铁缺乏）。补充之前应明确具体缺乏什么，避免盲目大量补充（如脂溶性维生素过量有毒性风险）。`,
    green: {
      label: '🟢 日常观察方法',
      text: '记录饮食中各类食物的覆盖情况；检查日晒时间（维生素 D 合成需要充足紫外线）；留意是否长期感到莫名疲劳、指甲脆断、注意力下降；素食者尤其注意 B12 摄入来源。',
    },
    yellow: {
      label: '🟡 这些情况建议就诊',
      text: '长期素食或纯素饮食（B12 风险）；孕期或备孕期（叶酸、铁、碘）；持续疲劳乏力无明显诱因；骨骼/肌肉酸痛；手脚麻木或平衡感下降（提示 B12 缺乏神经症状）。',
    },
    red: {
      label: '🔴 不建议盲目做',
      text: '无症状、无风险因素时不建议常规检测全套微量元素（锌、硒、铬等商业套餐，临床意义有限）；不建议未经检测就大量补充脂溶性维生素 A、D、E（有蓄积毒性风险）。',
    },
    depts: ['内科 / 全科', '营养科', '内分泌科（骨代谢相关）'],
    tests: ['维生素 D（25-OH-D3）', '维生素 B12', '叶酸', '血清铁 + 铁蛋白 + 转铁蛋白饱和度', '血钙、镁', '锌（有临床指征时）'],
    ref: '参考：中国居民膳食营养素参考摄入量（2023 版）；NIH 维生素 D 膳食补充剂实况报告',
  },
};


/* ═══════════════════════════════════════════════════════════════════
   UI Logic
   ═══════════════════════════════════════════════════════════════════ */

const isMobile = () => window.innerWidth <= 900;

/* ── Build panel/sheet HTML ── */
function buildPartHTML(partId) {
  const p = PARTS[partId];
  if (!p) return '';

  const levelClass = { green: 'level-green', yellow: 'level-yellow', red: 'level-red' }[p.level] || 'level-green';

  const deptsHTML = p.depts.map(d => `<span class="pc-tag">${d}</span>`).join('');
  const testsHTML = p.tests.map(t => `<span class="pc-tag">${t}</span>`).join('');

  return `
    <div class="pc-header fade-in-up">
      <div class="pc-name">${p.icon} ${p.name}</div>
      <span class="pc-level ${levelClass}">${p.levelLabel}</span>
    </div>
    <p class="pc-summary">${p.summary}</p>
    <div class="pc-blocks">
      <div class="pc-block block-green fade-in-up" style="animation-delay:.05s">
        <div class="pc-block-label">${p.green.label}</div>
        <div class="pc-block-text">${p.green.text}</div>
      </div>
      <div class="pc-block block-yellow fade-in-up" style="animation-delay:.1s">
        <div class="pc-block-label">${p.yellow.label}</div>
        <div class="pc-block-text">${p.yellow.text}</div>
      </div>
      <div class="pc-block block-red fade-in-up" style="animation-delay:.15s">
        <div class="pc-block-label">${p.red.label}</div>
        <div class="pc-block-text">${p.red.text}</div>
      </div>
      <div class="pc-block block-neutral fade-in-up" style="animation-delay:.2s">
        <div class="pc-block-label" style="color:var(--text2)">🏥 建议就诊科室</div>
        <div class="pc-tags">${deptsHTML}</div>
      </div>
      <div class="pc-block block-neutral fade-in-up" style="animation-delay:.25s">
        <div class="pc-block-label" style="color:var(--text2)">🔬 可能涉及的检查</div>
        <div class="pc-tags">${testsHTML}</div>
      </div>
    </div>
    <div class="pc-ref fade-in-up" style="animation-delay:.3s">${p.ref}</div>
  `;
}

/* ── Panel (desktop) ── */
const panelIdle    = document.getElementById('panelIdle');
const panelContent = document.getElementById('panelContent');

function showPanel(partId) {
  if (!panelIdle || !panelContent) return;
  panelContent.innerHTML = buildPartHTML(partId);
  panelIdle.classList.add('hidden');
  panelContent.classList.remove('hidden');
}

/* ── Bottom sheet (mobile) ── */
const sheetBackdrop = document.getElementById('sheetBackdrop');
const bottomSheet   = document.getElementById('bottomSheet');
const sheetBody     = document.getElementById('sheetBody');

function openSheet(partId) {
  if (!bottomSheet) return;
  sheetBody.innerHTML = buildPartHTML(partId);
  bottomSheet.classList.add('open');
  sheetBackdrop.classList.add('visible');
  bottomSheet.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeSheet() {
  bottomSheet.classList.remove('open');
  sheetBackdrop.classList.remove('visible');
  bottomSheet.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (sheetBackdrop) sheetBackdrop.addEventListener('click', closeSheet);

/* ── Hotspot & system tag click logic ── */
function activatePart(partId, sourceEl) {
  // Clear previous active state
  document.querySelectorAll('.hs.active, .sys-tag.active').forEach(el => el.classList.remove('active'));
  if (sourceEl) sourceEl.classList.add('active');

  if (isMobile()) {
    openSheet(partId);
  } else {
    showPanel(partId);
  }
}

// Body hotspots
document.querySelectorAll('.hs').forEach(btn => {
  btn.addEventListener('click', () => activatePart(btn.dataset.part, btn));
});

// System tags
document.querySelectorAll('.sys-tag').forEach(btn => {
  btn.addEventListener('click', () => activatePart(btn.dataset.part, btn));
});

/* ── Keyboard support ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSheet();
});

/* ── Header scroll shadow ── */
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 8
      ? '0 1px 20px rgba(0,0,0,.08)'
      : 'none';
  }, { passive: true });
}

/* ── Smooth section reveal (Intersection Observer) ── */
const revealEls = document.querySelectorAll('.grade-card, .section-head');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    io.observe(el);
  });
}

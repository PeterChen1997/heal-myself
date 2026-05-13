const partData = {
  eyes: {
    level: 'green',
    badge: '🟢 日常观察',
    title: '眼睛：视力正常不等于眼睛舒服',
    summary: '很多人的常规体检只查视力，却不会细看眼表状态、干眼倾向或屏幕使用后的不适感。这个模块帮助用户知道哪些问题值得先观察，哪些情况需要考虑进一步检查。',
    missed: '干眼、眼表舒适度、长时间屏幕使用后的视觉疲劳',
    observe: '是否频繁酸涩、畏光、干痒、眨眼变多',
    action: '如果反复出现干涩、异物感、夜间看屏困难，可考虑眼科面诊'
  },
  teeth: {
    level: 'yellow',
    badge: '🟡 症状出现可考虑',
    title: '牙齿：不疼不代表没问题',
    summary: '牙周、智齿和咬合问题很多时候不会在常规体检里被详细覆盖，但它们会悄悄影响口腔卫生、睡眠和长期炎症风险。',
    missed: '牙周袋、阻生智齿、磨牙与咬合问题',
    observe: '刷牙出血、口臭、咬东西不舒服、张口受限',
    action: '若持续出血、反复肿痛或咬合异常，建议口腔科 / 牙周科就诊'
  },
  neck: {
    level: 'yellow',
    badge: '🟡 症状出现可考虑',
    title: '颈肩：别一上来就核磁，先看姿态和神经症状',
    summary: '久坐、低头和工位姿势不合理，会让颈肩问题高频出现。这个产品强调先识别触发条件和危险信号，而不是被影像焦虑带着跑。',
    missed: '姿态负荷、肌肉紧张、早期神经牵拉不适',
    observe: '转头酸紧、肩颈僵硬、手麻、头痛是否与久坐同步出现',
    action: '若伴随持续手麻、无力或明显放射痛，建议骨科 / 康复科 / 运动医学评估'
  },
  sleep: {
    level: 'green',
    badge: '🟢 日常观察',
    title: '睡眠：体检正常也可能天天没睡好',
    summary: '睡眠质量对情绪、专注力和代谢影响很大，但通常不在常规体检套餐里被细问。这个模块帮助用户先做生活观察。',
    missed: '入睡困难、夜醒、打鼾、白天困倦与恢复感差',
    observe: '最近是否总觉得睡不够、起床后脑雾、下午明显犯困',
    action: '若长期打鼾、憋醒或白天功能受影响，建议睡眠门诊进一步评估'
  },
  knee: {
    level: 'yellow',
    badge: '🟡 症状出现可考虑',
    title: '膝盖：运动频率高的人更要会观察',
    summary: '跑步、跳操和力量训练可能让膝关节成为高频抱怨点。并不是每个人都要做影像，但应该知道哪些信号值得停下来看看。',
    missed: '运动后酸胀、髌股关节压力、动作模式异常',
    observe: '上下楼痛、深蹲痛、晨起僵硬、单侧更明显',
    action: '若疼痛持续、反复肿胀或影响运动，建议运动医学 / 骨科评估'
  },
  feet: {
    level: 'green',
    badge: '🟢 日常观察',
    title: '足弓：脚底是身体的小地基',
    summary: '足弓状态往往不会出现在常规体检报告里，但它会影响步态、膝盖和腰背负担。适合用可视化方式做日常科普。',
    missed: '足弓塌陷、步态代偿、鞋底磨损模式',
    observe: '久站容易酸、鞋底单侧磨损、走久了脚底疲劳',
    action: '若伴随明显疼痛或运动后持续不适，可考虑骨科 / 运动医学 / 康复科'
  }
};

const partCard = document.getElementById('partCard');
const partLevel = document.getElementById('partLevel');
const partTitle = document.getElementById('partTitle');
const partSummary = document.getElementById('partSummary');
const partMissed = document.getElementById('partMissed');
const partObserve = document.getElementById('partObserve');
const partAction = document.getElementById('partAction');

function renderPart(partId) {
  const item = partData[partId];
  if (!item) return;
  partLevel.textContent = item.badge;
  partLevel.className = 'part-badge';
  partLevel.classList.add(item.level === 'green' ? 'badge-green' : item.level === 'yellow' ? 'badge-yellow' : 'badge-red');
  partTitle.textContent = item.title;
  partSummary.textContent = item.summary;
  partMissed.textContent = item.missed;
  partObserve.textContent = item.observe;
  partAction.textContent = item.action;
}

document.querySelectorAll('.hotspot').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.hotspot').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderPart(button.dataset.part);
  });
});

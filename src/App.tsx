const navItems = [
  { id: 'head-face', label: '头面部' },
  { id: 'neck-torso', label: '颈肩躯干' },
  { id: 'movement', label: '运动系统' },
  { id: 'system', label: '系统关注' }
]

export default function App() {
  return (
    <main className="app-shell">
      <nav aria-label="健康图鉴分区" className="section-nav">
        {navItems.map((item) => (
          <a href={`#${item.id}`} key={item.id}>
            {item.label}
          </a>
        ))}
      </nav>

      <section className="hero">
        <p className="eyebrow">Cartoon Health Atlas</p>
        <h1>全身健康关注地图</h1>
        <p>
          用卡通科普图梳理常规体检之外容易被忽略的身体关注点。这里提供健康知识，不构成医疗诊断或治疗建议。
        </p>
      </section>
    </main>
  )
}

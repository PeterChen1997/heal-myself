import { AtlasSection } from './components/atlas/AtlasSection'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { SectionNav } from './components/layout/SectionNav'
import { bodyParts } from './data/bodyParts'
import { sections } from './data/sections'
import { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    const targetId = window.location.hash.slice(1)
    if (!targetId) return

    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView()
    })
  }, [])

  return (
    <>
      <Header />
      <SectionNav sections={sections} />
      <main className="app-shell" id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true">
            <div className="hero-orbit" />
            <div className="hero-panel panel-a" />
            <div className="hero-panel panel-b" />
            <div className="hero-panel panel-c" />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Cartoon Health Atlas</p>
            <h1 id="hero-title">全身健康关注地图</h1>
            <p>
              用卡通科普图梳理常规体检之外容易被忽略的身体关注点。图片负责看懂，文字负责边界。
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#head-face">
                开始阅读
              </a>
              <a className="secondary-action" href="#guide">
                查看分级
              </a>
            </div>
          </div>
        </section>

        <div className="atlas-layout">
          <aside className="desktop-rail" aria-label="桌面分区目录">
            {sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>
                {section.title}
              </a>
            ))}
          </aside>
          <div className="atlas-flow">
            {sections.map((section) => (
              <AtlasSection
                key={section.id}
                parts={bodyParts.filter((part) => part.sectionId === section.id)}
                section={section}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

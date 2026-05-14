import { AtlasSection } from './components/atlas/AtlasSection'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { SectionNav } from './components/layout/SectionNav'
import { bodyParts } from './data/bodyParts'
import { sections } from './data/sections'
import { useEffect } from 'react'
import { useScrollSpy } from './hooks/useScrollSpy'
import heroImage from './assets/generated/hero-health-map.webp?url'

export default function App() {
  const sectionIds = sections.map((section) => section.id)
  const activeId = useScrollSpy([...sectionIds, 'guide'])

  useEffect(() => {
    const targetId = window.location.hash.slice(1)
    if (!targetId) return

    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView()
    })
  }, [])

  return (
    <>
      <Header activeId={activeId} />
      <SectionNav activeId={activeId} sections={sections} />
      <main className="app-shell" id="top">
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-art" src={heroImage} alt="" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">Health Atlas</p>
            <h1 aria-label="全身健康关注地图" id="hero-title">
              <span aria-hidden="true">全身健康</span>
              <span aria-hidden="true">关注地图</span>
            </h1>
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
              <a aria-label={`${section.title}桌面目录`} href={`#${section.id}`} key={section.id}>
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

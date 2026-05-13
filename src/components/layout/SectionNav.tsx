import type { AtlasSection } from '../../data/sections'
import { useScrollSpy } from '../../hooks/useScrollSpy'

type SectionNavProps = {
  sections: AtlasSection[]
}

export function SectionNav({ sections }: SectionNavProps) {
  const activeId = useScrollSpy(sections.map((section) => section.id))

  return (
    <nav aria-label="健康图鉴分区" className="section-nav">
      {sections.map((section) => (
        <a
          aria-current={activeId === section.id ? 'true' : undefined}
          href={`#${section.id}`}
          key={section.id}
        >
          <span>{section.shortLabel}</span>
          <strong>{section.title}</strong>
        </a>
      ))}
    </nav>
  )
}

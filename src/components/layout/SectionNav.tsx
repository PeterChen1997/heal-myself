import type { AtlasSection } from '../../data/sections'
type SectionNavProps = {
  activeId: string
  sections: AtlasSection[]
}

export function SectionNav({ activeId, sections }: SectionNavProps) {
  return (
    <nav aria-label="健康图鉴分区" className="section-nav">
      {sections.map((section) => (
        <a
          aria-current={activeId === section.id ? 'true' : undefined}
          href={`#${section.id}`}
          key={section.id}
        >
          {section.title}
        </a>
      ))}
    </nav>
  )
}

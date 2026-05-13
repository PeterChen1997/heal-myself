import type { BodyPart } from '../../data/bodyParts'
import type { AtlasSection as AtlasSectionType } from '../../data/sections'
import { Reveal } from '../motion/Reveal'
import { BodyPartCard } from './BodyPartCard'

type AtlasSectionProps = {
  parts: BodyPart[]
  section: AtlasSectionType
}

export function AtlasSection({ parts, section }: AtlasSectionProps) {
  return (
    <section className={`atlas-section ${section.tone}`} id={section.id}>
      <Reveal className="section-intro">
        <p className="eyebrow">{section.shortLabel}</p>
        <h2>{section.title}</h2>
        <p>{section.summary}</p>
      </Reveal>
      <div className="part-list">
        {parts.map((part) => (
          <Reveal key={part.id}>
            <BodyPartCard part={part} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

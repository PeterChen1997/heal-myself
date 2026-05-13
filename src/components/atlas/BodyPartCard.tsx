import type { BodyPart } from '../../data/bodyParts'
import { ExpandableDetails } from './ExpandableDetails'
import { GradeAdvice } from './GradeAdvice'
import { PartImage } from './PartImage'

type BodyPartCardProps = {
  part: BodyPart
}

export function BodyPartCard({ part }: BodyPartCardProps) {
  return (
    <article className={`part-card ${part.priority}`} id={`part-${part.id}`}>
      <div className="part-media">
        <PartImage fileName={part.images.principle} title={part.name} />
        {part.images.lifestyle ? (
          <PartImage fileName={part.images.lifestyle} title={part.name} variant="lifestyle" />
        ) : null}
      </div>
      <div className="part-copy">
        <p className="part-kicker">{part.priority === 'featured' ? '重点图鉴' : '轻量图鉴'}</p>
        <h3>{part.name}</h3>
        <p className="tagline">{part.tagline}</p>
        <p className="summary">{part.summary}</p>
        <GradeAdvice part={part} />
        <ExpandableDetails part={part} />
      </div>
    </article>
  )
}

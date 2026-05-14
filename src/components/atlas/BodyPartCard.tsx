import type { BodyPart } from '../../data/bodyParts'
import { ExpandableDetails } from './ExpandableDetails'
import { GradeAdvice } from './GradeAdvice'
import { PartImage } from './PartImage'

type BodyPartCardProps = {
  part: BodyPart
}

export function BodyPartCard({ part }: BodyPartCardProps) {
  const lifestyleImage = part.images.lifestyle ?? part.images.principle

  return (
    <article className={`part-card ${part.priority}`} id={`part-${part.id}`}>
      <div className="part-overview-row">
        <figure className="image-panel lifestyle-panel">
          <PartImage fileName={lifestyleImage} title={part.name} variant="lifestyle" />
          <figcaption>生活示意图</figcaption>
        </figure>
        <div className="part-intro">
          <p className="part-kicker">{part.priority === 'featured' ? '重点图鉴' : '快速图鉴'}</p>
          <h3>{part.name}</h3>
          <p className="tagline">{part.tagline}</p>
          <div className="why-block">
            <span>为什么关注</span>
            <p>{part.summary}</p>
          </div>
        </div>
      </div>

      <div className="part-science-row">
        <div className="part-copy">
          <GradeAdvice part={part} />
          <ExpandableDetails part={part} />
        </div>
        <figure className="image-panel principle-panel">
          <PartImage fileName={part.images.principle} title={part.name} />
          <figcaption>科普原理图</figcaption>
        </figure>
      </div>
    </article>
  )
}

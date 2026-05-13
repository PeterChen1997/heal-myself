import type { BodyPart } from '../../data/bodyParts'

type ExpandableDetailsProps = {
  part: BodyPart
}

export function ExpandableDetails({ part }: ExpandableDetailsProps) {
  return (
    <details className="part-details">
      <summary>可以咨询哪个科室</summary>
      <div className="dept-tags">
        {part.departments.map((department) => (
          <span key={department}>{department}</span>
        ))}
      </div>
    </details>
  )
}

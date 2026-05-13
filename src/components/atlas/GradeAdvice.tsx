import type { BodyPart } from '../../data/bodyParts'

const gradeLabels = {
  green: '日常怎么看',
  yellow: '症状就诊',
  red: '不盲目做'
}

type GradeAdviceProps = {
  part: BodyPart
}

export function GradeAdvice({ part }: GradeAdviceProps) {
  return (
    <div className="advice-grid">
      <article className="advice-card green">
        <span>{gradeLabels.green}</span>
        <p>{part.dailyObservation}</p>
      </article>
      <article className="advice-card yellow">
        <span>{gradeLabels.yellow}</span>
        <p>{part.whenToCheck}</p>
      </article>
      {part.dontDoBlindly ? (
        <article className="advice-card red">
          <span>{gradeLabels.red}</span>
          <p>{part.dontDoBlindly}</p>
        </article>
      ) : null}
    </div>
  )
}

type PartImageProps = {
  fileName: string
  title: string
  variant?: 'principle' | 'lifestyle'
}

const imageModules = import.meta.glob('../../assets/generated/*', {
  eager: true,
  import: 'default',
  query: '?url'
}) as Record<string, string>

export function PartImage({ fileName, title, variant = 'principle' }: PartImageProps) {
  const src = imageModules[`../../assets/generated/${fileName}`]

  if (src) {
    return (
      <img
        alt={`${title}${variant === 'principle' ? '科普原理图' : '生活观察示意图'}`}
        className="part-image"
        loading="lazy"
        src={src}
      />
    )
  }

  return (
    <div
      aria-label={`${title}${variant === 'principle' ? '科普原理图' : '生活观察示意图'}`}
      className={`part-image fallback-art ${variant}`}
      role="img"
    >
      <span className="art-orbit" />
      <span className="art-card primary" />
      <span className="art-card secondary" />
      <span className="art-bubble" />
    </div>
  )
}

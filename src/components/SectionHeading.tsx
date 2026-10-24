type SectionHeadingProps = {
  kicker: string
  title: string
  copy?: string
  light?: boolean
}

export default function SectionHeading({ kicker, title, copy, light = false }: SectionHeadingProps) {
  return <div className={`section-heading${light ? ' section-heading-light' : ''}`}><span className="eyebrow">{kicker}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}

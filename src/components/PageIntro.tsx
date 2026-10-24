import type { ReactNode } from 'react'

type PageIntroProps = {
  kicker: string
  title: ReactNode
  copy: string
  children?: ReactNode
}

export default function PageIntro({ kicker, title, copy, children }: PageIntroProps) {
  return <section className="page-intro page-wrap"><span className="eyebrow"><span className="status-dot" />{kicker}</span><h1>{title}</h1><p>{copy}</p>{children}</section>
}

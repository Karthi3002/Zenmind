import { useEffect } from 'react'

type PageMetaProps = {
  title: string
  description: string
}

export default function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    document.title = `${title} | Zenmind Technologies`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])

  return null
}

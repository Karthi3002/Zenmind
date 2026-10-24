import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return <article className={`project-card ${project.className}`}><div className="project-image"><img src={`https://images.unsplash.com/${project.image}?auto=format&fit=crop&w=1100&q=82`} alt={`${project.name} project visual`} loading="lazy" /><span className="project-year">{project.year}</span><span className="project-open" aria-hidden="true"><ArrowUpRight size={18} /></span></div><div className="project-meta"><div><h3>{project.name}</h3><p>{project.type}</p></div><span>{project.category}</span></div></article>
}

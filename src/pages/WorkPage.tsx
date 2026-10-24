import { useState } from 'react'
import PageIntro from '../components/PageIntro'
import PageMeta from '../components/PageMeta'
import ProjectCard from '../components/ProjectCard'
import { workCategories } from '../data/homeContent'
import { projects } from '../data/projects'
import CtaBand from '../components/CtaBand'

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const filteredProjects = activeCategory === 'All' ? projects : projects.filter((project) => project.category === activeCategory)

  return <><PageMeta title="Selected work" description="A selection of placeholder projects across digital products, brand, mobile, web, and AI." /><PageIntro kicker="A WORK IN PROGRESS, IN THE BEST WAY" title={<>A few possible<br /><em>next chapters.</em></>} copy="A little placeholder gallery for the good things we’ll make together. Project examples and details will be added here." /><section className="portfolio-section page-wrap section-pad"><div className="portfolio-toolbar"><span className="eyebrow">SELECTED PROJECTS <span className="project-count">{String(filteredProjects.length).padStart(2, '0')}</span></span><div className="filter-list" role="group" aria-label="Filter projects by category">{workCategories.map((category) => <button type="button" key={category} className={activeCategory === category ? 'filter-button active' : 'filter-button'} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}</div></div><div className="portfolio-grid">{filteredProjects.map((project) => <ProjectCard project={project} key={project.name} />)}</div><div className="placeholder-footnote"><span className="tiny-star">✳</span> Project names and imagery shown here are placeholders, ready for your real work.</div></section><CtaBand /></>
}

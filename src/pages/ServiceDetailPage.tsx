import { ArrowUpRight, Check } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import CtaBand from '../components/CtaBand'
import PageMeta from '../components/PageMeta'
import { services } from '../data/services'
import NotFoundPage from './NotFoundPage'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = services.find((item) => item.slug === slug)
  if (!service) return <NotFoundPage />
  const Icon = service.icon

  return <><PageMeta title={service.title} description={service.short} /><section className="service-hero"><img className="service-hero-image service-hero-image-dark" src={`/assets/${service.heroImage}`} alt="" aria-hidden="true" /><img className="service-hero-image service-hero-image-light" src={`/assets/${service.heroImageLight}`} alt="" aria-hidden="true" /><div className="service-hero-overlay" /><div className="service-hero-inner page-wrap"><div className="service-hero-content"><span className={`detail-icon service-${service.color}`}><Icon size={25} /></span><span className="eyebrow">BUILT AROUND YOUR NEXT MOVE</span><h1>{service.intro.slice(0, -service.introEmphasis.length)}<em>{service.introEmphasis}</em></h1><p>{service.short} We bring strategy, design, and engineering together to make the right thing, the right way.</p><Link className="button button-dark" to="/contact">Talk about your project <ArrowUpRight size={16} /></Link></div><div className="service-hero-mark" aria-hidden="true">{String(services.indexOf(service) + 1).padStart(2, '0')}</div></div></section><section className="offerings-section"><div className="page-wrap offerings-inner"><div><span className="eyebrow">WHAT’S INCLUDED</span><h2>Thoughtfully considered.<br /><em>Built to work.</em></h2></div><ul>{service.offerings.map((item, index) => <li key={item}><span className="offering-check"><Check size={14} /></span><span>{item}</span><span className="offering-number">{String(index + 1).padStart(2, '0')}</span></li>)}</ul></div></section><section className="service-next page-wrap"><span className="eyebrow">A CONNECTED SET OF SKILLS</span><h2>Different disciplines.<br /><em>One clear direction.</em></h2><div className="related-services">{services.filter((item) => item.slug !== service.slug).slice(0, 3).map((item) => <Link to={`/services/${item.slug}`} key={item.slug}>{item.title}<ArrowUpRight size={15} /></Link>)}</div></section><CtaBand /></>
}

import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'

type SiteFooterProps = {
  theme: string
}

const currentYear = new Date().getFullYear()

export default function SiteFooter({ theme }: SiteFooterProps) {
  return <footer className="site-footer"><div className="footer-main page-wrap">
    <div className="footer-brand"><Link className="wordmark" to="/" aria-label="ZenMind Technologies home"><img src={theme === 'dark' ? '/assets/black%20theme%20text.svg' : '/assets/white%20theme%20text.svg'} alt="" /></Link></div>
    <div className="footer-column"><span className="footer-label">Explore</span><Link to="/about">About us</Link><Link to="/#services">Services</Link><Link to="/work">Selected work</Link><Link to="/contact">Contact</Link></div>
    <div className="footer-column"><span className="footer-label">What we do</span>{services.map((service) => <Link key={service.slug} to={`/services/${service.slug}`}>{service.title}</Link>)}</div>
    <div className="footer-contact"><span className="footer-label">Start a conversation</span><Link className="footer-email" to="/contact">Tell us what you have in mind <ArrowUpRight size={15} /></Link><p>We’ll get back to you within one business day.</p></div>
  </div><div className="footer-bottom page-wrap"><span>© {currentYear} Zenmind Technologies</span><span>Thoughtfully made, from first thought to final pixel.</span></div></footer>
}

import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CtaBand() {
  return <section className="cta-band" id="contact"><div className="page-wrap cta-inner"><span className="eyebrow">A GOOD PLACE TO BEGIN</span><div className="cta-copy"><h2>Have an idea?<br /><em>Let’s make it real.</em></h2><p>Tell us about your project and we’ll get back to you within one business day.</p><Link className="button button-light" to="/contact">Get a free consultation <ArrowUpRight size={16} /></Link></div><span className="cta-orbit" aria-hidden="true"><span className="cta-3d">Z.</span></span></div></section>
}

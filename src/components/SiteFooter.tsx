import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'
import { WhatsAppIcon, InstagramIcon, LinkedInIcon } from './SocialIcons'

type SiteFooterProps = {
  theme?: string
}

const currentYear = new Date().getFullYear()

export default function SiteFooter(_props: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-main page-wrap">
        <div className="footer-brand">
          <Link className="wordmark" to="/" aria-label="ZenMind Technologies home">
            <img src="/assets/white%20logo.png" alt="" />
          </Link>
          <p className="footer-brand-desc">Technology that thinks clearly. Products that perform.</p>
          <div className="social-links" aria-label="Social media links">
            <a
              href="https://wa.me/919944270322?text=Hi%20Zenmind%20Technologies!%20I'm%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20a%20project.%20Could%20you%20please%20get%20back%20to%20me%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn social-whatsapp"
              aria-label="WhatsApp"
              title="Chat with us on WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            <a
              href="https://www.instagram.com/zenmindtech?dlrf=eG16b21zNXQ5ZWxo"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn social-instagram"
              aria-label="Instagram"
              title="Follow us on Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/zenmind-technologies-8999b7447/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn social-linkedin"
              aria-label="LinkedIn"
              title="Connect on LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
        <div className="footer-column">
          <span className="footer-label">Explore</span>
          <Link to="/about">About us</Link>
          <Link to="/#services">Services</Link>
          <Link to="/work">Selected work</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-column">
          <span className="footer-label">What we do</span>
          {services.map((service) => (
            <Link key={service.slug} to={`/services/${service.slug}`}>
              {service.title}
            </Link>
          ))}
        </div>
        <div className="footer-contact">
          <span className="footer-label">Start a conversation</span>
          <a className="footer-email" href="mailto:zenmindtech@gmail.com?subject=Project%20Enquiry%20%E2%80%93%20Zenmind%20Technologies&body=Hi%20Zenmind%20Team%2C%0A%0AI'm%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20a%20project%20with%20you.%0A%0APlease%20get%20back%20to%20me%20at%20your%20earliest%20convenience.%0A%0AThank%20you!">
            zenmindtech@gmail.com <ArrowUpRight size={15} />
          </a>
          <p>
            5/1, TNHB Colony, Alagu Nagar,<br />
            Sowbakya nagar, Coimbatore,<br />
            Tamil Nadu 641014
          </p>
        </div>
      </div>
      <div className="footer-bottom page-wrap">
        <span>© {currentYear} Zenmind Technologies</span>
        <span>Thoughtfully made, from first thought to final pixel.</span>
      </div>
    </footer>
  )
}

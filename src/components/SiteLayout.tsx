import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'
import { LOADER_CONFIG, loaderController } from '../utils/loaderController'

type SiteLayoutProps = {
  theme: string
  onThemeToggle: () => void
  children: ReactNode
}

export default function SiteLayout({ theme, onThemeToggle, children }: SiteLayoutProps) {
  const location = useLocation()
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Scroll to top and optionally trigger route change loader if configured
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (LOADER_CONFIG.SHOW_LOADER_ON_ROUTE_CHANGE) {
      loaderController.triggerRouteChangeLoader()
    }
  }, [location.pathname])

  // Hash-based smooth scrolling
  useEffect(() => {
    if (!location.hash) return
    const timeout = window.setTimeout(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 50)
    return () => window.clearTimeout(timeout)
  }, [location.hash, location.pathname])

  // Back to top button visibility check
  useEffect(() => {
    const updateBackToTopVisibility = () => {
      const scrollTop = window.scrollY
      const pageHeight = document.documentElement.scrollHeight
      const reachedBottom = scrollTop > 0 && scrollTop + window.innerHeight >= pageHeight - 48
      setShowBackToTop(reachedBottom)
    }
    window.addEventListener('scroll', updateBackToTopVisibility, { passive: true })
    window.addEventListener('resize', updateBackToTopVisibility)
    return () => {
      window.removeEventListener('scroll', updateBackToTopVisibility)
      window.removeEventListener('resize', updateBackToTopVisibility)
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader key={location.pathname} theme={theme} onThemeToggle={onThemeToggle} />
      <main id="main-content">{children}</main>
      <SiteFooter theme={theme} />
      <div className="floating-actions">
        {showBackToTop && (
          <button
            className="back-to-top"
            type="button"
            aria-label="Back to top"
            title="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUp size={19} aria-hidden="true" />
          </button>
        )}
        <Link className="floating-contact" to="/contact" aria-label="Talk with our team">
          <MessageCircle size={19} />
          <span>Let’s talk</span>
        </Link>
      </div>
    </>
  )
}

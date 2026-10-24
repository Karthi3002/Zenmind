import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

type SiteLayoutProps = {
  theme: string
  onThemeToggle: () => void
  children: ReactNode
}

export default function SiteLayout({ theme, onThemeToggle, children }: SiteLayoutProps) {
  const location = useLocation()
  const [loadedPath, setLoadedPath] = useState<string | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const isLoading = loadedPath !== location.pathname

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timeout = window.setTimeout(() => setLoadedPath(location.pathname), prefersReducedMotion ? 120 : 2800)
    return () => window.clearTimeout(timeout)
  }, [location.pathname])

  useEffect(() => {
    if (!location.hash || loadedPath !== location.pathname) return
    const timeout = window.setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    return () => window.clearTimeout(timeout)
  }, [loadedPath, location.hash, location.pathname])

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

  if (isLoading) {
    const loaderLogo = theme === 'dark' ? '/assets/black%20theme%20logo.svg' : '/assets/white%20theme%20logo.svg'
    return <div className="page-loader" role="status" aria-label="Loading page"><div className="page-loader-mark" aria-hidden="true"><img className="page-loader-outline" src={loaderLogo} alt="" /><img className="page-loader-fill" src={loaderLogo} alt="" /></div></div>
  }

  return <><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader key={location.pathname} theme={theme} onThemeToggle={onThemeToggle} /><main id="main-content">{children}</main><SiteFooter theme={theme} /><div className="floating-actions">{showBackToTop && <button className="back-to-top" type="button" aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={19} aria-hidden="true" /></button>}<Link className="floating-contact" to="/contact" aria-label="Talk with our team"><MessageCircle size={19} /><span>Let’s talk</span></Link></div></>
}

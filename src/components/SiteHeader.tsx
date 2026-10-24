import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

type SiteHeaderProps = {
  theme: string
  onThemeToggle: () => void
}

export default function SiteHeader({ theme, onThemeToggle }: SiteHeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector<HTMLElement>('a, button')?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuToggleRef.current?.focus()
      }
      if (event.key !== 'Tab' || !menuRef.current) return
      const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    const closeOnDesktop = () => {
      if (window.innerWidth > 900) setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', closeOnDesktop)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', closeOnDesktop)
    }
  }, [menuOpen])

  useEffect(() => {
    if (location.pathname !== '/') return
    const sectionIds = ['top', 'about', 'services', 'work', 'contact']
    const sections = sectionIds.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => section !== null)
    if (!sections.length) return

    const updateActiveSection = () => {
      const viewportAnchor = window.innerHeight * 0.3
      const active = sections.find((section) => {
        const bounds = section.getBoundingClientRect()
        return bounds.top <= viewportAnchor && bounds.bottom > viewportAnchor
      })
      const nextActiveSection = active?.id ?? ''
      setActiveSection(nextActiveSection)
      const nextHash = nextActiveSection && nextActiveSection !== 'top' ? `#${nextActiveSection}` : ''
      if (window.location.hash !== nextHash) {
        window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}${nextHash}`)
      }
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [location.pathname])

  const isSectionActive = (section: string) => {
    if (section === 'about' && location.pathname === '/about') return true
    if (section === 'services' && location.pathname.startsWith('/services')) return true
    if (section === 'work' && location.pathname === '/work') return true
    if (section === 'contact' && location.pathname === '/contact') return true
    return location.pathname === '/' && activeSection === section
  }
  const navLinkClass = (section: string) => `nav-section-link${isSectionActive(section) ? ' active' : ''}`
  const closeMenu = () => setMenuOpen(false)
  const handleSectionNavigation = (event: ReactMouseEvent<HTMLAnchorElement>, section: string) => {
    event.preventDefault()
    closeMenu()
    const hash = section === 'top' ? '' : `#${section}`
    if (location.pathname === '/' && (section === 'top' || window.location.hash === hash)) {
      if (section === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
      else document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    navigate(`/${hash}`)
  }
  const navigation = <nav ref={menuRef} id="mobile-navigation" className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
    <div className="mobile-menu-heading"><span className="eyebrow">NAVIGATION</span><span className="mobile-menu-accent">A thoughtful digital partner</span></div>
    <Link className={navLinkClass('top')} to="/" onClick={(event) => handleSectionNavigation(event, 'top')} aria-current={isSectionActive('top') ? 'location' : undefined}>Home</Link>
    <Link className={navLinkClass('about')} to="/#about" onClick={(event) => handleSectionNavigation(event, 'about')} aria-current={isSectionActive('about') ? 'location' : undefined}>About</Link>
    <Link className={navLinkClass('services')} to="/#services" onClick={(event) => handleSectionNavigation(event, 'services')} aria-current={isSectionActive('services') ? 'location' : undefined}>Services</Link>
    <Link className={navLinkClass('work')} to="/#work" onClick={(event) => handleSectionNavigation(event, 'work')} aria-current={isSectionActive('work') ? 'location' : undefined}>Selected work</Link>
    <Link className={navLinkClass('contact')} to="/#contact" onClick={(event) => handleSectionNavigation(event, 'contact')} aria-current={isSectionActive('contact') ? 'location' : undefined}>Contact</Link>
    <button className="theme-toggle icon-button" type="button" onClick={onThemeToggle} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}<span>Switch to {theme === 'light' ? 'dark' : 'light'} theme</span></button>
    <Link className="button button-dark nav-cta" to="/#contact" onClick={(event) => handleSectionNavigation(event, 'contact')}>Get a free quote <ArrowUpRight size={15} /></Link>
    <div className="mobile-menu-footnote"><span className="status-dot" />Thoughtful work starts with a conversation.</div>
  </nav>

  return <header className="site-header"><div className="header-inner">
    <Link className="wordmark" to="/" onClick={closeMenu} aria-label="ZenMind Technologies home"><img src={theme === 'dark' ? '/assets/black%20theme%20text.svg' : '/assets/white%20theme%20text.svg'} alt="" /></Link>
    <button ref={menuToggleRef} className="menu-toggle icon-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
    {!menuOpen && navigation}
  </div>{menuOpen && createPortal(<><button className="mobile-menu-backdrop" type="button" aria-label="Close navigation menu" onClick={closeMenu} />{navigation}</>, document.body)}</header>
}

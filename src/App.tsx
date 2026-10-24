import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import WorkPage from './pages/WorkPage'
import './zenmind.css'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => window.localStorage.getItem('zenmind-theme') === 'light' ? 'light' : 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('zenmind-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101e2a' : '#f6f9fc')
  }, [theme])

  return <div className="app-shell">
    <SiteLayout theme={theme} onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<Navigate to="/#services" replace />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  </div>
}

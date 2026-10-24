import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return <section className="not-found page-wrap"><span className="eyebrow">404 — THIS PAGE ISN’T HERE</span><h1>Let’s find<br /><em>our way back.</em></h1><Link className="button button-dark" to="/">Back to home <ArrowLeft size={16} /></Link></section>
}

import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CtaBand from '../components/CtaBand'
import PageIntro from '../components/PageIntro'
import PageMeta from '../components/PageMeta'
import SectionHeading from '../components/SectionHeading'
import { aboutValues } from '../data/homeContent'

export default function AboutPage() {
  return <>
    <PageMeta title="About us" description="Meet Zenmind Technologies, a calm, focused team of builders, designers, and problem-solvers." />
    <PageIntro
      kicker="A LITTLE ABOUT US"
      title={<>We’re Zenmind:<br /><em>builders, designers,</em><br />and problem-solvers.</>}
      copy="We help startups, growing businesses, and enterprises build powerful digital products, with focus, calm, and clarity of mind."
    />
    <section className="about-story page-wrap section-pad">
      <div className="about-image">
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85" alt="A small creative team collaborating around a table" loading="lazy" />
        <span>GOOD WORK IS A TEAM SPORT.</span>
      </div>
      <div className="about-copy">
        <span className="eyebrow">HOW WE SEE IT</span>
        <h2>Thoughtful work.<br /><em>Real-world impact.</em></h2>
        <p>Zenmind Technologies is a technology and design company that helps startups, growing businesses, and enterprises build powerful digital products. Our name reflects how we work: with focus, calm, and clarity of mind.</p>
        <p>We bring together developers, designers, and AI specialists who care about craft. Whether you need a polished website, a full mobile app, or an AI agent that automates your operations, we treat your product as if it were our own.</p>
        <Link className="text-link" to="/#services">What we can make together <ArrowRight size={15} /></Link>
      </div>
    </section>
    <section className="purpose-section">
      <div className="page-wrap purpose-grid">
        <article className="purpose-card">
          <div className="purpose-card-top"><span className="eyebrow">OUR MISSION</span><span className="purpose-number">01</span></div>
          <h2>Make progress<br />feel possible.</h2>
          <p>To help businesses grow through thoughtful design and dependable technology.</p>
        </article>
        <article className="purpose-card">
          <div className="purpose-card-top"><span className="eyebrow">OUR VISION</span><span className="purpose-number">02</span></div>
          <h2>A partner you<br />can count on.</h2>
          <p>To be a trusted technology partner known for clarity, quality, and innovation.</p>
        </article>
      </div>
    </section>
    <section className="values-section page-wrap section-pad">
      <SectionHeading kicker="WHAT WE BELIEVE" title="A few things we hold close." />
      <div className="values-row">
        {aboutValues.map((value, index) => <span key={value}><i>0{index + 1}</i>{value}</span>)}
      </div>
    </section>
    <section className="team-placeholder">
      <div className="page-wrap team-placeholder-inner">
        <span className="eyebrow">THE PEOPLE BEHIND THE WORK</span>
        <h2>Good work comes<br /><em>from good people.</em></h2>
        <p>Team introductions and portraits will find their home here.</p>
        <span className="placeholder-note">TEAM PORTRAITS — COMING SOON</span>
      </div>
    </section>
    <CtaBand />
  </>
}

import { useState, type FormEvent } from 'react'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import PageIntro from '../components/PageIntro'
import PageMeta from '../components/PageMeta'
import { WhatsAppIcon, InstagramIcon, LinkedInIcon } from '../components/SocialIcons'
import { services } from '../data/services'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    setSubmitted(true)
    form.reset()
  }

  return (
    <>
      <PageMeta
        title="Contact"
        description="Tell Zenmind Technologies about your project. Our team aims to respond within one business day."
      />
      <PageIntro
        kicker="LET’S MAKE A GOOD THING"
        title={
          <>
            Let’s talk about<br />
            <em>your project.</em>
          </>
        }
        copy="Share a few details and our team will respond within one business day."
      />
      <section className="contact-section page-wrap">
        <div className="contact-form-column">
          {submitted ? (
            <div className="form-success" role="status">
              <span className="success-icon">
                <Check size={23} />
              </span>
              <span className="eyebrow">THANK YOU FOR REACHING OUT</span>
              <h2>
                Your note is ready<br />
                <em>for the next step.</em>
              </h2>
              <p>
                Thank you for your message. We have received your note and will get back to you within one business day.
              </p>
              <button className="text-link" type="button" onClick={() => setSubmitted(false)}>
                Send another message <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-intro">
                <span className="eyebrow">TELL US A LITTLE ABOUT IT</span>
                <span className="required-note">* REQUIRED</span>
              </div>
              <div className="form-row">
                <label>
                  <span className="field-label">
                    Name <span>*</span>
                  </span>
                  <input name="name" autoComplete="name" required placeholder="Your name" />
                </label>
                <label>
                  <span className="field-label">
                    Email <span>*</span>
                  </span>
                  <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  <span className="field-label">Phone</span>
                  <input name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
                </label>
                <label>
                  <span className="field-label">
                    Service interested in <span>*</span>
                  </span>
                  <select name="service" required defaultValue="">
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map((service) => (
                      <option value={service.title} key={service.slug}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                <span className="field-label">
                  Project details <span>*</span>
                </span>
                <textarea
                  name="details"
                  required
                  rows={5}
                  placeholder="What are you hoping to make? A little context goes a long way."
                />
              </label>
              <div className="form-submit-row">
                <button className="button button-dark" type="submit">
                  Send message <ArrowUpRight size={16} />
                </button>
                <span>By sending this, you agree to be contacted about your enquiry.</span>
              </div>
            </form>
          )}
        </div>
        <aside className="contact-aside">
          <div className="contact-details">
            <span className="eyebrow">THE SHORT VERSION</span>
            <div className="contact-detail">
              <span>Email</span>
              <a href="mailto:zenmindtech@gmail.com?subject=Project%20Enquiry%20%E2%80%93%20Zenmind%20Technologies&body=Hi%20Zenmind%20Team%2C%0A%0AI'm%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20a%20project%20with%20you.%0A%0APlease%20get%20back%20to%20me%20at%20your%20earliest%20convenience.%0A%0AThank%20you!">
                zenmindtech@gmail.com <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="contact-detail contact-location">
              <span>Location</span>
              <p>
                5/1, TNHB Colony, Alagu Nagar,<br />
                Sowbakya nagar, Coimbatore,<br />
                Tamil Nadu 641014
              </p>
            </div>
            <div className="contact-detail contact-socials">
              <span>Connect</span>
              <div className="social-links" aria-label="Social media channels">
                <a
                  href="https://wa.me/919944270322?text=Hi%20Zenmind%20Technologies!%20I'm%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20a%20project.%20Could%20you%20please%20get%20back%20to%20me%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn social-whatsapp"
                  aria-label="WhatsApp"
                  title="WhatsApp"
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
            <div className="contact-response">
              <span className="status-dot" />
              <p>
                We typically reply within<br />
                <strong>one business day.</strong>
              </p>
            </div>
          </div>
          <div className="map-frame" aria-label="Google Maps satellite view of Zenmind Technologies location">
            <iframe
              title="Satellite map of Zenmind Technologies in Coimbatore"
              src="https://maps.google.com/maps?hl=en&q=5%2F1%2C%20TNHB%20Colony%2C%20Alagu%20Nagar%2C%20Sowbakya%20Nagar%2C%20Coimbatore%2C%20Tamil%20Nadu%20641014&t=k&z=17&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className="map-link" href="https://maps.app.goo.gl/ibLfLtJkuwRShJTp8" target="_blank" rel="noreferrer">
              Open in Google Maps <ArrowUpRight size={14} />
            </a>
          </div>
        </aside>
      </section>
    </>
  )
}

import { useState } from 'react'
import CipherButton from './CipherButton.jsx'
import { useLanguage } from '../i18n.jsx'
import TypeText from './TypeText.jsx'
import { FaWhatsapp } from 'react-icons/fa6'
import { WHATSAPP_NUMBER } from '../socials.jsx'


export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', message: '' })

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    const lines = [
      `✅ الاسم: ${form.name}`,
      `✅ الفكرة: ${form.message}`
    ]
    const text = encodeURIComponent(lines.join('\n'))

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer')

    setForm({ name: '', message: '' })
  }

  return (
    <section id="contact">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2><TypeText text={t.contact.heading} /></h2>
          <p>{t.contact.sub}</p>
        </div>
        <div className="contact-grid reveal">
          <div className="contact-info">
            <h3>{t.contact.startHeading}</h3>
            <p>{t.contact.startDesc}</p>
            <div className="contact-links eng">
              <a href="mailto:moncodedevlopment@gmail.com">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><path d="M3 6h18v12H3z" /><path d="m3 7 9 6 9-6" /></svg>
                moncodedevlopment
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="social-ico" aria-hidden="true" />
                {t.contact.whatsapp}
              </a>
              <a href={`tel:+${WHATSAPP_NUMBER}`}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
                <span dir="ltr">+20 109 570 3839</span>
              </a>
            </div>
          </div>

          {/* Email field removed — submitting now opens WhatsApp with
              a pre-filled message (name + idea) instead of collecting
              an email address, so there's no formStatus text either:
              the WhatsApp app/tab opening IS the confirmation. */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={t.contact.formName}
              required
              value={form.name}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder={t.contact.formMessage}
              required
              value={form.message}
              onChange={handleChange}
            ></textarea>
            <CipherButton as="button" type="submit" text={t.contact.formSubmit} />
          </form>
        </div>
      </div>
    </section>
  )
}
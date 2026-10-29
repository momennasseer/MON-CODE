import { useEffect, useState } from 'react'
import CipherButton from './CipherButton.jsx'
import { useLanguage } from '../i18n.jsx'
import { SOCIALS, SocialLink } from '../socials.jsx'

// The site is deployed under a sub-path on GitHub Pages
// (https://<user>.github.io/MON-CODE/), so a raw "/hero-photo.webp"
// string always resolves from the domain root and 404s there.
// Prefixing with Vite's BASE_URL (set to "/MON-CODE/" in
// vite.config.js) fixes it for both dev (BASE_URL is "/") and this
// production build.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const withBase = path => `${BASE}${path.startsWith('/') ? path : `/${path}`}`

export default function Hero({ ready }) {
  const { t, lang } = useLanguage()
  const roles = t.hero.roles
  const [roleIndex, setRoleIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    setRoleIndex(0)
    setTyped('')
    setDeleting(false)
  }, [roles])

  useEffect(() => {
    const current = roles[roleIndex % roles.length]
    const speed = deleting ? 28 : 55
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, typed.length + 1)
        setTyped(next)
        if (next === current) {
          setTimeout(() => setDeleting(true), 1200)
        }
      } else {
        const next = current.slice(0, typed.length - 1)
        setTyped(next)
        if (next === '') {
          setDeleting(false)
          setRoleIndex((i) => (i + 1) % roles.length)
        }
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [typed, deleting, roleIndex, roles])

  return (
    <section className="hero hero-v2">
      <div className={`wrap hero-grid ${ready ? 'in' : ''}`}>
        <div className="hero-text">
          <p className="hero-eyebrow">{t.hero.eyebrow}</p>
          <h1 className="hero-name eng">{t.hero.name}</h1>
          <p className="hero-role">
            {t.hero.roleIntro} <span className="hero-typed">{typed}</span>
            <span className="hero-cursor">|</span>
          </p>
          <p className="hero-desc">{t.hero.desc}</p>
          <div className="hero-social">
            {SOCIALS.map((s) => (
              <SocialLink key={s.label} social={s} />
            ))}
          </div>
          <div className="hero-actions">
            <CipherButton as="a" href="#work" text={t.hero.ctaWork} />
            <a href="#contact" className="btn-ghost">{t.hero.ctaQuote}</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-blob"></div>
          <div className="hero-logo-circle">
            <img src={withBase('/hero-photo.webp')} alt="MØN CODE" className="hero-photo" width="900" height="900" fetchpriority="high" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  )
}
import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n.jsx'

export default function Header() {
  const { lang, toggleLang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const LINKS = [
    { href: '#services', label: t.nav.services },
    { href: '#work', label: t.nav.work },
    { href: '#stack', label: t.nav.stack },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <header id="siteHeader" className={scrolled ? 'scrolled' : ''}>
      <div className="wrap navbar-pill">
        <nav id="siteNav" className={navOpen ? 'open' : ''}>
          <ul>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setNavOpen(false)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#top" className="brand">
          <img src={`${import.meta.env.BASE_URL}logo.webp`} alt="" width="40" height="40" className="brand-logo" />
          <span className="brand-name eng">MØN CODE</span>
        </a>

        <div className="header-right">
          <button className="lang-toggle eng" onClick={toggleLang} aria-label="Switch language">
            <span className={lang === 'ar' ? 'active' : ''}>AR</span>
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
          </button>
          <a href="#contact" className="header-cta">{t.header.cta}</a>
        </div>

        <button
          className="nav-toggle"
          aria-label={t.header.menuLabel}
          onClick={() => setNavOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}
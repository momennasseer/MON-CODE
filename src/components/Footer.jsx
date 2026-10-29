import { useLanguage } from '../i18n.jsx'
import { SOCIALS, SocialLink } from '../socials.jsx'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer>
      {/* was missing the `reveal` class entirely — that's why the
          footer used to just appear instantly with no entrance
          animation while every other section fades in on scroll. */}
      <div className="wrap reveal">
        <a href="#top" className="brand-name eng">MØN <span style={{ color: 'var(--chrome-hi)' }}>CODE</span></a>
        <p className="footer-note">© 2026 MØN CODE. {t.footer.rights}</p>
        <div className="footer-social">
          {SOCIALS.map((s) => (
            <SocialLink key={s.label} social={s} />
          ))}
        </div>
      </div>
    </footer>
  )
}
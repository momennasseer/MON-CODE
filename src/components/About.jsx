import { useLanguage } from '../i18n.jsx'
import { FiZap, FiLayers, FiHeadphones } from 'react-icons/fi'

// Maps each point's label (as it appears in i18n.jsx, t.about.points)
// to an icon. Add an entry here if a new point label is ever added.
const POINT_ICONS = {
  FAST: FiZap,
  SCALABLE: FiLayers,
  SUPPORTED: FiHeadphones
}

export default function About() {
  const { t } = useLanguage()
  return (
    <section id="about">
      <div className="wrap">
        <div className="about-grid">
          <div className="reveal about-text">
            <p className="about-quote">{t.about.quote}</p>
            <p style={{ marginTop: 24 }}>{t.about.body}</p>
          </div>

          <div className="about-points reveal">
            {t.about.points.map((p, i) => {
              const Icon = POINT_ICONS[p.label] || FiZap
              return (
                <div className="about-point" key={p.label}>
                  <div className="about-point-icon">
                    <Icon />
                  </div>
                  <div className="about-point-body">
                    <div className="about-point-head">
                      <h4 className="eng">{p.label}</h4>
                      <span className="about-point-index eng">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p>{p.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
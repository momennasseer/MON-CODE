import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../i18n.jsx'
import CardSwap, { Card } from './CardSwap'
import FoldText from './FoldText'
import WinkEmoji from './WinkEmoji'
import TypeText from './TypeText.jsx'

// The site is deployed under a sub-path on GitHub Pages
// (https://<user>.github.io/MON-CODE/), so a raw "/work-1.webp" string
// in i18n.jsx always resolves from the domain root and 404s. Prefixing
// with Vite's BASE_URL (which vite.config.js sets to "/MON-CODE/")
// fixes it for both dev (BASE_URL is "/") and this production build.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const withBase = path => `${BASE}${path.startsWith('/') ? path : `/${path}`}`

// CardSwap takes its card width/height as literal pixels, not a
// percentage — it never actually shrinks on its own. Before, the
// card stayed 480x380 on every screen and was just squashed down
// with a CSS scale(), which drags the fixed-angle 3D skew/perspective
// along with it, making the edges look crooked instead of like a
// clean rectangle on narrow phones. This picks real, smaller pixel
// dimensions (and a smaller skew) once the viewport is actually
// narrow, so the card is properly sized to begin with. Matches the
// .work-stage breakpoints in index.css.
const CARD_BREAKPOINTS = [
  { minWidth: 901, width: 480, height: 380, cardDistance: 50, verticalDistance: 65, skewAmount: 6 },
  { minWidth: 601, width: 380, height: 300, cardDistance: 38, verticalDistance: 52, skewAmount: 5 },
  { minWidth: 481, width: 300, height: 250, cardDistance: 30, verticalDistance: 42, skewAmount: 4 },
  { minWidth: 0, width: 240, height: 210, cardDistance: 22, verticalDistance: 32, skewAmount: 3 },
]

function pickCardConfig(viewportWidth) {
  return (
    CARD_BREAKPOINTS.find(bp => viewportWidth >= bp.minWidth) ??
    CARD_BREAKPOINTS[CARD_BREAKPOINTS.length - 1]
  )
}

function useResponsiveCardConfig() {
  const [config, setConfig] = useState(() =>
    pickCardConfig(typeof window === 'undefined' ? 1200 : window.innerWidth)
  )

  useEffect(() => {
    const onResize = () => setConfig(pickCardConfig(window.innerWidth))
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return config
}

export default function Work() {
  const { t } = useLanguage()
  const projects = t.work.projects
  const [activeIndex, setActiveIndex] = useState(0)

  // CardSwap calls this every time a new card settles into the front
  // slot, so the text panel on the side always matches what's showing.
  const handleFrontChange = useCallback(index => {
    setActiveIndex(index)
  }, [])

  const active = useMemo(
    () => projects[activeIndex] ?? projects[0],
    [projects, activeIndex]
  )

  const cardConfig = useResponsiveCardConfig()

  return (
    <section id="work">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2><TypeText text={t.work.heading} /></h2>
          <p>{t.work.sub}</p>
        </div>

        <div className="work-columns reveal">
          <div className="work-info">
            {/* key={active.label} restarts the fade-in animation
                every time the front card changes */}
            <div className="work-info-inner" key={active.label}>
              <span className="tag eng">{active.tag}</span>
              <h3>{active.title}</h3>
              <p>{active.desc}</p>
              <div className="work-stack eng">
                {active.stack.map(s => <span key={s}>{s}</span>)}
              </div>
            </div>
          </div>

          <div className="work-stage">
            <CardSwap
              width={cardConfig.width}
              height={cardConfig.height}
              cardDistance={cardConfig.cardDistance}
              verticalDistance={cardConfig.verticalDistance}
              skewAmount={cardConfig.skewAmount}
              delay={3800}
              easing="elastic"
              pauseOnHover={false}
              onFrontChange={handleFrontChange}
            >
              {projects.map(p => (
                <Card className="work-card" key={p.label}>
                  <div className="work-card-header">
                    <span className="work-card-dot" />
                    <span className="eng">{p.label}</span>
                  </div>
                  {/* Drop each project's image in here later, e.g.:
                      <img src={p.image} alt={p.title} className="work-card-img" />
                      Until then this placeholder shows the project label. */}
                  {p.image ? (
                    <img src={withBase(p.image)} alt={p.title} className="work-card-img" />
                  ) : (
                    <div className="work-thumb"><span className="eng">{p.label}</span></div>
                  )}
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>

        {/* dir="ltr" is required here: FoldText splits the text into
            one inline-block <span> per character, and inside an RTL
            page those per-character boxes get visually re-ordered by
            the browser's bidi algorithm (that's what turned "MON CODE"
            into "EDOC NOM" on screen). Forcing ltr on this element
            only keeps the rest of the page RTL as normal. The emoji is
            rendered separately (not inside the folding text) so it can
            have its own wink animation instead of folding in as a
            character. */}
        <div className="work-signoff eng" dir="ltr">
          <FoldText
            text="MØN CODE"
            splitBy="char"
            hinge="top"
            trigger="loop"
            repeatDelay={5}
            duration={0.55}
            stagger={0.04}
            ease="power3.out"
            perspective={600}
            creaseShading={0.5}
            fontSize={30}
            fontWeight={800}
            color="var(--chrome-hi)"
          />
          <WinkEmoji size={30} className="work-signoff-emoji" />
        </div>
      </div>
    </section>
  )
}
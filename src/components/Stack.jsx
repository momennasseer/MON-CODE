import { useLanguage } from '../i18n.jsx'
import TypeText from './TypeText.jsx'
import {
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiGit
} from 'react-icons/si'
import { FaReact, FaHtml5, FaCss3Alt } from 'react-icons/fa'
import { FiCode } from 'react-icons/fi'

// Map each tool name (as it appears in i18n.jsx) to its react-icons component.
// CSS3/HTML5/React use the Font Awesome set here instead of Simple Icons —
// SiCss3 isn't exported in some react-icons versions, so this sidesteps that.
const TOOL_ICONS = {
  JavaScript: SiJavascript,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  MySQL: SiMysql,
  React: FaReact,
  HTML5: FaHtml5,
  CSS3: FaCss3Alt,
  Git: SiGit
}

// 8 points around an ellipse (in % of the container), matching the
// 8 tools currently in i18n.jsx. If you add/remove a tool later, add
// or remove a point here too — order maps 1:1 to t.stack.tools.
const NODE_POSITIONS = [
  { x: 94, y: 50 },
  { x: 81, y: 77 },
  { x: 50, y: 88 },
  { x: 19, y: 77 },
  { x: 6, y: 50 },
  { x: 19, y: 23 },
  { x: 50, y: 12 },
  { x: 81, y: 23 }
]

export default function Stack() {
  const { t } = useLanguage()
  const tools = t.stack.tools
  const positions = NODE_POSITIONS.slice(0, tools.length)
  // NODE_POSITIONS already goes right → bottom-right → bottom →
  // bottom-left → left → top-left → top → top-right, i.e. clockwise.
  // Staggering the delay by index makes the light sweep around the
  // circle in that same clockwise order instead of firing all at
  // once. Both maps below use the same formula for the same index,
  // so each line and its node always light up together.
  const stepDelay = i => `${i * 0.35}s`

  return (
    <section id="stack">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2><TypeText text={t.stack.heading} /></h2>
          <p>{t.stack.sub}</p>
        </div>

        <div className="tools-orbit reveal">
          <svg
            className="tools-orbit-lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="toolsBeamGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--chrome-hi)" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--chrome-hi)" stopOpacity="0" />
              </linearGradient>
              {/* No per-line SVG blur filter here on purpose — combining
                  feGaussianBlur with vector-effect="non-scaling-stroke"
                  under this SVG's non-uniform viewBox stretch
                  (preserveAspectRatio="none") renders as a jagged,
                  hand-drawn-looking line in Chromium. The glow is done
                  instead with a CSS drop-shadow on the whole <svg>
                  element, which is computed in screen space and doesn't
                  have that problem. */}
            </defs>
            {positions.map((pos, i) => {
              return (
                <g key={i}>
                  {/* faint structural guide line */}
                  <line
                    x1="50" y1="50" x2={pos.x} y2={pos.y}
                    className="tools-orbit-line-base"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* constant lit-up glow along the whole line */}
                  <line
                    x1="50" y1="50" x2={pos.x} y2={pos.y}
                    className="tools-orbit-line-glow"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* bright pulse traveling from the node inward to
                      the center — note x1/y1 and x2/y2 are swapped
                      relative to the two lines above on purpose. */}
                  <line
                    x1={pos.x} y1={pos.y} x2="50" y2="50"
                    pathLength="100"
                    className="tools-orbit-line-beam"
                    vectorEffect="non-scaling-stroke"
                    style={{ animationDelay: stepDelay(i) }}
                  />
                </g>
              )
            })}
          </svg>

          <div className="tools-orbit-center">
            <FiCode />
          </div>

          {positions.map((pos, i) => {
            const tool = tools[i]
            const Icon = TOOL_ICONS[tool]
            return (
              <div
                className="tools-orbit-node"
                key={tool}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  // Same formula and same index as its line above,
                  // so this node flashes exactly when its own beam
                  // fires.
                  animationDelay: stepDelay(i)
                }}
                title={tool}
              >
                {Icon ? <Icon /> : <span className="eng">{tool}</span>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
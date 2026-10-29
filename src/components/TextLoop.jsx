import './TextLoop.css'

const TextLoop = ({
  text = 'MØN CODE',
  speed = 30,
  direction = 'forward',
  separator = '✦',
  fontSize = 19,
  fontWeight = 700,
  letterSpacing = 2,
  uppercase = true,
  color = '#ffdcdb',
  ribbon = true,
  ribbonColor = 'rgba(194,197,200,0.045)',
  ribbonWidth = 40,
  pauseOnHover = false,
  className = '',
  style = {}
}) => {

  const baseText = uppercase
    ? String(text).toUpperCase()
    : String(text)

  const unit = separator
    ? `${baseText} ${separator}`
    : baseText

  /*
    عدد كبير من التكرارات حتى لا يظهر
    أي جزء فاضي أثناء الحركة
  */
  const repeatCount = 40

  const items = Array.from(
    { length: repeatCount },
    (_, index) => (
      <span
        key={index}
        className="text-loop-item"
      >
        {unit}
      </span>
    )
  )

  const group = (
    <div className="text-loop-group">
      {items}
    </div>
  )

  return (
    <div
      className={`text-loop ${className}`.trim()}
      style={{
        ...style,

        '--loop-font-size': `${fontSize}px`,
        '--loop-font-weight': fontWeight,
        '--loop-letter-spacing': `${letterSpacing}px`,
        '--loop-color': color,
        '--loop-ribbon': ribbon
          ? ribbonColor
          : 'transparent',
        '--loop-height': `${ribbonWidth}px`,
        '--loop-speed': `${speed}s`
      }}
    >

      <div
        className={`text-loop-track ${
          direction === 'reverse'
            ? 'text-loop-reverse'
            : ''
        } ${
          pauseOnHover
            ? 'text-loop-pause'
            : ''
        }`}
      >

        {group}
        {group}

      </div>

    </div>
  )
}

export default TextLoop
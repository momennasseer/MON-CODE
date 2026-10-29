import { useEffect, useRef } from 'react'

const SCRAMBLE_CHARS = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+-/\\<>{}[]؟أبجحدرسصط'
const GLYPHS = '01アイウエオカキクケコ$#*+'

export default function CipherButton({ as: Tag = 'a', href, type, className = '', text, onClick }) {
  const canvasRef = useRef(null)
  const labelRef = useRef(null)
  const rafRef = useRef(null)
  const rainingRef = useRef(false)
  const scrambleTimerRef = useRef(null)

  function startRain() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const fontSize = 13
    const columns = Math.ceil(rect.width / fontSize)
    const drops = new Array(columns).fill(0).map(() => Math.random() * -20)

    rainingRef.current = true
    function draw() {
      if (!rainingRef.current) return
      ctx.fillStyle = 'rgba(15,16,16,0.28)'
      ctx.fillRect(0, 0, rect.width, rect.height)
      ctx.font = fontSize + 'px monospace'
      for (let i = 0; i < drops.length; i++) {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize
        ctx.fillStyle = Math.random() > 0.92 ? '#edf1f5' : '#cbced1'
        ctx.fillText(glyph, x, y)
        if (y > rect.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()
  }

  function stopRain() {
    rainingRef.current = false
    cancelAnimationFrame(rafRef.current)
    const canvas = canvasRef.current
    if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  }

  function scrambleReveal() {
    const label = labelRef.current
    if (!label) return
    const finalText = text
    const chars = finalText.split('')
    clearInterval(scrambleTimerRef.current)

    let revealCount = 0
    scrambleTimerRef.current = setInterval(() => {
      label.textContent = chars
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (i < revealCount) return ch
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        })
        .join('')
      revealCount += 1
      if (revealCount > chars.length) {
        clearInterval(scrambleTimerRef.current)
        label.textContent = finalText
      }
    }, 40)
  }

  function handleEnter() {
    startRain()
    scrambleReveal()
  }
  function handleLeave() {
    stopRain()
    clearInterval(scrambleTimerRef.current)
    if (labelRef.current) labelRef.current.textContent = text
  }

  useEffect(() => {
    return () => {
      stopRain()
      clearInterval(scrambleTimerRef.current)
    }
  }, [])

  const props = {
    className: `btn-primary btn-cipher ${className}`.trim(),
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    onClick,
  }
  if (Tag === 'a') props.href = href
  if (Tag === 'button') props.type = type || 'button'

  return (
    <Tag {...props}>
      <canvas className="btn-rain" ref={canvasRef}></canvas>
      <span className="btn-label" ref={labelRef}>{text}</span>
    </Tag>
  )
}

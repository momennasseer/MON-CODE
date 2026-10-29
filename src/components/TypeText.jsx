import { useEffect, useRef, useState } from 'react'

// Types `text` out character by character once it scrolls into view,
// with a blinking cursor while it's typing. Renders plain text nodes
// (not one <span> per character like FoldText), so it works safely
// inside RTL headings without the bidi-reordering issue that hits
// per-character layouts.
export default function TypeText({
  text,
  as: Tag = 'span',
  speed = 32,       // ms between each character (faster appearance)
  startDelay = 80,  // ms after becoming visible before typing starts
  className = '',
  cursor = true
}) {
  const rootRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return undefined

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.unobserve(el)
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return undefined

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setTyped(text)
      setDone(true)
      return undefined
    }

    let i = 0
    let interval
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setTyped(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(startTimeout)
      clearInterval(interval)
    }
  }, [visible, text, speed, startDelay])

  return (
    <Tag ref={rootRef} className={`type-text ${className}`.trim()}>
      {/* Full text for screen readers / SEO, since the visible text
          builds up gradually and isn't there on first paint. */}
      <span className="type-text-sr-only">{text}</span>
      <span aria-hidden="true">
        {typed}
        {cursor && !done && <span className="type-text-cursor">|</span>}
      </span>
    </Tag>
  )
}
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Lightning from './Lightning.jsx'
import { paletteVar } from '../palette.js'

const BASE = import.meta.env.BASE_URL

export default function Preloader({ onDone }) {
  const canvasRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [gone, setGone] = useState(false)

  // Silver starfield. The loop stops as soon as the preloader hides
  // (before, it kept redrawing forever behind the page).
  useEffect(() => {
    if (hidden) return undefined
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h, stars, rafId
    const starRgb = paletteVar('--star-rgb', '226,230,240')

    function sizeCanvas() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    function makeStars() {
      const count = Math.min(140, Math.floor((w * h) / 9000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        tw: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
      }))
    }
    sizeCanvas()
    makeStars()
    const onResize = () => { sizeCanvas(); makeStars() }
    window.addEventListener('resize', onResize)

    function drawStars() {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        s.tw += s.speed
        const alpha = Math.max(0.15, 0.4 + Math.sin(s.tw) * 0.4)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${starRgb},${alpha})`
        ctx.fill()
      }
      rafId = requestAnimationFrame(drawStars)
    }
    drawStars()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
    }
  }, [hidden])

  // Scroll lock while the preloader is up (released in unlockScroll).
  // Locks <html> and <body> and blocks touchmove so iOS rubber-band
  // scrolling can't move the page underneath.
  const scrollLockRef = useRef(null)
  const preventTouchRef = useRef(null)

  function unlockScroll() {
    const lock = scrollLockRef.current
    if (!lock) return
    scrollLockRef.current = null
    if (preventTouchRef.current) {
      document.removeEventListener('touchmove', preventTouchRef.current)
      preventTouchRef.current = null
    }
    lock.html.style.overflow = lock.prevHtmlOverflow
    lock.body.style.overflow = lock.prevBodyOverflow
    lock.body.style.position = lock.prevBodyPosition
    lock.body.style.width = lock.prevBodyWidth
    lock.body.style.top = lock.prevBodyTop
    window.scrollTo(0, lock.scrollY)
  }

  useLayoutEffect(() => {
    const html = document.documentElement
    const body = document.body
    const scrollY = window.scrollY

    scrollLockRef.current = {
      html,
      body,
      prevHtmlOverflow: html.style.overflow,
      prevBodyOverflow: body.style.overflow,
      prevBodyPosition: body.style.position,
      prevBodyWidth: body.style.width,
      prevBodyTop: body.style.top,
      scrollY,
    }

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.width = '100%'
    body.style.top = `-${scrollY}px`

    const preventTouch = (e) => e.preventDefault()
    preventTouchRef.current = preventTouch
    document.addEventListener('touchmove', preventTouch, { passive: false })

    return () => unlockScroll()
  }, [])

  // Progress: waits for fonts + the page "load" event (and at least
  // ~2.8s so the intro animation can play), then fills the bar.
  useEffect(() => {
    let timer
    let cancelled = false

    const minDelay = new Promise((r) => setTimeout(r, 2800))
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    const pageLoaded = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((r) => window.addEventListener('load', r, { once: true }))

    // Never wait more than 4.5s for fonts / the load event (slow networks).
    const assetsReady = Promise.race([
      Promise.all([fontsReady, pageLoaded]),
      new Promise((r) => setTimeout(r, 4500)),
    ])

    Promise.all([minDelay, assetsReady]).then(() => {
      if (cancelled) return
      timer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + (Math.random() * 9 + 3)
          if (next >= 100) {
            clearInterval(timer)
            setTimeout(() => {
              setHidden(true)
              unlockScroll()
              onDone && onDone()
            }, 400)
            return 100
          }
          return next
        })
      }, 220)
    })

    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [onDone])

  if (gone) return null

  return (
    <div
      id="preloader"
      className={hidden ? 'pre-hidden' : ''}
      onTransitionEnd={(e) => {
        if (hidden && e.target === e.currentTarget && e.propertyName === 'opacity') setGone(true)
      }}
    >
      <canvas id="starCanvas" ref={canvasRef}></canvas>
      <div className="lightning-wrap">
        {/* silver bolt: hue 215 + very low saturation = cool white-silver */}
        <Lightning hue={Number(paletteVar('--bolt-hue', 215))} saturation={Number(paletteVar('--bolt-sat', 0.1))} xOffset={0} speed={1.1} intensity={1.6} size={1.3} />
      </div>
      <div className="preloader-content">
        <img
          className="pre-logo"
          src={`${BASE}logo.webp`}
          alt="MØN CODE"
          width="256"
          height="256"
          decoding="async"
        />
        <p className="pre-welcome eng">WELCOME TO</p>
        <div className="pre-brand-row">
          <span className="pre-ornament">
            <span className="pre-dash"></span>
            <span className="pre-tag eng">&lt;</span>
          </span>

          <h2 className="pre-brand eng">
            {'MØN CODE'.split('').map((ch, i) => (
              <span key={i} className={`pl pl-${i}`}>{ch === ' ' ? '\u00A0' : ch}</span>
            ))}
          </h2>

          <span className="pre-ornament right">
            <span className="pre-tag eng">&gt;</span>
            <span className="pre-dash"></span>
          </span>
        </div>
        <div className="pre-bar-row">
          <span className="pre-label eng">Loading</span>
          <div className="pre-bar">
            <div className="pre-bar-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div>
          </div>
          <span className="pre-percent eng">{Math.floor(Math.min(progress, 100))}%</span>
        </div>
      </div>
    </div>
  )
}

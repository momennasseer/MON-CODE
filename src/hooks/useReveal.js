import { useEffect } from 'react'

export default function useReveal(deps = []) {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      // rootMargin trims the bottom of the viewport a bit for this
      // check, so a section starts revealing slightly before it's
      // fully in view instead of snapping in right at the edge —
      // reads as something loading in as you scroll toward it.
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    revealEls.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
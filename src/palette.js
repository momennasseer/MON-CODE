// Reads a value from the active palette (see palette.css). Used by the
// JS-drawn parts (WebGL background, preloader lightning, starfield).
export function paletteVar(name, fallback = '') {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

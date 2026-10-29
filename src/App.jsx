import { useCallback, useState } from 'react'

import Preloader from './components/Preloader.jsx'
import MoltenMetal from './components/MoltenMetal.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TextLoop from './components/TextLoop.jsx'
import Services from './components/Services.jsx'
import Work from './components/Work.jsx'
import Stack from './components/Stack.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx'

import useReveal from './hooks/useReveal.js'
import { paletteVar } from './palette.js'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isTouch =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const handleDone = useCallback(() => setLoaded(true), [])

  useReveal([loaded])

  return (
    <>
      <Preloader onDone={handleDone} />

      {/* Silver animated background. Mounted only after the preloader
          finishes (so two WebGL scenes never run at once), skipped for
          reduced-motion users, and rendered at a fraction of screen
          resolution / capped fps — it is a soft fog, so it looks the
          same but costs a fraction of the GPU time. */}
      <div className="site-bg" aria-hidden="true">
        {loaded && !prefersReducedMotion && (
          <MoltenMetal
            color1={paletteVar('--fog-1', '#3b3e46')}
            color2={paletteVar('--fog-2', '#9ea4b0')}
            color3={paletteVar('--fog-3', '#ffffff')}
            speed={0.45}
            scale={4}
            detail={3}
            glow={2.2}
            coreSize={0.1}
            swirl={1}
            fold={-0.2}
            blackPoint={0.06}
            brightness={2.4}
            colorMode="molten"
            grain={false}
            mouseInteraction={!isTouch}
            mouseStrength={0.25}
            opacity={0.42}
            resolution={isTouch ? 0.35 : 0.5}
            fps={isTouch ? 24 : 30}
          />
        )}
      </div>

      <Header />

      <main id="top">
        <Hero ready={loaded} />

        <TextLoop
          className="text-loop-band"
          text="MØN CODE"
          speed={100}
          direction="reverse"
          separator="✦"
          fontSize={19}
          fontWeight={700}
          letterSpacing={2}
          uppercase
          color="var(--loop-text)"
          ribbon
          ribbonColor="var(--loop-ribbon)"
          ribbonWidth={42}
          pauseOnHover={false}
        />

        <TextLoop
          className="text-loop-band"
          text="MØN CODE"
          speed={100}
          direction="forward"
          separator="✦"
          fontSize={19}
          fontWeight={700}
          letterSpacing={2}
          uppercase
          color="var(--loop-text)"
          ribbon
          ribbonColor="var(--loop-ribbon)"
          ribbonWidth={42}
          pauseOnHover={false}
        />

        <Services />
        <Work />
        <Stack />
        <About />
        <Contact />
      </main>

      <Footer />

      <FloatingWhatsApp show={loaded} />
    </>
  )
}

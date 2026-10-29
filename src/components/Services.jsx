import { FiCode, FiLayers, FiShoppingCart, FiLifeBuoy } from 'react-icons/fi'
import Carousel from './Carousel.jsx'
import { useLanguage } from '../i18n.jsx'
import TypeText from './TypeText.jsx'

const ICONS = [FiCode, FiLayers, FiShoppingCart, FiLifeBuoy]

export default function Services() {
  const { t } = useLanguage()

  const items = t.services.items.map((s, i) => {
    const Icon = ICONS[i]
    return {
      id: i,
      title: s.title,
      description: s.desc,
      icon: <Icon className="carousel-icon" />,
    }
  })

  return (
    <section id="services">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2><TypeText text={t.services.heading} /></h2>
          <p>{t.services.sub}</p>
        </div>
        <div className="services-carousel-wrap reveal">
          <Carousel
            items={items}
            baseWidth={320}
            autoplay
            autoplayDelay={3500}
            pauseOnHover
            loop
            round
          />
        </div>
      </div>
    </section>
  )
}
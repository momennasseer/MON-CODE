import { FaWhatsapp } from 'react-icons/fa6'
import { WHATSAPP_NUMBER } from '../socials.jsx'

// Floating contact button. Uses the site's chrome/silver palette
// (not WhatsApp green) so it matches the rest of the design.
// Rendered only after the preloader finishes (`show`).
export default function FloatingWhatsApp({ show }) {
  if (!show) return null
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      title="WhatsApp"
    >
      <span className="wa-float-ring" aria-hidden="true"></span>
      <FaWhatsapp className="wa-float-icon" aria-hidden="true" />
    </a>
  )
}

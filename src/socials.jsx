import { FaWhatsapp, FaFacebookF, FaTiktok } from 'react-icons/fa6'

// Single source of truth for contact + social links.
// Hero and Footer both render from SOCIALS, Contact uses the number.
//
// WhatsApp number: international format (Egypt: 20 + number without
// the leading 0), required by the wa.me link format.
export const WHATSAPP_NUMBER = '201095703839'

// TODO: replace the two '#' links with the real page URLs
// (e.g. https://www.facebook.com/yourpage, https://www.tiktok.com/@youraccount).
// While a link is '#', the icon renders but does not open anything.
export const SOCIALS = [
  {
    label: 'WhatsApp',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    Icon: FaWhatsapp,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1MUXd9Q6d6/',
    Icon: FaFacebookF,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@moncodedevelopment?_r=1&_t=ZS-9Avv32D1I40',
    Icon: FaTiktok,
  },
]

export function SocialLink({ social }) {
  const { label, href, Icon } = social
  const external = href !== '#'
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Icon className="social-ico" aria-hidden="true" />
    </a>
  )
}

import SmartLink from './SmartLink.jsx'
import { BTN_SIZE, BTN_VARIANT, BTN_WIDTH } from './styles.js'

// Pill CTA used across the marketing page.
//
//   variant  primary (gradient) | outline
//   size     md (nav, drawer)   | lg (hero, section CTA)
//   width    auto | full | mobile (full-width on phones only)
//
// Renders through SmartLink, so `href` may be a route or an anchor.
export default function LandingButton({
  href,
  variant = 'primary',
  size = 'md',
  width = 'auto',
  className = '',
  children,
  ...rest
}) {
  const classes = [BTN_VARIANT[variant], BTN_SIZE[size], BTN_WIDTH[width], className]
    .filter(Boolean)
    .join(' ')

  return (
    <SmartLink href={href} className={classes} {...rest}>
      {children}
    </SmartLink>
  )
}

import { Link } from 'react-router-dom'

// One link component for the whole marketing page.
// Internal routes (a leading "/") go through the router so navigation
// stays client-side; in-page anchors ("#features") and external URLs
// stay plain <a> elements.
export default function SmartLink({ href, children, ...rest }) {
  if (href?.startsWith('/')) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}

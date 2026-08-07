import './StarRating.css'

// Star rating component.
// - readOnly: display-only (e.g. feedback feed)
// - otherwise: interactive input (e.g. feedback form), controlled via value/onChange
export default function StarRating({ value = 0, readOnly = false, onChange, size = 'md' }) {
  const stars = [1, 2, 3, 4, 5]

  const handleClick = (index) => {
    if (!readOnly && onChange) onChange(index)
  }

  return (
    <div
      className={`star-rating ${readOnly ? 'star-rating--readonly' : ''} star-rating--${size}`}
      role={readOnly ? 'img' : undefined}
      aria-label={readOnly ? `${value} out of 5 stars` : undefined}
      aria-hidden={!readOnly ? true : undefined}
    >
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= value ? 'star--filled' : ''}`}
          onClick={() => handleClick(star)}
          disabled={readOnly}
          tabIndex={readOnly ? -1 : 0}
          aria-label={!readOnly ? `Rate ${star} star${star > 1 ? 's' : ''}` : undefined}
        >
          <svg viewBox="0 0 24 24" fill={star <= value ? 'currentColor' : 'none'}>
            <path
              d="M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.57 6.12 20.6l1.12-6.55L2.48 9.42l6.58-.96L12 2.5z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ))}
    </div>
  )
}

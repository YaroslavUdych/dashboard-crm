import { FC } from 'react'

import { SVG_ATTRIBUTES } from '../constants'

export const ArrowRight: FC = () => {
  return (
    <svg
      aria-hidden="true"
      fill={SVG_ATTRIBUTES.fill}
      height={SVG_ATTRIBUTES.height}
      viewBox={SVG_ATTRIBUTES.viewBox}
      width={SVG_ATTRIBUTES.width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19"></path>
    </svg>
  )
}

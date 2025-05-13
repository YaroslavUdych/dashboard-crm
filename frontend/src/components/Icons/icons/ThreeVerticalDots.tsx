import { FC } from 'react'

import { SVG_ATTRIBUTES } from '../constants'

export const ThreeVerticalDots: FC = () => {
  return (
    <svg
      aria-hidden="true"
      fill={SVG_ATTRIBUTES.fill}
      height={SVG_ATTRIBUTES.height}
      viewBox={SVG_ATTRIBUTES.viewBox}
      width={SVG_ATTRIBUTES.width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="2"></circle>
      <circle cx="12" cy="5" r="2"></circle>
      <circle cx="12" cy="19" r="2"></circle>
    </svg>
  )
}

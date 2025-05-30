import { FC } from 'react'

import { SVG_ATTRIBUTES } from '../constants'

export const ArrowLeft: FC = () => {
  return (
    <svg
      aria-hidden="true"
      fill={SVG_ATTRIBUTES.fill}
      height={SVG_ATTRIBUTES.height}
      viewBox={SVG_ATTRIBUTES.viewBox}
      width={SVG_ATTRIBUTES.width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64"></path>
    </svg>
  )
}

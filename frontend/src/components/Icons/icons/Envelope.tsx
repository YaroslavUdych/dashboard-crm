import { FC } from 'react'

import { SVG_ATTRIBUTES } from '../constants'

export const Envelope: FC = () => {
  return (
    <svg
      aria-hidden="true"
      fill={SVG_ATTRIBUTES.fill}
      height={SVG_ATTRIBUTES.height}
      viewBox={SVG_ATTRIBUTES.viewBox}
      width={SVG_ATTRIBUTES.width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22 8.608v8.142a3.25 3.25 0 0 1-3.066 3.245L18.75 20H5.25a3.25 3.25 0 0 1-3.245-3.066L2 16.75V8.608l9.652 5.056a.75.75 0 0 0 .696 0zM5.25 4h13.5a3.25 3.25 0 0 1 3.234 2.924L12 12.154l-9.984-5.23a3.25 3.25 0 0 1 3.048-2.919zh13.5z"></path>
    </svg>
  )
}

import { FC } from 'react'

import { SVG_ATTRIBUTES } from '../constants'

export const PhotoCamera: FC = () => {
  return (
    <svg
      aria-hidden="true"
      fill={SVG_ATTRIBUTES.fill}
      height={SVG_ATTRIBUTES.height}
      viewBox={SVG_ATTRIBUTES.viewBox}
      width={SVG_ATTRIBUTES.width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipRule="evenodd" fillRule="evenodd">
        <path d="M12 10.25a.75.75 0 0 1 .75.75v1.25H14a.75.75 0 0 1 0 1.5h-1.25V15a.75.75 0 0 1-1.5 0v-1.25H10a.75.75 0 0 1 0-1.5h1.25V11a.75.75 0 0 1 .75-.75"></path>
        <path d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.4 4.4 0 0 0 1.226-1.204c.749-1.1.749-2.633.749-5.697s0-4.597-.749-5.697a4.4 4.4 0 0 0-1.226-1.204c-.72-.473-1.622-.642-3.003-.702c-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0 0 13.634 3h-3.268c-.988 0-1.839.685-2.033 1.636c-.129.635-.696 1.125-1.355 1.125c-1.38.06-2.282.23-3.003.702A4.4 4.4 0 0 0 2.75 7.667C2 8.767 2 10.299 2 13.364s0 4.596.749 5.697c.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21M16 13a4 4 0 1 1-8 0a4 4 0 0 1 8 0m2-3.75a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5z"></path>
      </g>
    </svg>
  )
}

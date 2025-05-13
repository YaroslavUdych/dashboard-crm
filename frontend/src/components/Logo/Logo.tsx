import { FC } from 'react'

import styles from './Logo.module.scss'

/**
 * The `Logo` component renders an SVG logo with a combination of gradients and paths.
 *
 * @category Components
 *
 * @returns {JSX.Element} The rendered SVG logo.
 */

export const Logo: FC = () => {
  return (
    <svg
      className={styles.logo}
      fill="none"
      height="40px"
      viewBox="0 0 512 512"
      width="40px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="gradient1"
          x1="152"
          x2="65.523"
          y1="167.79"
          y2="259.624"
        >
          <stop stopColor="#0351AB"></stop>
          <stop offset="1" stopColor="#078DEE"></stop>
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="gradient2"
          x1="86"
          x2="86"
          y1="128"
          y2="384"
        >
          <stop stopColor="#68CDF9"></stop>
          <stop offset="1" stopColor="#078DEE"></stop>
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="gradient3"
          x1="402"
          x2="402"
          y1="288"
          y2="384"
        >
          <stop stopColor="#68CDF9"></stop>
          <stop offset="1" stopColor="#078DEE"></stop>
        </linearGradient>
      </defs>
      <path
        d="M86.352 246.358C137.511 214.183 161.836 245.017 183.168 285.573C165.515 317.716 153.837 337.331 148.132 344.418C137.373 357.788 125.636 367.911 111.202 373.752C80.856 388.014 43.132 388.681 14 371.048L86.352 246.358Z"
        fill="url(#gradient1)"
      ></path>
      <path
        d="M444.31 229.726C398.04 148.77 350.21 72.498 295.267 184.382C287.751 198.766 282.272 226.719 270 226.719V226.577C257.728 226.577 252.251 198.624 244.735 184.24C189.79 72.356 141.96 148.628 95.689 229.584C92.207 235.69 88.862 241.516 86 246.58C192.038 179.453 183.11 382.247 270 383.858V384C356.891 382.389 347.962 179.595 454 246.72C451.139 241.658 447.794 235.832 444.31 229.726Z"
        fill="url(#gradient2)"
      ></path>
      <path
        className={styles.circle}
        d="M450 384C476.509 384 498 362.509 498 336C498 309.491 476.509 288 450 288C423.491 288 402 309.491 402 336C402 362.509 423.491 384 450 384Z"
        fill="url(#gradient3)"
      ></path>
    </svg>
  )
}

import { motion } from 'motion/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import image from '@/assets/images/character-6.webp'
import { Button } from '@/components/Button/Button'
import {
  buttonColors,
  buttonSizes,
  buttonTypes,
  buttonVariants
} from '@/components/Button/constants'

import styles from './NotFoundPage.module.scss'

// An animation container for alternate appearance of elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

// Animation template for each element
const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 10,
      duration: 0.3,
      bounce: 0.4
    }
  }
}

export const NotFoundPage: FC = () => {
  const navigate = useNavigate()
  return (
    <motion.div
      animate="visible"
      className={`wrapper ${styles.container}`}
      initial="hidden"
      variants={containerVariants}
    >
      <motion.h1 variants={itemVariants}>Sorry, page not found!</motion.h1>

      <motion.p variants={itemVariants}>
        Sorry, we couldn’t find the page you’re looking for.
        <br /> Perhaps you’ve mistyped the URL?
        <br /> Be sure to check your spelling.
      </motion.p>

      <motion.svg
        aria-hidden="true"
        className={styles.illustration}
        focusable="false"
        variants={itemVariants}
        viewBox="0 0 480 360"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id=":r2:"
            x1="19.496%"
            x2="77.479%"
            y1="71.822%"
            y2="16.69%"
          >
            <stop offset="0%" stopColor="#c684ff"></stop>
            <stop offset="100%" stopColor="#c684ff" stopOpacity="0"></stop>
          </linearGradient>
        </defs>
        <path
          d="M0 198.78c0 41.458 14.945 79.236 39.539 107.786 28.214 32.765 69.128 53.365 114.734 53.434a148.44 148.44 0 0056.495-11.036c9.051-3.699 19.182-3.274 27.948 1.107a75.779 75.779 0 0033.957 8.01c5.023 0 9.942-.494 14.7-1.433 13.58-2.67 25.94-8.99 36.09-17.94 6.378-5.627 14.547-8.456 22.897-8.446h.142c27.589 0 53.215-8.732 74.492-23.696 19.021-13.36 34.554-31.696 44.904-53.224C474.92 234.58 480 213.388 480 190.958c0-76.93-59.774-139.305-133.498-139.305-7.516 0-14.88.663-22.063 1.899C305.418 21.42 271.355 0 232.499 0a103.651 103.651 0 00-45.88 10.661c-13.24 6.487-25.011 15.705-34.64 26.939-32.698.544-62.931 11.69-87.676 30.291C25.351 97.155 0 144.882 0 198.781z"
          fill="url(#:r2:)"
          fillRule="nonzero"
          opacity="0.2"
        ></path>
        <image height="300" href={image} x="205" y="30"></image>
        <path
          d="M111.1 141.2c58.7-1 58.6-88.3 0-89.2-58.6 1-58.6 88.3 0 89.2z"
          fill="#FFAB00"
          opacity="0.12"
        ></path>
        <path
          d="M111.1 120c30.8-.5 30.8-46.3 0-46.8-30.8.5-30.8 46.3 0 46.8z"
          fill="#FFD666"
        ></path>
        <path
          d="M244.9 182.5c82.3 1.4 82.2 123.8 0 125.2-82.3-1.5-82.3-123.8 0-125.2zm0 23.1c-51.8.9-51.8 77.9 0 78.8 51.8-.9 51.7-77.9 0-78.8z"
          fill="#8e33ff"
        ></path>
        <path
          d="M175 265.6c1-8.7-12.1-4.8-17-5.6v-66.6c0-4.5-1.5-5.6-5.6-5.6-5.3.3-13.8-1.4-17.1 4l-55 68.3c-2.7 3.3-1.8 8.8-2 12.8 0 4.1 1.5 5.6 5.6 5.6h54.7v21.7c-.9 7.9 9.1 5.2 13.7 5.6 4.1 0 5.6-1.5 5.6-5.6v-21.7c13.8-1.1 18.1 4.5 17.1-12.9zm-72.5-5.6l36-44.4V260h-36zm309.1 5.6c1-8.7-12.2-4.8-17.1-5.6v-66.6c0-4.5-1.5-5.6-5.6-5.6-5.3.3-13.7-1.4-17.1 4l-55 68.3c-2.7 3.3-1.9 8.8-2 12.8 0 4.1 1.5 5.6 5.6 5.6h54.7v21.7c-.9 7.9 9.1 5.2 13.7 5.6 4.1 0 5.6-1.5 5.6-5.6v-21.7c14.1-1.1 18.2 4.5 17.2-12.9zm-72.4-5.6l36-44.4V260h-36z"
          fill="url(#paint0_linear_1_119)"
        ></path>
        <path
          d="M425.6 118.2c0-5-4.6-9-9.6-8.2-2-3.7-6-6-10.2-5.9 4.3-21.4-30-21.4-25.7 0-8.7-.8-15.1 9.4-10.4 16.8 2.1 3.5 5.9 5.6 10 5.5h38.7v-.1c4.1-.4 7.2-3.9 7.2-8.1zM104.3 200c.1-4.2-4.1-7.8-8.2-7-1.7-3.2-5.1-5.1-8.8-5 3.8-18.4-25.8-18.4-22 0-7.4-.7-12.9 8.1-8.9 14.4 1.8 3 5.1 4.8 8.6 4.7h33.2v-.1c3.4-.4 6.1-3.4 6.1-7z"
          fill="#8e33ff"
          opacity="0.08"
        ></path>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1_119"
            x1="78.3"
            x2="78.3"
            y1="187.77"
            y2="305.935"
          >
            <stop stopColor="#efd6ff"></stop>
            <stop offset="1" stopColor="#8e33ff"></stop>
          </linearGradient>
        </defs>
      </motion.svg>

      <motion.div variants={itemVariants}>
        <Button
          color={buttonColors.DEFAULT}
          size={buttonSizes.LARGE}
          text="Go back to home"
          type={buttonTypes.BUTTON}
          variant={buttonVariants.CONTAINED}
          onClick={() => navigate('/')}
        />
      </motion.div>
    </motion.div>
  )
}

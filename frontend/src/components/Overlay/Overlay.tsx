import { motion } from 'motion/react'
import { FC } from 'react'

import styles from './Overlay.module.scss'

interface OverlayProps {
  onClick?: () => void
}

/**
 * Overlay component that renders a motion-enabled div element.
 * This component is typically used as a backdrop for modals or other UI elements.
 *
 * @category Components
 *
 * @param {OverlayProps} props - The props for the Overlay component.
 * @param {() => void} props.onClick - Callback function triggered when the overlay is clicked.
 *
 * @returns {JSX.Element} A motion-enabled div element with fade-in and fade-out animations.
 *
 * @remarks
 * - The component uses `framer-motion` for animations.
 * - The `aria-label` and `role` attributes are used for accessibility purposes.
 * - The `tabIndex` attribute ensures the overlay is focusable.
 */

export const Overlay: FC<OverlayProps> = ({ onClick }) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      aria-label="Close modal"
      className={styles.overlay}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      role="button"
      tabIndex={0}
      transition={{
        duration: 0.2,
        ease: 'linear'
      }}
      onClick={onClick}
    />
  )
}

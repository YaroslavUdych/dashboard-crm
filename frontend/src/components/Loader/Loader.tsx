import { motion } from 'motion/react'
import { FC } from 'react'
import { createPortal } from 'react-dom'

import styles from './Loader.module.scss'

/**
 * Loader component that renders a loading animation inside a portal.
 *
 * This component uses `react-dom`'s `createPortal` to render the loader
 * into a DOM element with the ID `themeContainer`. If the target container
 * is not found, the component returns `null`.
 *
 * The loader animation is implemented using `framer-motion` for smooth
 * transitions, including initial, animate, and exit opacity states.
 *
 * @category Components
 *
 * @returns {React.ReactPortal | null} A portal containing the loader animation, or `null` if the target container is not found.
 *
 * @example
 * ```tsx
 * import { AnimatePresence } from 'motion/react'
 *
 * <AnimatePresence>
 *   {isLoading && <Loader />}
 * </AnimatePresence>
 * ```
 */

export const Loader: FC = () => {
  const portalContainer = document.getElementById(
    'themeContainer'
  ) as HTMLElement | null

  if (!portalContainer) return null
  return createPortal(
    <motion.div
      animate={{ opacity: 1 }}
      className={styles.loaderWrap}
      data-testid="loader-wrap" // for testing
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <div
        className={styles.loader}
        data-testid="loader" // for testing
      />
    </motion.div>,
    portalContainer
  )
}

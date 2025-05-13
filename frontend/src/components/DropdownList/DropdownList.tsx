import { AnimatePresence, motion } from 'motion/react'
import { FC, ReactElement, ReactNode, useRef } from 'react'

import { useClickOutside } from '@/hooks/useClickOutside'

import { Placement, placements } from './constants'

import styles from './DropdownList.module.scss'

import classNames from 'classnames'

/**
 * DropdownList component is a reusable dropdown menu that can be triggered by a specified element.
 * It supports various placements, animations, and an optional arrow indicator.
 *
 * @category Components
 *
 * @description
 * - The `DropdownList` component is used to create a dropdown menu that can be triggered by a specified element.
 * - It supports various placements, animations, and an optional arrow indicator.
 * - The dropdown menu can be opened or closed by setting the `isOpen` prop to `true` or `false`.
 * - The `onClose` prop is a callback function that is triggered when the dropdown is closed.
 * - The `placement` prop determines the position of the dropdown relative to the trigger element.
 * - The `withArrow` prop determines whether an arrow indicator is displayed pointing to the trigger element.
 * - The content of the dropdown menu is specified as children of the `DropdownList` component.
 * - The dropdown menu is animated using the `motion` component from `framer-motion`.
 * - The `useClickOutside` hook is used to close the dropdown menu when clicking outside of it.
 *
 * @param {DropdownListProps} props - The props for the DropdownList component.
 * @param {ReactNode} props.trigger - The element that triggers the dropdown menu.
 * @param {boolean} props.isOpen - A boolean indicating whether the dropdown is open.
 * @param {() => void} props.onClose - A callback function triggered when the dropdown is closed.
 * @param {ReactNode} props.children - The content to be displayed inside the dropdown.
 * @param {string} [props.placement=placements.BOTTOM] - The placement of the dropdown relative to the trigger. Defaults to `placements.BOTTOM`.
 * @param {boolean} [props.withArrow=false] - A boolean indicating whether to display an arrow pointing to the trigger. Defaults to `false`.
 *
 * @returns {JSX.Element} The rendered DropdownList component.
 *
 * @example
 * ```tsx
 * <DropdownList
 *   trigger={<button>Open Dropdown</button>}
 *   isOpen={isDropdownOpen}
 *   onClose={() => setDropdownOpen(false)}
 *   placement={placements.RIGHT}
 *   withArrow
 * >
 *   <div>Dropdown Content</div>
 * </DropdownList>
 * ```
 */

interface DropdownListProps {
  trigger: ReactElement
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  placement?: Placement
  withArrow?: boolean
}

export const DropdownList: FC<DropdownListProps> = ({
  trigger,
  isOpen,
  onClose,
  children,
  placement = placements.BOTTOM,
  withArrow = false
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  useClickOutside(dropdownRef, onClose, isOpen)

  const dropdownListClassNames = classNames(styles.dropdownList, {
    [styles.top]: placement === placements.TOP,
    [styles.bottom]: placement === placements.BOTTOM,
    [styles.left]: placement === placements.LEFT,
    [styles.right]: placement === placements.RIGHT,

    [styles.leftTop]: placement === placements.LEFT_TOP,
    [styles.leftBottom]: placement === placements.LEFT_BOTTOM,
    [styles.rightTop]: placement === placements.RIGHT_TOP,
    [styles.rightBottom]: placement === placements.RIGHT_BOTTOM,
    [styles.withArrow]: withArrow
  })

  // yPosition is used to center the dropdown list vertically acording to the trigger
  const yPosition =
    placement === placements.RIGHT || placement === placements.LEFT ? '-50%' : 0

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      {trigger}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{
              opacity: 1,
              scale: 1,
              y: yPosition
            }}
            className={dropdownListClassNames}
            exit={{
              opacity: 0,
              scale: 0.5,
              y: yPosition
            }}
            initial={{
              opacity: 0,
              scale: 0.5,
              y: yPosition
            }}
            transition={{ duration: 0.1 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

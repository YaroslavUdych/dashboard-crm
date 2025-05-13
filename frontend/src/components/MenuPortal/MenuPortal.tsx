import { AnimatePresence, motion } from 'motion/react'
import {
  CSSProperties,
  FC,
  MouseEvent,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState
} from 'react'
import ReactDOM from 'react-dom'

import styles from './MenuPortal.module.scss'

interface MenuPortalProps {
  triggerRef: RefObject<HTMLElement>
  isOpen: boolean
  children: ReactNode
  onMouseEnter: () => void
  onMouseLeave: (event: MouseEvent<HTMLDivElement>) => void
}

/**
 * MenuPortal component renders a floating menu portal using React Portals and Framer Motion for animations.
 * It positions itself relative to a trigger element and supports dynamic styling and animations.
 * This component are used in main sidebar menu.
 *
 * @category Components
 *
 * @param {MenuPortalProps} props - The props for the MenuPortal component.
 * @param {React.RefObject<HTMLElement>} props.triggerRef - A reference to the trigger element that the menu portal aligns with.
 * @param {boolean} props.isOpen - A boolean indicating whether the menu portal is open or not.
 * @param {React.ReactNode} props.children - The content to be rendered inside the menu portal.
 * @param {() => void} [props.onMouseEnter] - Callback function triggered when the mouse enters the menu portal.
 * @param {() => void} [props.onMouseLeave] - Callback function triggered when the mouse leaves the menu portal.
 *
 * @returns {React.ReactPortal | null} A React Portal containing the menu or null if the portal container is not found.
 *
 * @remarks
 * - The component uses `useEffect` to calculate and set the position of the menu portal dynamically based on the trigger element's position.
 * - Framer Motion is used for animations when the menu portal appears or disappears.
 * - The portal is rendered into an element with the ID `themeContainer`.
 *
 * @example
 * ```tsx
 * const triggerRef = useRef<HTMLDivElement>(null);
 * const [isOpen, setIsOpen] = useState(false);
 *
 * return (
 *   <div>
 *     <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>Open Menu</div>
 *     <MenuPortal
 *       triggerRef={triggerRef}
 *       isOpen={isOpen}
 *       onMouseEnter={() => console.log('Mouse entered')}
 *       onMouseLeave={() => console.log('Mouse left')}
 *     >
 *       <div>Menu Content</div>
 *     </MenuPortal>
 *   </div>
 * );
 * ```
 */

export const MenuPortal: FC<MenuPortalProps> = ({
  triggerRef,
  isOpen,
  children,
  onMouseEnter,
  onMouseLeave
}) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuStyles, setMenuStyles] = useState<CSSProperties>({})
  const portalContainer = document.getElementById(
    'themeContainer'
  ) as HTMLElement | null

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()

      // position the menu portal relative to the trigger element
      setTimeout(() => {
        if (menuRef.current) {
          const menuRect = menuRef.current.getBoundingClientRect()

          setMenuStyles({
            position: 'absolute',
            top: `${triggerRect.top + triggerRect.height / 2 - menuRect.height / 2}px`,
            left: `${triggerRect.right}px`,
            zIndex: 1000
          })
        }
      }, 0) // wait for the menu to render before calculating position
    }
  }, [isOpen, triggerRef])

  if (!portalContainer) return null

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="menu-portal"
          ref={menuRef}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className={styles.menuPortal}
          exit={{ opacity: 0, scale: 0, x: '-50%' }}
          initial={{ opacity: 0, scale: 0, y: '-50%', x: '-50%' }}
          style={menuStyles}
          transition={{
            duration: 0.2,
            ease: 'easeOut'
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className={styles.marginArea}></div>
          <div className={styles.menuContent}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalContainer
  )
}

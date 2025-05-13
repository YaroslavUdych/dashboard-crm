import { AnimatePresence, cubicBezier, motion } from 'framer-motion'
import { FC, ReactNode, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Icons } from '@/components/Icons'
import { MenuPortal } from '@/components/MenuPortal/MenuPortal'

import styles from './MenuNavItem.module.scss'

import classNames from 'classnames'

interface MenuNavItemProps {
  navigateTo?: string
  isMenuCollapsed: boolean
  children: ReactNode
  isMobileMenuOpen: boolean
  onCloseMobileMenu: () => void
  menuChildren?: ReactNode
  isChildActive?: boolean
}

/**
 * MenuNavItem component is a navigation item for the sidebar menu of the application.
 * It renders a clickable item that can navigate to a specific page or display a dropdown menu if children are provided.
 * When the menu is collapsed, hovering over the item with children will display a portal with the dropdown menu.
 *
 * @category Components
 *
 * @param {MenuNavItemProps} props - The props to be passed to the component.
 * @param {string} props.navigateTo - The URL to navigate to when the item is clicked.
 * @param {boolean} props.isMenuCollapsed - Determines if the menu is collapsed.
 * @param {ReactNode} props.children - The content of the menu item.
 * @param {ReactNode} props.menuChildren - The content of the dropdown menu.
 * @param {boolean} props.isMobileMenuOpen - Determines if the mobile menu is open.
 * @param {() => void} props.onCloseMobileMenu - Callback to close the mobile menu.
 * @param {boolean} props.isChildActive - Determines if the child item is active.
 *
 * @returns {JSX.Element} The rendered MenuNavItem component.
 */

export const MenuNavItem: FC<MenuNavItemProps> = ({
  navigateTo,
  isMenuCollapsed,
  children,
  menuChildren,
  isMobileMenuOpen,
  onCloseMobileMenu,
  isChildActive = false
}) => {
  const [isMenuPortalOpen, setIsMenuPortalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const handleMouseEnter = () => {
    if (isMenuCollapsed) {
      setIsMenuPortalOpen(true)
    }
  }
  const handleMouseLeave = () => {
    if (isMenuCollapsed) {
      setIsMenuPortalOpen(false)
    }
  }
  const onToggleDropdown = () => {
    if (!isMenuCollapsed) {
      setIsDropdownOpen((prev) => !prev)
    }
  }

  const menuNavItemClasses = (isActive?: boolean) =>
    classNames(styles.menuNavItem, {
      [styles.active]: isActive,
      [styles.collapsed]: isMenuCollapsed
    })

  if (navigateTo) {
    return (
      <div className={styles.navItemLink}>
        <NavLink
          className={({ isActive }) => menuNavItemClasses(isActive)}
          to={navigateTo}
          onClick={() => {
            if (isMenuCollapsed) setIsMenuPortalOpen(false)
            if (isMobileMenuOpen) onCloseMobileMenu()
          }}
        >
          {children}
        </NavLink>
      </div>
    )
  }

  const dropdownButtonClasses = classNames(styles.menuNavItem, {
    [styles.active]: isChildActive,
    [styles.dropdownButtonActive]: isDropdownOpen && !isMenuCollapsed,
    [styles.collapsed]: isMenuCollapsed
  })
  const arrowClasses = classNames(styles.arrow, {
    [styles.arrowActive]: isDropdownOpen,
    [styles.collapsed]: isMenuCollapsed
  })

  return (
    <>
      <button
        ref={triggerRef}
        className={dropdownButtonClasses}
        onClick={onToggleDropdown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        <div className={arrowClasses}>
          <Icons.ArrowRight />
        </div>
      </button>
      {menuChildren && isMenuCollapsed && (
        <MenuPortal
          isOpen={isMenuPortalOpen}
          triggerRef={triggerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {menuChildren}
        </MenuPortal>
      )}
      <AnimatePresence>
        {menuChildren && !isMenuCollapsed && isDropdownOpen && (
          <motion.div
            key="dropdown-menu"
            animate={{ opacity: 1, height: 'auto' }}
            className={styles.dropdownMenu}
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.15,
              ease: cubicBezier(0.7, 1, 0.9, 1)
            }}
          >
            {menuChildren}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

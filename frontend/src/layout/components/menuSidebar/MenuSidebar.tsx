import { AnimatePresence } from 'motion/react'
import { FC, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { IconButton } from '@/components/IconButton/IconButton'
import { Icons } from '@/components/Icons'
import { Logo } from '@/components/Logo/Logo'
import { MenuNavItem } from '@/components/MenuNavItem/MenuNavItem'
import { Overlay } from '@/components/Overlay/Overlay'

import { MENU_ITEMS, MenuItem } from './constants'

import styles from './MenuSidebar.module.scss'

import classNames from 'classnames'

interface MenuSidebarProps {
  isMobileMenuOpen: boolean
  onCloseMobileMenu: () => void
}

export const MenuSidebar: FC<MenuSidebarProps> = ({
  isMobileMenuOpen,
  onCloseMobileMenu
}) => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)

  const toggleCollapseMenu = () => {
    setIsMenuCollapsed((prev) => !prev)
  }

  const sidebarClass = classNames(styles.sidebar, {
    [styles.collapsed]: isMenuCollapsed,
    [styles.openMobileMenu]: isMobileMenuOpen
  })

  const iconButtonClass = classNames(styles.iconButtonWrapper, {
    [styles.moved]: isMenuCollapsed
  })

  const location = useLocation()

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0
      const isChildActive = item.children?.some(
        (child) =>
          location.pathname === child.navigateTo ||
          location.pathname.startsWith(`${child.navigateTo}/`)
      )

      return (
        <MenuNavItem
          key={item.id}
          isChildActive={isChildActive}
          isMenuCollapsed={isMenuCollapsed}
          isMobileMenuOpen={isMobileMenuOpen}
          menuChildren={
            hasChildren && (
              <>
                {item.children?.map((child) => (
                  <MenuNavItem
                    key={child.id}
                    isMenuCollapsed={isMenuCollapsed}
                    isMobileMenuOpen={isMobileMenuOpen}
                    navigateTo={child.navigateTo}
                    onCloseMobileMenu={onCloseMobileMenu}
                  >
                    <child.icon />
                    {child.title}
                  </MenuNavItem>
                ))}
              </>
            )
          }
          navigateTo={item.navigateTo}
          onCloseMobileMenu={onCloseMobileMenu}
        >
          <item.icon />
          {item.title}
        </MenuNavItem>
      )
    })
  }

  return (
    <>
      <aside className={sidebarClass}>
        <div className={iconButtonClass}>
          <IconButton
            bordered
            icon={isMenuCollapsed ? <Icons.ArrowRight /> : <Icons.ArrowLeft />}
            size="small"
            onClick={toggleCollapseMenu}
          />
        </div>

        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        <nav>{renderMenuItems(MENU_ITEMS)}</nav>
      </aside>

      <AnimatePresence>
        {isMobileMenuOpen && <Overlay onClick={onCloseMobileMenu} />}
      </AnimatePresence>
    </>
  )
}

import { AnimatePresence } from 'motion/react'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { Outlet, useNavigate } from 'react-router'

import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { Loader } from '@/components/Loader/Loader'
import { UserMenuPanel } from '@/components/UserMenuPanel/UserMenuPanel'
import { useLogoutMutation } from '@/store/api/authApi'
import {
  clearUserAndTokenFromLocalStorage,
  getUserFromLocalStorage
} from '@/utils/authStorage'

import { Header } from '../components/header/Header'
import { MenuSidebar } from '../components/menuSidebar/MenuSidebar'
import { SettingsSidebar } from '../components/settingsSidebar/SettingsSidebar'

import styles from './AppLayout.module.scss'

export const AppLayout: FC = () => {
  // State and functions for mobile menu
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const closeMobileMenu = () => {
    setOpenMobileMenu(false)
  }
  const toggleMobileMenu = () => {
    setOpenMobileMenu((prev) => !prev)
  }
  // State and functions for settings sidebar
  const [openSettingsSidebar, setOpenSettingsSidebar] = useState(false)
  const toggleSettingsSidebar = () => {
    setOpenSettingsSidebar((prev) => !prev)
  }
  const closeSettingsSidebar = () => {
    setOpenSettingsSidebar(false)
  }
  // State and functions for user menu panel
  const [openUserMenuPanel, setOpenUserMenuPanel] = useState(false)
  const closeUserMenuPanel = () => {
    setOpenUserMenuPanel(false)
  }
  const toggleUserMenuPanel = () => {
    setOpenUserMenuPanel((prev) => !prev)
  }

  // Logout mutation
  const navigate = useNavigate()
  const [logout, { isLoading }] = useLogoutMutation()
  const onLogout = async () => {
    await logout({})
      .unwrap()
      .then(() => {
        clearUserAndTokenFromLocalStorage()
        navigate('/signin')
        toast.success('You have been logged out successfully!')
      })
      .catch(() => {
        toast.error('Something went wrong. Please try again!')
      })
  }

  const userInfo = getUserFromLocalStorage()

  return (
    <div className={styles.layout}>
      <MenuSidebar
        isMobileMenuOpen={openMobileMenu}
        onCloseMobileMenu={closeMobileMenu}
      />

      <main className={styles.content}>
        <Header
          avatarSrc={userInfo.avatar}
          onToggleMenuMobile={toggleMobileMenu}
          onToggleSettingsSidebar={toggleSettingsSidebar}
          onToggleUserMenuPanel={toggleUserMenuPanel}
        />
        <Breadcrumbs />
        <Outlet />
      </main>

      <SettingsSidebar
        isSidebarOpen={openSettingsSidebar}
        onClose={closeSettingsSidebar}
      />

      <UserMenuPanel
        avatarSrc={userInfo.avatar}
        isUserMenuPanelOpen={openUserMenuPanel}
        userEmail={userInfo.email}
        userName={userInfo.fullName}
        onClose={closeUserMenuPanel}
        onLogout={onLogout}
      />

      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
    </div>
  )
}

import { FC, useState } from 'react'
import { Outlet } from 'react-router'

import loginImage from '@/assets/images/illustration_dashboard.png'
import { IconButton } from '@/components/IconButton/IconButton'
import { Icons } from '@/components/Icons'
import { Logo } from '@/components/Logo/Logo'
import { SettingsSidebar } from '@/layout/components/settingsSidebar/SettingsSidebar'

import styles from './AuthLayout.module.scss'

export const AuthLayout: FC = () => {
  const [openSettingsSidebar, setOpenSettingsSidebar] = useState(false)

  const toggleSettingsSidebar = () => {
    setOpenSettingsSidebar((prev) => !prev)
  }

  const closeSettingsSidebar = () => {
    setOpenSettingsSidebar(false)
  }
  return (
    <div className={styles.authLayout}>
      <div className={styles.authLayout__logo}>
        <Logo />
      </div>
      <div className={styles.settingsButton}>
        <IconButton
          icon={<Icons.Settings />}
          size="large"
          onClick={toggleSettingsSidebar}
        />
      </div>
      <div className={styles.authLayout__greeting}>
        <h1 className={styles.title}>Hi, Welcome back 👋</h1>
        <p className={styles.subtitle}>Your workspace is ready for action.</p>
        <div className={styles.image}>
          <img alt="login" src={loginImage} />
        </div>
      </div>
      <div className={styles.authLayout__form}>
        <Outlet />
      </div>
      <SettingsSidebar
        isSidebarOpen={openSettingsSidebar}
        onClose={closeSettingsSidebar}
      />
    </div>
  )
}

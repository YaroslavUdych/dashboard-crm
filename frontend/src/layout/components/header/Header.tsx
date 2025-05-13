import { FC } from 'react'

import { HeaderUserButton } from '@/components/HeaderUserButton/HeaderUserButton'
import { IconButton } from '@/components/IconButton/IconButton'
import { Icons } from '@/components/Icons'

import styles from './Header.module.scss'

interface HeaderProps {
  avatarSrc: string
  onToggleSettingsSidebar: () => void
  onToggleMenuMobile: () => void
  onToggleUserMenuPanel: () => void
}

export const Header: FC<HeaderProps> = ({
  avatarSrc,
  onToggleSettingsSidebar,
  onToggleMenuMobile,
  onToggleUserMenuPanel
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.group}>
        <div className={styles.menuIconWrap}>
          <IconButton
            icon={<Icons.BurgerMenu />}
            size="large"
            onClick={onToggleMenuMobile}
          />
        </div>
        <div className={styles.companyLogo}>Company logo</div>
      </div>

      <div className={styles.group}>
        <IconButton
          icon={<Icons.Settings />}
          size="large"
          onClick={onToggleSettingsSidebar}
        />
        <HeaderUserButton
          userAvatar={avatarSrc}
          onClick={onToggleUserMenuPanel}
        />
      </div>
    </header>
  )
}

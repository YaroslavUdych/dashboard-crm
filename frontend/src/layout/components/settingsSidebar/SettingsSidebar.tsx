import { cubicBezier } from 'motion'
import { AnimatePresence, motion } from 'motion/react'
import { FC, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IconButton } from '@/components/IconButton/IconButton'
import { Icons } from '@/components/Icons'
import { Overlay } from '@/components/Overlay/Overlay'
import { Themes } from '@/constants/constants'
import { useDeviceType } from '@/hooks/useDeviceType'
import { useFullscreen } from '@/hooks/useFullscreen'
import { selectTheme, setTheme } from '@/store/slices/themeSlice'

import { SettingsSidebarItem } from './SettingsSidebarItem/SettingsSidebarItem'

import styles from './SettingsSidebar.module.scss'

interface SettingsSidebarProps {
  isSidebarOpen: boolean
  onClose: () => void
}

export const SettingsSidebar: FC<SettingsSidebarProps> = ({
  isSidebarOpen,
  onClose
}) => {
  const sidebarRef = useRef<HTMLElement>(null)

  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const handleClick = () => {
    const newTheme = theme === Themes.DARK ? Themes.LIGHT : Themes.DARK
    dispatch(setTheme(newTheme))
  }

  const { isFullscreen, toggleFullscreen } = useFullscreen()

  const deviceType = useDeviceType()

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          <motion.section
            ref={sidebarRef}
            animate={{ x: 0 }}
            className={styles.settingsSidebar}
            exit={{ x: '100%' }}
            initial={{ x: '100%' }}
            transition={{
              duration: 0.25,
              ease: cubicBezier(0.4, 1, 0.9, 1),
              delay: 0.1
            }}
          >
            <div className={styles.header}>
              <p>Settings</p>
              <IconButton
                icon={<Icons.CloseWindow />}
                size="large"
                onClick={onClose}
              />
            </div>

            <div className={styles.body}>
              <SettingsSidebarItem
                icon={<Icons.DarkMode />}
                isChecked={theme === Themes.DARK}
                title="Dark theme"
                onChange={handleClick}
              />
              {deviceType === 'desktop' && (
                <SettingsSidebarItem
                  icon={<Icons.FullScreen />}
                  isChecked={isFullscreen}
                  title="Fullscreen mode"
                  onChange={toggleFullscreen}
                />
              )}
            </div>
          </motion.section>

          <Overlay onClick={onClose} />
        </>
      )}
    </AnimatePresence>
  )
}

import { cubicBezier } from 'motion'
import { AnimatePresence, motion } from 'motion/react'
import { FC } from 'react'

import { Button } from '@/components/Button/Button'
import {
  buttonColors,
  buttonSizes,
  buttonTypes,
  buttonVariants
} from '@/components/Button/constants'
import { iconButtonSizes } from '@/components/IconButton/constants'
import { IconButton } from '@/components/IconButton/IconButton'
import { Icons } from '@/components/Icons'
import { Overlay } from '@/components/Overlay/Overlay'

import styles from './UserMenuPanel.module.scss'

interface UserMenuPanelProps {
  avatarSrc: string
  userName: string
  userEmail: string
  isUserMenuPanelOpen: boolean
  onClose: () => void
  onLogout: () => void
}

/**
 * The `UserMenuPanel` component renders a user menu panel with options such as viewing the user's profile
 * and logging out. It uses animations for smooth transitions and displays user information such as avatar,
 * name, and email.
 *
 * @category Components
 * @param {UserMenuPanelProps} props - The props for the `UserMenuPanel` component.
 * @param {string} props.avatarSrc - The source URL for the user's avatar image.
 * @param {string} props.userName - The name of the user to be displayed.
 * @param {string} props.userEmail - The email of the user to be displayed.
 * @param {boolean} props.isUserMenuPanelOpen - A flag indicating whether the user menu panel is open.
 * @param {() => void} props.onClose - Callback function to handle closing the user menu panel.
 * @param {() => void} props.onLogout - Callback function to handle the logout action.
 *
 * @returns {JSX.Element} The rendered `UserMenuPanel` component.
 *
 */

export const UserMenuPanel: FC<UserMenuPanelProps> = ({
  avatarSrc,
  userName,
  userEmail,
  isUserMenuPanelOpen,
  onClose,
  onLogout
}) => {
  return (
    <AnimatePresence>
      {isUserMenuPanelOpen && (
        <>
          <motion.section
            animate={{ x: 0 }}
            className={styles.userMenuPanel}
            exit={{ x: '100%' }}
            initial={{ x: '100%' }}
            transition={{
              duration: 0.2,
              ease: cubicBezier(0.4, 1, 0.9, 1),
              delay: 0.1
            }}
          >
            <div className={styles.header}>
              <IconButton
                icon={<Icons.CloseWindow />}
                size={iconButtonSizes.LARGE}
                onClick={onClose}
              />
              <div className={styles.avatar}>
                <img alt="User avatar" src={avatarSrc} />
              </div>
              <p className={styles.userName}>{userName}</p>
              <p className={styles.userEmail}>{userEmail}</p>
            </div>
            <div className={styles.body}>
              <Button
                fullWidth
                color={buttonColors.INFO}
                size={buttonSizes.SMALL}
                startIcon={<Icons.Profile />}
                text="Profile"
                type={buttonTypes.BUTTON}
                variant={buttonVariants.TEXT}
                onClick={() => {}}
              />
            </div>
            <div className={styles.footer}>
              <Button
                fullWidth
                color={buttonColors.ERROR}
                size={buttonSizes.LARGE}
                text="Logout"
                type={buttonTypes.BUTTON}
                variant={buttonVariants.CONTAINED}
                onClick={onLogout}
              />
            </div>
          </motion.section>

          <Overlay onClick={onClose} />
        </>
      )}
    </AnimatePresence>
  )
}

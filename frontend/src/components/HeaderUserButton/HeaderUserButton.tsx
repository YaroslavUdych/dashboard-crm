import { FC } from 'react'

import styles from './HeaderUserButton.module.scss'

interface HeaderUserButtonProps {
  onClick: () => void
  userAvatar: string
}

/**
 * The HeaderUserButton component displays a button with the user's avatar image.
 * This component is used in the header to provide a user-specific action button that opens a user settings menu.
 *
 * @category Components
 *
 * @param {Object} props - The props object.
 * @param {() => void} props.onClick - The callback function to handle button click events.
 * @param {string} props.userAvatar - The URL of the user's avatar image.
 *
 * @returns {JSX.Element} A button element containing the user's avatar image.
 */
export const HeaderUserButton: FC<HeaderUserButtonProps> = ({
  onClick,
  userAvatar
}) => {
  return (
    <button className={styles.userButton} type="button" onClick={onClick}>
      <img alt="User avatar" src={userAvatar} />
    </button>
  )
}

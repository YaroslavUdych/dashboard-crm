import { FC, ReactNode } from 'react'

import { Card } from '@/components/Card/Card'

import styles from './ProfileBanner.module.scss'

interface ProfileBannerProps {
  name: string
  image: string
  position: string
  controls?: ReactNode
}

/**
 * ProfileBanner component displays a user's profile information including
 * their avatar, name, position, and additional controls or actions(like edit or delete).
 *
 * @category Components
 *
 * @param {ProfileBannerProps} props - The properties for the ProfileBanner component.
 *
 * @param {React.ReactNode} props.controls - Additional controls or actions to be displayed in the banner.
 * @param {string} props.name - The name of the user to be displayed.
 * @param {string} props.image - The URL of the user's avatar image.
 * @param {string} props.position - The position of the user to be displayed.
 *
 * @returns {JSX.Element} A styled profile banner component.
 */

export const ProfileBanner: FC<ProfileBannerProps> = ({
  controls,
  name,
  image,
  position
}) => {
  return (
    <Card className={styles.banner}>
      <div className={styles.header}>
        <div className={styles.hederData}>
          <div className={styles.avatar}>
            <img alt="avatar-image" src={image} />
          </div>
          <div className={styles.text}>
            <span className={styles.name}>{name}</span>
            <span className={styles.position}>{position}</span>
          </div>
        </div>
      </div>
      <div className={styles.controls}>{controls}</div>
    </Card>
  )
}

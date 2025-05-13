import { FC } from 'react'

import { Card } from '@/components/Card/Card'
import { Icons } from '@/components/Icons'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'

import styles from './ProfileCard.module.scss'

interface ProfileCardProps {
  email: string
  phone: string
  address: string
  userRole: string
  createdAt: string
  isActivated: boolean
}

export const ProfileCard: FC<ProfileCardProps> = ({
  email,
  phone,
  address,
  userRole,
  createdAt,
  isActivated
}) => {
  return (
    <Card className={styles.profileCard}>
      <h2>Info</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span className={styles.listItem_title}>
            <Icons.Profile />
            <span>Role</span>
          </span>
          <span className={styles.listItem_data}>{userRole}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItem_title}>
            <Icons.Envelope />
            <span>Email</span>
          </span>
          <span className={styles.listItem_data}>
            <a href={`mailto:${email}`}>{email}</a>
          </span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItem_title}>
            <Icons.Phone />
            <span>Phone</span>
          </span>
          <span className={styles.listItem_data}>
            <a href={`tel:${phone}`}>{formatPhoneNumber(phone)}</a>
          </span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItem_title}>
            <Icons.Calendar2 />
            <span>Created at</span>
          </span>
          <span className={styles.listItem_data}>{createdAt}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItem_title}>
            <Icons.Location />
            <span>Address</span>
          </span>
          <span className={styles.listItem_data}>{address}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItem_title}>
            <span>Is activated</span>
          </span>
          <span className={styles.listItem_data}>
            {isActivated ? '✅' : '❎'}
          </span>
        </li>
      </ul>
    </Card>
  )
}

import { ChangeEvent, FC, MouseEvent, ReactElement } from 'react'

import { Switch } from '@/components/Switch/Switch'

import styles from './SettingsSidebarItem.module.scss'

interface SettingsSidebarItemProps {
  icon: ReactElement
  title: string
  isChecked: boolean
  onChange: () => void
}

export const SettingsSidebarItem: FC<SettingsSidebarItemProps> = ({
  icon,
  title,
  isChecked,
  onChange
}) => {
  const handleClick = (e: MouseEvent | ChangeEvent) => {
    e.preventDefault()
    onChange()
  }

  return (
    <button className={styles.button} onClick={handleClick}>
      <div className={styles.iconsGroup}>
        {icon}
        <Switch
          checked={isChecked}
          id={`switch-${title}`}
          onChange={handleClick}
        />
      </div>
      <div className={styles.title}>{title}</div>
    </button>
  )
}

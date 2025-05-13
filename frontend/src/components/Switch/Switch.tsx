import { ChangeEvent, FC } from 'react'

import styles from './Switch.module.scss'

import classNames from 'classnames'

interface SwitchProps {
  id: string
  disabled?: boolean
  checked: boolean
  onChange: (e: ChangeEvent) => void
}

/**
 * A toggle switch component.
 *
 * @category Components
 *
 * @param {string} id - The unique identifier for the switch input element.
 * @param {boolean} checked - Determines whether the switch is in the "on" (true) or "off" (false) state.
 * @param {boolean} [disabled=false] - Indicates whether the switch is disabled and non-interactive.
 * @param {(event: ChangeEvent) => void} onChange - Callback function triggered when the switch state changes.
 *
 * @returns {JSX.Element} A toggle switch component.
 *
 * @example
 * ```tsx
  import { useState } from 'react'
  import { Switch } from '@/components/Switch/Switch'

  const [isChecked, setIsChecked] = useState(false)
  const handleChange = () => {
   setIsChecked((prev) => !prev)
  }

  return <Switch id="toggle" checked={isChecked} onChange={handleChange} />
 * ```
 */

export const Switch: FC<SwitchProps> = ({
  id,
  checked,
  disabled = false,
  onChange
}) => {
  const switchClass = classNames(styles.switch, { [styles.disabled]: disabled })

  const handleChange = () => {
    if (!disabled) {
      onChange({} as ChangeEvent)
    }
  }

  return (
    <label aria-label="Toggle switch" className={switchClass}>
      <input
        checked={checked}
        className={styles.input}
        disabled={disabled}
        id={id}
        type="checkbox"
        onChange={handleChange}
      />
      <span className={styles.slider}></span>
    </label>
  )
}

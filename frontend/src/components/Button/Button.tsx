import { FC, MouseEvent, ReactNode } from 'react'

import { useRippleState } from '@/hooks/useRippleState'

import { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from './constants'

import styles from './Button.module.scss'

import classNames from 'classnames'

interface ButtonProps {
  color: ButtonColor
  disabled?: boolean
  fullWidth?: boolean
  size: ButtonSize
  text: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  type: ButtonType
  variant: ButtonVariant
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

/**
 * Button component that renders a customizable button with various styles, sizes, and variants.
 * It also supports ripple effects and optional start and end icons.
 *
 * @category Components
 *
 * @param {Object} props - The properties for the Button component.
 * @param {'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'} props.color - The color of the button.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {boolean} [props.fullWidth=false] - Whether the button should take the full width of its container.
 * @param {'small' | 'medium' | 'large'} props.size - The size of the button.
 * @param {string} props.text - The text to display inside the button.
 * @param {'button' | 'submit' | 'reset'} props.type - The type of the button.
 * @param {'contained' | 'outlined' | 'text'} props.variant - The variant of the button.
 * @param {function} [props.onClick] - The callback function to handle button clicks.
 * @param {React.ReactNode} [props.startIcon] - The icon to display at the start of the button.
 * @param {React.ReactNode} [props.endIcon] - The icon to display at the end of the button.
 *
 * @returns {JSX.Element} The rendered Button component.
 */
export const Button: FC<ButtonProps> = ({
  color,
  disabled = false,
  fullWidth = false,
  size,
  text,
  type,
  variant,
  onClick,
  startIcon,
  endIcon
}) => {
  const { ripples, createRipple } = useRippleState()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    createRipple(e)
    onClick?.(e)
  }

  const buttonClass = classNames(styles.button, {
    [styles.default]: color === 'default',
    [styles.primary]: color === 'primary',
    [styles.secondary]: color === 'secondary',
    [styles.info]: color === 'info',
    [styles.success]: color === 'success',
    [styles.warning]: color === 'warning',
    [styles.error]: color === 'error',

    [styles.small]: size === 'small',
    [styles.medium]: size === 'medium',
    [styles.large]: size === 'large',

    [styles.contained]: variant === 'contained',
    [styles.outlined]: variant === 'outlined',
    [styles.text]: variant === 'text',

    [styles.disabled]: disabled,

    [styles.fullwidth]: fullWidth
  })

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      type={type}
      onClick={handleClick}
    >
      {startIcon && <span className={styles.icon}>{startIcon}</span>}
      {text}
      {endIcon && <span className={styles.icon}>{endIcon}</span>}
      <div className="ripple-container">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple"
            style={{
              width: ripple.size,
              height: ripple.size,
              left: ripple.x,
              top: ripple.y
            }}
          />
        ))}
      </div>
    </button>
  )
}

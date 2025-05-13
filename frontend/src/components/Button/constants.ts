export const buttonTypes = {
  BUTTON: 'button',
  RESET: 'reset',
  SUBMIT: 'submit'
} as const

export const buttonSizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
} as const

export const buttonVariants = {
  CONTAINED: 'contained',
  OUTLINED: 'outlined',
  TEXT: 'text'
} as const

export const buttonColors = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
} as const

export type ButtonType = (typeof buttonTypes)[keyof typeof buttonTypes]
export type ButtonSize = (typeof buttonSizes)[keyof typeof buttonSizes]
export type ButtonVariant = (typeof buttonVariants)[keyof typeof buttonVariants]
export type ButtonColor = (typeof buttonColors)[keyof typeof buttonColors]

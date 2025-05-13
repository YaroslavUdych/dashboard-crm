export const iconButtonSizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
} as const

export type IconButtonSize =
  (typeof iconButtonSizes)[keyof typeof iconButtonSizes]

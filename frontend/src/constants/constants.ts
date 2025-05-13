export const Themes = {
  LIGHT: 'light',
  DARK: 'dark'
} as const
export type ThemeType = (typeof Themes)[keyof typeof Themes]

export const Roles = {
  ADMINISTRATOR: 'Administrator',
  DIRECTOR: 'Director',
  STAFF: 'Staff'
} as const

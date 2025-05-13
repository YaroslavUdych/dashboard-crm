export const inputTypes = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  SEARCH: 'search',
  TEL: 'tel',
  NUMBER: 'number'
} as const

export const inputAutoCompletes = {
  OFF: 'off',
  ON: 'on',
  NAME: 'name',
  EMAIL: 'email',
  USERNAME: 'username',
  PASSWORD: 'new-password',
  CURRENT_PASSWORD: 'current-password',
  SEARCH: 'search',
  TEL: 'tel',
  URL: 'url',
  STREET_ADDRESS: 'street-address',
  POSTAL_CODE: 'postal-code'
} as const

export const iconPositions = {
  START: 'start',
  END: 'end'
} as const

export type IconPosition = (typeof iconPositions)[keyof typeof iconPositions]
export type InputType = (typeof inputTypes)[keyof typeof inputTypes]
export type InputAutoComplete =
  (typeof inputAutoCompletes)[keyof typeof inputAutoCompletes]

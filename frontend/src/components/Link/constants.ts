export const linkTypes = {
  INTERNAL: 'internal',
  EXTERNAL: 'external'
} as const
export type LinkType = (typeof linkTypes)[keyof typeof linkTypes]

export const iconLinkPositions = {
  START: 'start',
  END: 'end'
} as const
export type IconPosition =
  (typeof iconLinkPositions)[keyof typeof iconLinkPositions]

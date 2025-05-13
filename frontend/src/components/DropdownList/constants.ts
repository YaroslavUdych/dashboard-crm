export const placements = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
  LEFT_TOP: 'left-top',
  RIGHT_TOP: 'right-top',
  LEFT_BOTTOM: 'left-bottom',
  RIGHT_BOTTOM: 'right-bottom'
} as const

export type Placement = (typeof placements)[keyof typeof placements]

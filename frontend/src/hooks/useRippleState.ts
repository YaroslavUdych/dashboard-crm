import { MouseEvent, useState } from 'react'

interface Ripple {
  id: number
  size: number
  x: number
  y: number
}

/**
 * A custom hook that manages the state of ripple effects for UI components.
 * It provides a list of active ripples and a function to create new ripple effects.
 *
 * @category Hooks
 *
 * @returns {Object} An object containing:
 * - `ripples`: An array of `Ripple` objects representing the current active ripples.
 * - `createRipple`: A function to create a new ripple effect based on a mouse event.
 *
 * @typedef {Object} Ripple
 * @property {number} id - A unique identifier for the ripple.
 * @property {number} size - The size (diameter) of the ripple.
 * @property {number} x - The x-coordinate of the ripple's position relative to the target element.
 * @property {number} y - The y-coordinate of the ripple's position relative to the target element.
 *
 * @example
 * const { ripples, createRipple } = useRippleState();
 *
 * <div onClick={(e) => createRipple(e)}>
 *   {ripples.map((ripple) => (
 *     <span
 *       key={ripple.id}
 *       style={{
 *         width: ripple.size,
 *         height: ripple.size,
 *         left: ripple.x,
 *         top: ripple.y,
 *       }}
 *     />
 *   ))}
 * </div>
 */

export const useRippleState = () => {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const createRipple = (e: MouseEvent<HTMLElement>) => {
    const element = e.currentTarget
    const rect = element.getBoundingClientRect()

    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const newRipple: Ripple = {
      id: Date.now(),
      size,
      x,
      y
    }

    setRipples((prevRipples) => [...prevRipples, newRipple])

    // remove ripple after animation
    setTimeout(() => {
      setRipples((prevRipples) =>
        prevRipples.filter((ripple) => ripple.id !== newRipple.id)
      )
    }, 800)
  }

  return { ripples, createRipple }
}

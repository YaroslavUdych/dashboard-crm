import { RefObject, useCallback, useEffect } from 'react'

/**
 * A custom hook that triggers a callback when a click is detected outside of a specified element.
 *
 * @category Hooks
 *
 * @param ref - A React ref object pointing to the target element.
 * @param callback - A function to be executed when a click outside the target element is detected.
 * @param isActive - A boolean indicating whether the event listener should be active.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useClickOutside(ref, () => console.log('Clicked outside!'), true);
 */

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  isActive: boolean
) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    },
    [ref, callback]
  )

  useEffect(() => {
    if (isActive) {
      document.addEventListener('mousedown', handleClick)
    }
    return () => {
      if (isActive) {
        document.removeEventListener('mousedown', handleClick)
      }
    }
  }, [handleClick, isActive])
}

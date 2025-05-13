import { useEffect, useState } from 'react'

/**
 * A custom hook that monitors the scroll position of an element and determines
 * whether it has scrolled beyond a specified threshold, returning a boolean
 * indicating whether the element should appear blurred.
 *
 * @category Hooks
 *
 * @param id - The `id` of the target HTML element to monitor for scrolling.
 * @param threshold - The scroll position threshold (in pixels) beyond which
 * the element is considered blurred. Defaults to `50`.
 * @returns A boolean value indicating whether the element is blurred (`true`)
 * or not (`false`).
 *
 * @example
 * ```tsx
 * const isBlurred = useScrollBlur('content', 100);
 *
 * return (
 *   <div id="content" style={{ filter: isBlurred ? 'blur(5px)' : 'none' }}>
 *     Scrollable content here...
 *   </div>
 * );
 * ```
 */

export const useScrollBlur = (id: string, threshold: number = 50): boolean => {
  const [isBlurred, setIsBlurred] = useState(false)

  useEffect(() => {
    const element = document.getElementById(id)

    if (!element) {
      return
    }

    const handleScroll = () => {
      const scrollTop = element.scrollTop

      if (scrollTop > threshold) {
        setIsBlurred(true)
      } else {
        setIsBlurred(false)
      }
    }

    element.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [id, threshold])

  return isBlurred
}

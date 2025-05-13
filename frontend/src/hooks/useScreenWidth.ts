import { useEffect, useState } from 'react'

/**
 * Custom hook to determine if the screen width is above a specified threshold.
 *
 * @category Hooks
 *
 * @param threshold - The width (in pixels) to compare the screen width against.
 *
 * @description
 * This hook sets up an event listener to monitor window resize events and updates
 * the state accordingly. It also performs an initial check on mount to determine
 * the current screen width relative to the threshold.
 * the event listener is cleaned up when the component using this hook unmounts.
 *
 * @returns A boolean indicating whether the screen width is greater than the threshold.
 *
 * @example
 * ```tsx
 * const isAboveThreshold = useScreenWidth(768);
 * console.log(isAboveThreshold); // Outputs true if the screen width is above 768px.
 * ```
 */

export const useScreenWidth = (threshold: number): boolean => {
  const [isAboveThreshold, setIsAboveThreshold] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsAboveThreshold(window.innerWidth > threshold)
    }

    // check on mount
    checkScreenSize()

    // add listener for resize
    window.addEventListener('resize', checkScreenSize)

    // cleanup
    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [threshold])

  return isAboveThreshold
}

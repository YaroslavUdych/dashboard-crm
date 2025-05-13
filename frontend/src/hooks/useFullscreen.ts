import { useEffect, useState } from 'react'

/**
 * A custom hook to manage and toggle fullscreen mode.
 *
 * @category Hooks
 *
 * @returns {Object} An object containing:
 * - `isFullscreen` (boolean): A state indicating whether the document is currently in fullscreen mode.
 * - `toggleFullscreen` (function): A function to toggle fullscreen mode on or off.
 *
 * @example
 * const { isFullscreen, toggleFullscreen } = useFullscreen();
 *
 * return (
 *   <div>
 *     <p>Fullscreen mode is {isFullscreen ? 'enabled' : 'disabled'}.</p>
 *     <button onClick={toggleFullscreen}>
 *       {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
 *     </button>
 *   </div>
 * );
 */

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }

  return { isFullscreen, toggleFullscreen }
}

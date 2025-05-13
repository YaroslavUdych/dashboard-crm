import { useEffect, useState } from 'react'

/**
 * Custom hook to determine the type of device based on the user agent string.
 * It categorizes the device as 'desktop', 'mobile', or 'tablet'.
 *
 * @category Hooks
 *
 * @description
 * - The initial device type is set to 'desktop'.
 * - The hook uses the `navigator.userAgent` to detect the device type.
 * - Runs only once on the initial render due to the empty dependency array in `useEffect`.
 *
 *
 * @returns {string} The type of device ('desktop', 'mobile', or 'tablet').
 *
 * @example
 * ```tsx
 * const deviceType = useDeviceType();
 * console.log(deviceType); // Outputs 'desktop', 'mobile', or 'tablet' based on the device.
 * ```
 */

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState('desktop') // initial value is desktop

  useEffect(() => {
    const userAgent = navigator.userAgent

    const isMobile = /Mobi|Android|iPhone|iPod/i.test(userAgent)
    const isTablet = /iPad|Tablet/i.test(userAgent)

    if (isMobile) {
      setDeviceType('mobile')
    } else if (isTablet) {
      setDeviceType('tablet')
    } else {
      setDeviceType('desktop')
    }
  }, [])

  return deviceType
}

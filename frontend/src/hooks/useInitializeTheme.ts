import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { initializeTheme } from '@/store/slices/themeSlice'

/**
 * Custom hook to initialize the theme for the application.
 *
 * @category Hooks
 *
 * This hook dispatches the `initializeTheme` action when the component
 * using this hook is mounted. It ensures that the theme is properly
 * set up in the application state.
 *
 * @returns {void} This hook does not return any value.
 *
 * @example
 * ```tsx
 * useInitializeTheme();
 * ```
 */

export const useInitializeTheme = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeTheme())
  }, [dispatch])
}

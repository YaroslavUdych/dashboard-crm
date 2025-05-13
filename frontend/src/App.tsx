import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { Themes } from '@/constants/constants'
import { selectTheme } from '@/store/slices/themeSlice'

import { useInitializeTheme } from './hooks/useInitializeTheme'
import { routes } from './routing/AppRoutes'

import './styles/global.scss'

import classNames from 'classnames'

export function App() {
  useInitializeTheme()

  const theme = useSelector(selectTheme)

  const appClass = classNames({
    themeLight: theme === Themes.LIGHT,
    themeDark: theme === Themes.DARK
  })

  return (
    <div className={appClass} id="themeContainer">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={routes} />
      </LocalizationProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--palette-paper)',
            color: 'var(--text-color)',
            minWidth: '150px',
            textAlign: 'center'
          }
        }}
      />
    </div>
  )
}

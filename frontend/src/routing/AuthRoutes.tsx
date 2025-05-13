// Маршрути для аутентифікації
import { AuthLayout } from '@/layout/auth-layout/AuthLayout'
import { ForgotPasswordPage } from '@/pages/forgot-password/ForgotPasswordPage'
import { LoginPage } from '@/pages/login/LoginPage'
import { SetPasswordPage } from '@/pages/set-password/SetPasswordPage'
import { VerifyOtpPage } from '@/pages/verify-otp/VerifyOtpPage'

import { PublicRoutes } from './PublicRoutes'
import { SetPasswordGuard } from './SetPasswordGuard'

export const authRoutes = {
  path: '/',
  element: <PublicRoutes />,
  children: [
    {
      element: <AuthLayout />,
      children: [
        { path: 'signin', element: <LoginPage /> },
        { path: 'forgot-password', element: <ForgotPasswordPage /> },
        { path: 'verify-otp', element: <VerifyOtpPage /> },
        {
          path: 'set-password',
          element: <SetPasswordGuard />,
          children: [{ index: true, element: <SetPasswordPage /> }]
        }
      ]
    }
  ]
}

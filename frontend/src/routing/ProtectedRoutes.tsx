// Protec for authentificated users
import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

// Checking if there is a token (or an authorized user)
export const ProtectedRoutes: FC = () => {
  const isAuthenticated = !!localStorage.getItem('accessToken')

  return isAuthenticated ? <Outlet /> : <Navigate replace to="/signin" />
}

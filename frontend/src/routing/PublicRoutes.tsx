// Protec for non-authentificated users
import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

// Deny access to public routes to authorized users
export const PublicRoutes: FC = () => {
  const isAuthenticated = !!localStorage.getItem('accessToken')

  return !isAuthenticated ? <Outlet /> : <Navigate replace to="/" />
}

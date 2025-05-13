import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const SetPasswordGuard: FC = () => {
  const userId = localStorage.getItem('userId')

  if (!userId) {
    return <Navigate replace to="/signin" />
  }

  return <Outlet />
}

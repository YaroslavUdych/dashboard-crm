// The main file connecting all the routes
import { createBrowserRouter } from 'react-router-dom'

import { NotFoundPage } from '@/pages/not-found/NotFoundPage'

import { authRoutes } from './AuthRoutes'
import { mainRoutes } from './MainRoutes'

export const routes = createBrowserRouter([
  authRoutes,
  mainRoutes,

  // Global handling of invalid routes
  { path: '*', element: <NotFoundPage /> }
])

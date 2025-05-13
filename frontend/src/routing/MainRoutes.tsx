// Основні маршрути аплікації
import { AppLayout } from '@/layout/app-layout/AppLayout'
import { AnalyticsPage } from '@/pages/analytics/AnalyticsPage'
import { CalendarPage } from '@/pages/calendar/CalendarPage'
import { CreateUserPage } from '@/pages/create-user/CreateUserPage'
import { CustomersPage } from '@/pages/customers/CustomersPage'
import { HomePage } from '@/pages/home/HomePage'
import { ServicesPage } from '@/pages/services/ServicesPage'
import { UserProfile } from '@/pages/user-profile/UserProfile'
import { UsersPage } from '@/pages/users/UsersPage'

import { ProtectedRoutes } from './ProtectedRoutes'

export const mainRoutes = {
  path: '/',
  element: <ProtectedRoutes />,
  children: [
    {
      element: <AppLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'customers', element: <CustomersPage /> },
        { path: 'analytics', element: <AnalyticsPage /> },
        { path: 'users', element: <UsersPage /> },
        { path: 'users/create-user', element: <CreateUserPage /> },
        { path: 'users/:id', element: <UserProfile /> },
        { path: 'services', element: <ServicesPage /> }
      ]
    }
  ]
}

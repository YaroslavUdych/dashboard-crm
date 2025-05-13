import { FC } from 'react'

import { Icons } from '@/components/Icons'

export interface Children {
  id: string
  title: string
  navigateTo: string
  icon: FC
}

export interface MenuItem {
  id: string
  title: string
  icon: FC
  navigateTo?: string
  children?: Children[]
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'calendar',
    title: 'Calendar',
    icon: Icons.Calendar,
    navigateTo: '/calendar'
  },

  {
    id: 'customers',
    title: 'Customers',
    icon: Icons.Customers,
    navigateTo: '/customers'
  },
  {
    id: 'management',
    title: 'Management',
    icon: Icons.Workspace,
    children: [
      {
        id: 'users',
        title: 'Users',
        navigateTo: '/users',
        icon: Icons.Users
      },
      {
        id: 'services',
        title: 'Services',
        navigateTo: '/services',
        icon: Icons.Services
      }
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: Icons.Statistics,
    navigateTo: '/analytics'
  }
]

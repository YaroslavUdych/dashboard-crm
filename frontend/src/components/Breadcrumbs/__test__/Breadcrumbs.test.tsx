import { screen } from '@testing-library/react'
import { it, vi, beforeEach, expect, Mock } from 'vitest'
import { useParams, useLocation } from 'react-router-dom'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import { renderWithProviders } from './util'
import type { Middleware } from '@reduxjs/toolkit'

// mock React Router (useParams, useLocation)
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...(actual as object),
    useParams: vi.fn(),
    useLocation: vi.fn()
  }
})

// mock userApi and useGetUserByIdQuery
vi.mock('@/store/api/userApi', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...(actual as Record<string, unknown>),
    userApi: {
      reducerPath: 'userApi',
      reducer: () => ({}) as Record<string, unknown>,
      middleware: (): Middleware => (_api) => (next) => (action) => {
        return next(action)
      }
    },
    useGetUserByIdQuery: vi.fn(() => ({
      data: { id: '123', fullName: 'John Doe' },
      isError: false
    }))
  }
})

beforeEach(() => {
  vi.clearAllMocks()
})

const testCases = [
  { path: '/', expected: ['Home'] },
  { path: '/category/product', expected: ['Home', 'Category', 'Product'] },
  { path: '/users/123', expected: ['Home', 'Users', 'John Doe'] }
]

testCases.forEach(({ path, expected }) => {
  it(`renders breadcrumbs correctly for path ${path}`, () => {
    // mock useParams
    ;(useParams as Mock).mockReturnValue(
      path.includes('123') ? { id: '123' } : {}
    )

    // mock useLocation
    ;(useLocation as Mock).mockReturnValue({ pathname: path })

    // render Breadcrumbs component with mocked providers
    renderWithProviders({
      ui: <Breadcrumbs />,
      route: path
    })

    // check if each breadcrumb is rendered
    expected.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })
})

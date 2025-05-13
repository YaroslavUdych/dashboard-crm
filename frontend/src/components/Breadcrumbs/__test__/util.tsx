import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { userApi } from '@/store/api/userApi'

const createTestStore = () =>
  configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware)
  })

interface RenderWithProvidersProps {
  ui: React.ReactElement
  route?: string
}

export const renderWithProviders = ({
  ui,
  route = '/'
}: RenderWithProvidersProps) => {
  const store = createTestStore()

  return render(
    <ReduxProvider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </ReduxProvider>
  )
}

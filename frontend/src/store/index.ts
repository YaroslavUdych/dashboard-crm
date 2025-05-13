import { configureStore } from '@reduxjs/toolkit'

import { authApi } from './api/authApi'
import { userApi } from './api/userApi'
import { themeReducer } from './slices/themeSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, authApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

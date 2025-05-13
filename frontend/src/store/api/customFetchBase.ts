import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'

import { apiURLS } from './constants'

// function to refresh access token
const refreshAccessToken = async (): Promise<string> => {
  const response = await fetch(`${apiURLS.base}${apiURLS.auth.refresh}`, {
    method: 'POST',
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Failed to refresh token')
  }

  const data = await response.json()
  localStorage.setItem('accessToken', data.accessToken)
  return data.accessToken
}

// custom fetch base function
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: apiURLS.base,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
    credentials: 'include'
  })

  // First request with current token
  let result = await rawBaseQuery(args, api, extraOptions || {})

  // Check for error 401 (token expired)
  if (result.error && result.error.status === 401) {
    try {
      const newAccessToken = await refreshAccessToken()

      if (newAccessToken) {
        // Request again with a new token
        result = await rawBaseQuery(args, api, extraOptions || {})
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      localStorage.removeItem('accessToken')
      window.location.href = '/signin'
    }
  }

  return result
}

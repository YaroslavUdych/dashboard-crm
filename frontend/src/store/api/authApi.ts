import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { apiURLS } from './constants'

const authBaseQuery = fetchBaseQuery({
  baseUrl: apiURLS.base,
  credentials: 'include'
})

// RTK Query API для логіну
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: apiURLS.auth.login,
        method: 'POST',
        body: credentials
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: apiURLS.auth.logout,
        method: 'POST',
        credentials: 'include'
      })
    }),
    verifyOtp: builder.mutation({
      query: (otp) => ({
        url: apiURLS.auth.verifyOtp,
        method: 'POST',
        body: otp
      })
    }),
    setPassword: builder.mutation({
      query: (data) => ({
        url: apiURLS.auth.setPassword,
        method: 'POST',
        body: data
      })
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: apiURLS.auth.forgotPassword,
        method: 'POST',
        body: email
      })
    })
  })
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useVerifyOtpMutation,
  useSetPasswordMutation,
  useForgotPasswordMutation
} = authApi

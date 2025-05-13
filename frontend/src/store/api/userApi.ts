import { createApi } from '@reduxjs/toolkit/query/react'

import { apiURLS } from './constants'
import { baseQueryWithReauth } from './customFetchBase'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => apiURLS.users.getAll,
      providesTags: ['User']
    }),

    getUserById: builder.query({
      query: (id: number) => apiURLS.users.getById(id)
    }),

    createUser: builder.mutation({
      query: (newUser) => ({
        url: apiURLS.users.create,
        method: 'POST',
        body: newUser,
        formData: true
      }),
      invalidatesTags: ['User']
    }),

    updateUser: builder.mutation({
      query: ({ id, ...updatedData }) => {
        const formData = new FormData()
        Object.entries(updatedData).forEach(([key, value]) => {
          formData.append(key, value as string | Blob)
        })

        return {
          url: apiURLS.users.update(id),
          method: 'PUT',
          body: formData
        }
      },
      invalidatesTags: ['User']
    }),

    deleteUser: builder.mutation({
      query: (id: number) => ({
        url: apiURLS.users.delete(id),
        method: 'DELETE'
      }),
      invalidatesTags: ['User']
    }),
    getAllRoles: builder.query({
      query: () => apiURLS.users.getAllRoles
    }),
    getAllPositions: builder.query({
      query: () => apiURLS.users.getAllPositions
    })
  })
})

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllRolesQuery,
  useGetAllPositionsQuery
} = userApi

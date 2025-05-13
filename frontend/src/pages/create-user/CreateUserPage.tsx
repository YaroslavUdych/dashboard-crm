import { AnimatePresence } from 'motion/react'
import { FC, useState } from 'react'
import { toast } from 'react-hot-toast'

import { Loader } from '@/components/Loader/Loader'
import { DEFAULT_AVATAR } from '@/components/UploadPhoto/constants'
import { CreateUserForm } from '@/forms/CreateUserForm/CreateUserForm'
import { useRolesAndPositions } from '@/hooks/useRolesAndPositions'
import { useCreateUserMutation } from '@/store/api/userApi'

interface FormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  roleId: number
  positionId: number
  avatar: string | File
}
/**
 * The `CreateUserPage` component is responsible for rendering the user creation page.
 * It handles fetching roles and positions, managing form submission, and displaying
 * appropriate feedback to the user.
 *
 * @category Pages
 *
 * @returns {JSX.Element} The rendered CreateUserPage component.
 *
 * @description
 * - This component uses the `useRolesAndPositions` hook to fetch roles and positions
 *   required for the form.
 * - It uses the `useCreateUserMutation` hook to handle user creation via an API call.
 * - Displays a loader while fetching data or submitting the form.
 * - Provides error handling and success feedback using `toast` notifications.
 *
 * @example
 * ```tsx
 * <CreateUserPage />
 * ```
 *
 * @dependencies
 * - `useRolesAndPositions`: Custom hook to fetch roles and positions.
 * - `useCreateUserMutation`: Custom hook to handle user creation API calls.
 * - `Loader`: Component to display a loading spinner.
 * - `CreateUserForm`: Form component for user creation.
 *
 * @state
 * - `formKey` (`number`): A key to reset the form state in the `UploadPhoto` component.
 *
 * @functions
 * - `onSubmit`: Handles form submission by creating a new user.
 *
 * @interfaces
 * - `FormValues`: An interface defining the shape of the form values.
 *
 * @errors
 * - Displays a toast notification if there is an error fetching roles or positions.
 * - Displays a toast notification if there is an error creating a user.
 */
export const CreateUserPage: FC = () => {
  // fetching roles and positions
  const {
    roles,
    positions,
    isRolesAndPositionsLoading,
    rolesAndPositionsError
  } = useRolesAndPositions()

  if (rolesAndPositionsError) {
    toast.error(
      'Something went wrong with downloading roles or positions. Please try again!'
    )
  }

  // this key to reset the state preview in UploadPhoto component
  const [formKey, setFormKey] = useState<number>(Date.now())

  const [createUser, { isLoading: isCreatingUser }] = useCreateUserMutation()

  const onSubmit = (data: FormValues, resetForm: () => void) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'avatar' && value instanceof File) {
        formData.append('avatar', value)
      } else {
        formData.append(key, value.toString())
      }
    })

    if (!data.avatar) {
      formData.append('avatar', DEFAULT_AVATAR)
    }

    createUser(formData)
      .unwrap()
      .then(() => {
        resetForm()
        toast.success('User created successfully!')
        setFormKey(Date.now())
      })
      .catch((error) => {
        const errorMessage =
          error?.data?.message || 'Something went wrong. Please try again!'
        toast.error(errorMessage)
      })
  }

  return (
    <section className="wrapper">
      <CreateUserForm
        key={formKey}
        positions={positions}
        roles={roles}
        onSubmit={onSubmit}
      />
      <AnimatePresence>
        {(isCreatingUser || isRolesAndPositionsLoading) && <Loader />}
      </AnimatePresence>
    </section>
  )
}

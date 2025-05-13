import dayjs from 'dayjs'
import { AnimatePresence } from 'motion/react'
import { FC, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { iconButtonSizes } from '@/components/IconButton/constants'
import { IconButton } from '@/components/IconButton/IconButton'
import { Icons } from '@/components/Icons'
import { Loader } from '@/components/Loader/Loader'
import { Modal } from '@/components/Modal/Modal'
import { ProfileBanner } from '@/components/ProfileBanner/ProfileBanner'
import { ProfileCard } from '@/components/ProfileCard/ProfileCard'
import { CreateUserForm } from '@/forms/CreateUserForm/CreateUserForm'
import { useModal } from '@/hooks/useModal'
import { useRolesAndPositions } from '@/hooks/useRolesAndPositions'
import {
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation
} from '@/store/api/userApi'

/**
 * UserProfile component is responsible for displaying and managing the user profile page.
 * It includes functionalities for viewing, editing, and deleting a user profile.
 *
 * @category Pages
 *
 * @returns {JSX.Element} The rendered UserProfile component.
 *
 * @description
 * - Fetches user data by ID using `useGetUserByIdQuery`.
 * - Fetches roles and positions using `useRolesAndPositions`.
 * - Allows toggling between view and edit modes for the user profile.
 * - Handles user updates via `useUpdateUserMutation`.
 * - Handles user deletion via `useDeleteUserMutation`.
 * - Displays a profile banner, profile card, or edit form based on the state.
 * - Includes a modal for confirming user deletion.
 * - Displays a loader while data is being fetched or actions are being performed.
 *
 * @example
 * ```tsx
 * <UserProfile />
 * ```
 *
 * @dependencies
 * - `useParams` from `react-router-dom` for extracting the user ID from the URL.
 * - `useLocation` from `react-router-dom` for accessing the current location state.
 * - `useNavigate` from `react-router-dom` for navigation after user deletion.
 * - `useGetUserByIdQuery` for fetching user data.
 * - `useRolesAndPositions` for fetching roles and positions.
 * - `useUpdateUserMutation` for updating user data.
 * - `useDeleteUserMutation` for deleting a user.
 * - `useModal` for modal management.
 * - `dayjs` for date formatting.
 * - `toast` for displaying notifications.
 *
 * @state
 * - `isEdit` (`boolean`): Tracks whether the edit form is active.
 *
 * @functions
 * - `toggleEdit`: Toggles the `isEdit` state.
 * - `onSubmit`: Handles form submission for updating user data.
 * - `handleModalConfirm`: Handles user deletion confirmation.
 *
 * @interfaces
 * - `FormValues`: Defines the structure of the form data for updating a user.
 *
 * @errors
 * - Displays error notifications for failed user data fetching, roles/positions fetching, user update, or user deletion.
 */

export const UserProfile: FC = () => {
  const { id } = useParams()
  const location = useLocation()

  // state for toggling edit form
  const [isEdit, setIsEdit] = useState(location.state?.isEditMode || false)
  const toggleEdit = () => {
    setIsEdit((prev: boolean) => !prev)
  }

  // Fetching user data
  const {
    data,
    isLoading,
    error,
    refetch: refetchUser
  } = useGetUserByIdQuery(Number(id))
  if (error) {
    const typedError = error as { data?: { message?: string } }
    const errorMessage =
      typedError.data?.message || 'Something went wrong. Please try again!'
    toast.error(errorMessage)
  }

  // Fetching roles and positions
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

  interface FormValues {
    firstName: string
    lastName: string
    birthDate: string
    email: string
    phone: string
    address: string
    roleId: number
    positionId: number
    avatar: string | File
  }

  // Updating user
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation({})
  const onSubmit = (data: FormValues) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'avatar' && value instanceof File) {
        formData.append('avatar', value)
      } else {
        formData.append(key, value.toString())
      }
    })

    if (id) {
      formData.append('id', id)
    }

    updateUser({ id, ...Object.fromEntries(formData) })
      .unwrap()
      .then(() => {
        toast.success('User updated successfully!')
        refetchUser()
        toggleEdit()
      })
      .catch((error) => {
        const errorMessage =
          error?.data?.message || 'Something went wrong. Please try again!'
        toast.error(errorMessage)
      })
  }

  // Deleting user
  const navigate = useNavigate()
  const [deleteUser, { isLoading: isDeleting, error: deleteError }] =
    useDeleteUserMutation()
  if (deleteError) {
    toast.error('Something went wrong. Failed to delete user')
  }
  const handleModalConfirm = async () => {
    if (id) {
      await deleteUser(Number(id))
        .unwrap()
        .then(() => {
          toast.success('User deleted successfully')
          navigate('/users')
        })
        .catch((error) => {
          const errorMessage =
            error?.data?.message || 'Something went wrong. Please try again!'
          toast.error(errorMessage)
        })
    }
  }

  const { modalRef, openModal } = useModal()

  // Displaying error messages
  if (error) {
    return (
      <section className="wrapper">
        {'data' in error
          ? (error.data as { message?: string })?.message === 'User not found'
            ? 'User not found'
            : 'There was an error fetching user data. Make sure the ID is correct.'
          : 'Something went wrong. Please try again!'}
      </section>
    )
  }

  return (
    <section className="wrapper">
      {data && (
        <>
          <ProfileBanner
            controls={
              <>
                <IconButton
                  icon={<Icons.Pencil />}
                  size={iconButtonSizes.MEDIUM}
                  onClick={toggleEdit}
                />
                <IconButton
                  icon={<Icons.Trash />}
                  size={iconButtonSizes.MEDIUM}
                  onClick={openModal}
                />
              </>
            }
            image={data?.avatar}
            name={data?.fullName}
            position={data?.position}
          />

          {isEdit ? (
            <CreateUserForm
              positions={positions}
              roles={roles}
              userAvatarfromApi={data?.avatar}
              userData={{
                firstName: data?.firstName,
                lastName: data?.lastName,
                birthDate: dayjs(data?.birthDate).format('YYYY-MM-DD'),
                email: data?.email,
                phone: data?.phone,
                address: data?.address,
                roleId: data?.roleId,
                positionId: data?.positionId,
                avatar: data?.avatar
              }}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileCard
              address={data?.address}
              createdAt={dayjs(data?.createdAt).format('DD.MM.YYYY')}
              email={data?.email}
              isActivated={data?.isActivated}
              phone={data?.phone}
              userRole={data?.role}
            />
          )}
        </>
      )}

      <Modal
        ref={modalRef}
        confirmButtonText="Delete"
        onConfirm={handleModalConfirm}
      >
        <p>Are you sure you want to delete {data?.fullName}?</p>
      </Modal>

      <AnimatePresence>
        {(isLoading ||
          isRolesAndPositionsLoading ||
          isUpdatingUser ||
          isDeleting) && <Loader />}
      </AnimatePresence>
    </section>
  )
}

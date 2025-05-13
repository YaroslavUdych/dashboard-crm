import { AnimatePresence } from 'motion/react'
import { FC, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/Button/Button'
import {
  buttonColors,
  buttonSizes,
  buttonTypes,
  buttonVariants
} from '@/components/Button/constants'
import { Icons } from '@/components/Icons'
import { Loader } from '@/components/Loader/Loader'
import { Modal } from '@/components/Modal/Modal'
import { Table } from '@/components/Table/Table'
import { useModal } from '@/hooks/useModal'
import { useDeleteUserMutation, useGetUsersQuery } from '@/store/api/userApi'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'

import styles from './UsersPage.module.scss'

interface User {
  address: string
  email: string
  age: number
  birthDate: string
  createdAt: string
  updatedAt: string
  isActivated: boolean
  id: number
  fullName: string
  firstName: string
  lastName: string
  position: string
  positionId: number
  roleId: number
  phone: string
  role: string
  avatar: string
}

/**
 * UsersPage component is responsible for displaying a list of users,
 * allowing the user to create, edit, or delete users. It includes
 * functionalities such as navigating to the user creation or edit page,
 * deleting a user with confirmation, and displaying a table of users.
 *
 * @category Pages
 *
 * @returns {JSX.Element} The rendered UsersPage component.
 *
 * @description
 * - Utilizes `useNavigate` for navigation.
 * - Uses `useModal` for modal handling.
 * - Fetches user data using `useGetUsersQuery`.
 * - Navigates to the user creation page on button click.
 * - Navigates to the user edit page on button click.
 * - Deletes a user using `useDeleteUserMutation`.
 * - Displays a loader while fetching or deleting data.
 * - Shows toast notifications for success or error scenarios.
 *
 * @example
 * ```tsx
 * <UsersPage />
 * ```
 *
 * @dependencies
 * - `useNavigate` from `react-router-dom` for navigation.
 * - `useModal` for modal handling.
 * - `useGetUsersQuery` for fetching user data.
 * - `useDeleteUserMutation` for deleting a user.
 * - `Table` component for displaying user data.
 * - `Modal` component for delete confirmation.
 * - `Loader` component for loading state.
 * - `toast` for notifications.
 * - `formatPhoneNumber` for formatting phone numbers.
 *
 * @state
 * - `selectedUserId` (`number | null`): Stores the selected user ID.
 *
 * @functions
 * - `handleModalConfirm`: Handles the modal confirmation for user deletion.
 * - `handleEditUser`: Navigates to the user edit page with the selected user ID as state.
 * - `openModalHandle`: Opens the modal and sets the selected user ID.
 *
 * @errors
 * - Displays an error toast if user data fails to load.
 * - Displays an error toast if user deletion fails.
 */

export const UsersPage: FC = () => {
  const navigate = useNavigate()
  const { modalRef, openModal } = useModal()

  // State to store selected user id
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  // Fetching users
  const { data, isLoading, error } = useGetUsersQuery({})
  if (error) {
    toast.error('Something went wrong. Failed to load users')
  }

  // Table columns
  const columns = [
    { key: 'fullName', label: 'Name' },
    { key: 'position', label: 'Position' },
    { key: 'phone', label: 'Phone number' },
    { key: 'role', label: 'Role' }
  ]

  // Deleting user
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

  const handleModalConfirm = async () => {
    if (selectedUserId) {
      await deleteUser(selectedUserId)
        .unwrap()
        .then(() => {
          toast.success('User deleted successfully')
        })
        .catch((error) => {
          const errorMessage =
            error?.data?.message || 'Something went wrong. Please try again!'
          toast.error(errorMessage)
        })
    }
  }

  // function to navigate to edit user page
  const handleEditUser = (id: number) => {
    navigate(`/users/${id}`, { state: { isEditMode: true } })
  }

  // function to open modal and set selected user id
  const openModalHandle = (id: number) => {
    setSelectedUserId(id)
    openModal()
  }

  return (
    <section className="wrapper">
      <div className={styles.header}>
        <Button
          color={buttonColors.DEFAULT}
          size={buttonSizes.MEDIUM}
          startIcon={<Icons.Plus />}
          text="New user"
          type={buttonTypes.BUTTON}
          variant={buttonVariants.CONTAINED}
          onClick={() => navigate('/users/create-user')}
        />
      </div>
      {data && (
        <div className={styles.body}>
          <Table
            columns={columns}
            data={data.map((user: User) => ({
              ...user,
              phone: formatPhoneNumber(user.phone)
            }))}
            tableBarChildren={
              <>
                <p>search</p>
                <p>filter</p>
              </>
            }
            onDelete={openModalHandle}
            onEdit={handleEditUser}
          />
        </div>
      )}
      <Modal
        ref={modalRef}
        confirmButtonText="Delete"
        onConfirm={handleModalConfirm}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>

      <AnimatePresence>
        {(isLoading || isDeleting) && <Loader />}
      </AnimatePresence>
    </section>
  )
}

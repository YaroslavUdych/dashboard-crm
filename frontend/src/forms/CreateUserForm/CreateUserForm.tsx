import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/Button/Button'
import {
  buttonColors,
  buttonSizes,
  buttonTypes,
  buttonVariants
} from '@/components/Button/constants'
import { iconButtonSizes } from '@/components/IconButton/constants'
import { IconButton } from '@/components/IconButton/IconButton'
import { Icons } from '@/components/Icons'
import { inputTypes } from '@/components/Input/constants'
import { Input } from '@/components/Input/Input'
import { Option } from '@/components/Select/constants'
import { Select } from '@/components/Select/Select'
import { DEFAULT_AVATAR } from '@/components/UploadPhoto/constants'
import { UploadPhoto } from '@/components/UploadPhoto/UploadPhoto'
import { useScreenWidth } from '@/hooks/useScreenWidth'

import styles from './CreateUserForm.module.scss'

/**
 * Props for the CreateUserForm component.
 */
interface CreateUserFormProps {
  onSubmit: (data: FormValues, resetForm: () => void) => void
  roles: Option[]
  positions: Option[]
  // prop to prefill the form with user data
  userData?: FormValues
  // prop to prefill the form with user avatar
  userAvatarfromApi?: string
}

/**
 * Interface for the form values.
 */
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

/**
 * CreateUserForm component.
 *
 * A reusable form component for creating or updating a user.
 *
 * @category Forms
 *
 * @example
 * ```tsx
 * <CreateUserForm
 *   onSubmit={handleSubmit}
 *   roles={roles}
 *   positions={positions}
 *   userData={userData}
 *   userAvatarfromApi={userAvatar}
 * />
 * ```
 */

export const CreateUserForm: FC<CreateUserFormProps> = ({
  onSubmit,
  roles,
  positions,
  userData,
  userAvatarfromApi
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields }
  } = useForm<FormValues>({
    defaultValues: userData || { avatar: DEFAULT_AVATAR }
  })

  const isAboveThreshold = useScreenWidth(600)

  /**
   * Handles form submission.
   * Sends only modified fields.
   * @param data - Form values.
   */
  const handleFormSubmit = (data: FormValues) => {
    const changedFields: Partial<
      Record<keyof FormValues, string | number | Date | File>
    > = {}
    Object.keys(dirtyFields).forEach((key) => {
      const typedKey = key as keyof FormValues
      const value = data[typedKey]

      // Trim the value if it is a string
      const trimmedValue = typeof value === 'string' ? value.trim() : value

      if (trimmedValue !== undefined && trimmedValue !== '') {
        changedFields[typedKey] = trimmedValue
      }
    })

    if (Object.keys(changedFields).length) {
      onSubmit(changedFields as FormValues, () => reset())
    } else {
      toast('You have not changed any fields!')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={styles.avatarSection}>
        <UploadPhoto
          register={register('avatar')}
          userAvatar={userAvatarfromApi}
        />
      </div>

      <div className={styles.dataSection}>
        <Input
          errorMessage={errors.firstName?.message}
          hookFormProps={register('firstName', {
            required: '* First Name is required',
            validate: (value) =>
              value.trim().length >= 2 ||
              '* First Name must be at least 2 characters long',
            pattern: {
              value: /^[\p{L}\s]+$/u,
              message: '* First Name must contain only letters'
            },
            onChange: (e) => {
              e.target.value = e.target.value.trimStart()
            }
          })}
          id="first-name"
          label="First Name"
          type={inputTypes.TEXT}
        />

        <Input
          errorMessage={errors.lastName?.message}
          hookFormProps={register('lastName', {
            required: '* Last Name is required',
            validate: (value) =>
              value.trim().length >= 2 ||
              '* Last Name must be at least 2 characters long',
            pattern: {
              value: /^[\p{L}\s]+$/u,
              message: '* Last Name must contain only letters'
            },
            onChange: (e) => {
              e.target.value = e.target.value.trimStart()
            }
          })}
          id="last-name"
          label="Last Name"
          type={inputTypes.TEXT}
        />

        <Controller
          control={control}
          name="birthDate"
          render={({ field }) => (
            <DatePicker
              disableFuture
              format="DD.MM.YYYY"
              formatDensity="spacious"
              label="Date of birth"
              slotProps={{
                textField: {
                  helperText: errors.birthDate?.message || ' '
                }
              }}
              slots={{
                openPickerButton: (props) => (
                  <IconButton
                    {...props}
                    icon={<Icons.Calendar />}
                    size={iconButtonSizes.MEDIUM}
                    onClick={(e) => {
                      props.onClick?.(e)
                    }}
                  />
                )
              }}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) =>
                field.onChange(date ? dayjs(date).format('YYYY-MM-DD') : null)
              }
            />
          )}
          rules={{ required: '* Date of birth is required' }}
        />

        <Input
          errorMessage={errors.address?.message}
          hookFormProps={register('address', {
            required: '* Address is required',
            validate: (value) =>
              value.trim().length >= 3 ||
              '* Address must be at least 3 characters long',
            onChange: (e) => {
              e.target.value = e.target.value.trimStart()
            }
          })}
          id="register-user-address"
          label="Address"
          type={inputTypes.TEXT}
        />

        <Controller
          control={control}
          name="roleId"
          render={({ field }) => (
            <Select
              {...field}
              errorMessage={errors.roleId?.message}
              options={roles}
              placeholder="Role"
            />
          )}
          rules={{ required: '* Role is required' }}
        />

        <Controller
          control={control}
          name="positionId"
          render={({ field }) => (
            <Select
              {...field}
              errorMessage={errors.positionId?.message}
              options={positions}
              placeholder="Position"
            />
          )}
          rules={{ required: '* Position is required' }}
        />

        <Input
          errorMessage={errors.email?.message}
          hookFormProps={register('email', {
            required: '* Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: '* Email must be valid'
            }
          })}
          id="register-user-email"
          label="Email"
          type={inputTypes.TEXT}
        />

        <Input
          errorMessage={errors.phone?.message}
          hookFormProps={register('phone', {
            required: '* Phone is required',
            pattern: {
              value: /^\+\d{12}$/,
              message: '* Phone must be in the format +420123456789 (12 digits)'
            },
            onChange: (e) => {
              e.target.value = e.target.value.trimStart()
            }
          })}
          id="register-user-phone"
          label="Phone"
          type={inputTypes.TEL}
        />

        <div className={styles.submitButton}>
          <Button
            color={buttonColors.DEFAULT}
            fullWidth={!isAboveThreshold}
            size={buttonSizes.LARGE}
            text={userData ? 'Update user' : 'Create user'}
            type={buttonTypes.SUBMIT}
            variant={buttonVariants.CONTAINED}
          />
        </div>
      </div>
    </form>
  )
}

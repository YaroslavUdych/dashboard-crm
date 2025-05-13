import { AnimatePresence } from 'motion/react'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

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
import { iconPositions, inputTypes } from '@/components/Input/constants'
import { Input } from '@/components/Input/Input'
import { Loader } from '@/components/Loader/Loader'
import { useSetPasswordMutation } from '@/store/api/authApi'

import styles from './SetPasswordPage.module.scss'

interface FormValues {
  password: string
  confirmPassword: string
}

export const SetPasswordPage: FC = () => {
  const navigate = useNavigate()
  const [setPassword, { isLoading }] = useSetPasswordMutation()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormValues>()

  const userId = localStorage.getItem('userId')
  const type = localStorage.getItem('type')

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setPassword({
      userId,
      password: data.password,
      type
    })
      .unwrap()
      .then(() => {
        localStorage.removeItem('userId')
        localStorage.removeItem('type')
        navigate('/signin', { replace: true })
        toast.success('Password set successfully! Now you can sign in.')
      })
      .catch((error) => {
        const errorMessage =
          error?.data?.message || 'Something went wrong. Please try again!'
        toast.error(errorMessage)
      })
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev)
  }

  return (
    <div className={styles.container}>
      <Icons.Lock />
      <h2 className={styles.title}>Set Your Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorMessage={errors.password?.message}
          hookFormProps={{
            ...register('password', {
              required: '* Password is required',
              minLength: {
                value: 6,
                message: '* Password must be at least 6 characters'
              }
            })
          }}
          icon={
            <IconButton
              icon={isPasswordVisible ? <Icons.Eye /> : <Icons.Eyelid />}
              size={iconButtonSizes.MEDIUM}
              onClick={togglePasswordVisibility}
            />
          }
          iconPosition={iconPositions.END}
          id="new-password"
          label="Password"
          type={isPasswordVisible ? inputTypes.TEXT : inputTypes.PASSWORD}
        />
        <Input
          errorMessage={errors.confirmPassword?.message}
          hookFormProps={{
            ...register('confirmPassword', {
              required: '* Please confirm your password',
              validate: (value) =>
                value === watch('password') || '* Passwords do not match'
            })
          }}
          icon={
            <IconButton
              icon={isConfirmPasswordVisible ? <Icons.Eye /> : <Icons.Eyelid />}
              size={iconButtonSizes.MEDIUM}
              onClick={toggleConfirmPasswordVisibility}
            />
          }
          iconPosition={iconPositions.END}
          id="confirm-password"
          label="Confirm Password"
          type={
            isConfirmPasswordVisible ? inputTypes.TEXT : inputTypes.PASSWORD
          }
        />
        <Button
          fullWidth
          color={buttonColors.DEFAULT}
          disabled={isLoading}
          size={buttonSizes.LARGE}
          text="Set Password"
          type={buttonTypes.SUBMIT}
          variant={buttonVariants.CONTAINED}
        />
      </form>
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
    </div>
  )
}

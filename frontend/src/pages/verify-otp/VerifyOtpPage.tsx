import { AnimatePresence } from 'motion/react'
import { FC } from 'react'
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
import { Icons } from '@/components/Icons'
import { inputTypes } from '@/components/Input/constants'
import { Input } from '@/components/Input/Input'
import { Loader } from '@/components/Loader/Loader'
import { useVerifyOtpMutation } from '@/store/api/authApi'

import styles from './VerifyOtpPage.module.scss'

export const VerifyOtpPage: FC = () => {
  const navigate = useNavigate()
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation()

  interface FormValues {
    otp: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    verifyOtp(data)
      .unwrap()
      .then((responseData) => {
        localStorage.setItem('userId', responseData.userId)
        localStorage.setItem('type', responseData.type)
        navigate('/set-password', { replace: true })
        const activateMessage =
          'Verification successful! Now you can set your password'
        const forrgotPassMessage =
          'Verification successful! Now you can set a new password'
        toast.success(
          responseData.type === 'activate'
            ? activateMessage
            : forrgotPassMessage
        )
      })
      .catch((error) => {
        if (error?.data?.errors && Array.isArray(error.data.errors)) {
          error.data.errors.forEach((err: { msg: string }) => {
            toast.error(err.msg)
          })
        } else if (typeof error?.data === 'string') {
          toast.error(error.data)
        } else {
          const errorMessage =
            error?.data?.message || 'Something went wrong. Please try again!'
          toast.error(errorMessage)
        }
      })
  }

  return (
    <div className={styles.container}>
      <Icons.Lock />
      <h2 className={styles.title}>
        Please enter the verification code
        <br /> you received in the email
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorMessage={errors.otp?.message}
          hookFormProps={{
            ...register('otp', {
              required: '* Verification code is required',
              pattern: {
                value: /^[0-9]{4}$/,
                message: '* Verification code must be 4 digits'
              }
            })
          }}
          id="otp"
          label="Code from email"
          type={inputTypes.TEXT}
        />
        <Button
          fullWidth
          color={buttonColors.DEFAULT}
          size={buttonSizes.LARGE}
          text="Send"
          type={buttonTypes.SUBMIT}
          variant={buttonVariants.CONTAINED}
        />
      </form>
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
    </div>
  )
}

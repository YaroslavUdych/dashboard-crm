import { AnimatePresence } from 'motion/react'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/Button/Button'
import {
  buttonColors,
  buttonSizes,
  buttonTypes,
  buttonVariants
} from '@/components/Button/constants'
import { Icons } from '@/components/Icons'
import {
  iconPositions,
  inputAutoCompletes,
  inputTypes
} from '@/components/Input/constants'
import { Input } from '@/components/Input/Input'
import { iconLinkPositions, linkTypes } from '@/components/Link/constants'
import { LinkComponent } from '@/components/Link/Link'
import { Loader } from '@/components/Loader/Loader'
import { useForgotPasswordMutation } from '@/store/api/authApi'

import styles from './ForgotPasswordPage.module.scss'

export const ForgotPasswordPage: FC = () => {
  interface FormValues {
    email: string
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      email: ''
    }
  })

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    forgotPassword(data)
      .unwrap()
      .then(() => {
        reset()
        toast.success(
          'The letter has been sent. Please check your email and follow the instructions'
        )
      })
      .catch((error) => {
        if (error?.data?.errors && Array.isArray(error.data.errors)) {
          error.data.errors.forEach((err: { msg: string }) => {
            toast.error(err.msg)
          })
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
      <h2 className={styles.title}>Forgot your password?</h2>
      <p className={styles.subtitle}>
        Please enter the email address associated with your account and
        we&apos;ll email you a link to reset your password.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          autocomplete={inputAutoCompletes.EMAIL}
          errorMessage={errors.email?.message}
          hookFormProps={{
            ...register('email', {
              required: '* Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '* Email must be valid'
              }
            })
          }}
          icon={<Icons.Mail />}
          iconPosition={iconPositions.START}
          id="email"
          label="Email address"
          type={inputTypes.EMAIL}
        />
        <Button
          fullWidth
          color={buttonColors.DEFAULT}
          size={buttonSizes.LARGE}
          text="Send request"
          type={buttonTypes.SUBMIT}
          variant={buttonVariants.CONTAINED}
        />
      </form>
      <div className={styles.link}>
        <LinkComponent
          icon={<Icons.ArrowLeft />}
          iconPosition={iconLinkPositions.START}
          text="Return to sign in"
          to="/signin"
          type={linkTypes.INTERNAL}
        />
      </div>

      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
    </div>
  )
}

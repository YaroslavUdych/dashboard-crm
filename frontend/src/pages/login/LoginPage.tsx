import { AnimatePresence } from 'motion/react'
import { FC } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { linkTypes } from '@/components/Link/constants'
import { LinkComponent } from '@/components/Link/Link'
import { Loader } from '@/components/Loader/Loader'
import { LoginForm } from '@/forms/LoginForm/LoginForm'
import { useLoginMutation } from '@/store/api/authApi'
import { saveUserAndTokenToLocalStorage } from '@/utils/authStorage'

import styles from './LoginPage.module.scss'

interface FormValues {
  userEmail: string
  password: string
}

export const LoginPage: FC = () => {
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const onSubmit = async (data: FormValues) => {
    await login({
      email: data.userEmail,
      password: data.password
    })
      .unwrap()
      .then((response) => {
        saveUserAndTokenToLocalStorage(response.user, response.accessToken)
        navigate('/')
        toast.success('Signed in successfully!')
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
    <div className={styles.loginContainer}>
      {/* remoove this div in production */}
      <div className={styles.demoText}>
        <p>⚠️ To test the app, use the following credentials:</p>
        <p>Email: udych.dev@gmail.com</p>
        <p>Password: udych.dev@gmail.com</p>
      </div>

      <div className={styles.loginText}>
        <h2 className={styles.formCardTitle}>Sign in to your account</h2>
        <div className={styles.forgotPassword}>
          <LinkComponent
            text="Forgot password?"
            to="/forgot-password"
            type={linkTypes.INTERNAL}
          />
        </div>
      </div>
      <LoginForm onSubmit={onSubmit} />
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
    </div>
  )
}

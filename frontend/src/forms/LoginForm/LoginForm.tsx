import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

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
import {
  iconPositions,
  inputAutoCompletes,
  inputTypes
} from '@/components/Input/constants'
import { Input } from '@/components/Input/Input'

import styles from './LoginForm.module.scss'

interface FormValues {
  userEmail: string
  password: string
}

interface LoginFormProps {
  onSubmit: SubmitHandler<FormValues>
}

/**
 * Login Form component.
 *
 * @category Forms
 *
 * This component renders a login form with email and password fields,
 * along with a submit button. It uses `react-hook-form` for form handling
 * and validation. The password field includes a toggle to show or hide
 * the password.
 *
 * @param {LoginFormProps} props - The props for the LoginForm component.
 * @param {function} props.onSubmit - Callback function to handle form submission.
 *
 * @returns {JSX.Element} The rendered login form component.
 *
 * @example
 * ```tsx
 * <LoginForm onSubmit={(data) => console.log(data)} />
 * ```
 */

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      userEmail: '',
      password: ''
    }
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <Input
        autocomplete={inputAutoCompletes.EMAIL}
        errorMessage={errors.userEmail?.message}
        hookFormProps={register('userEmail', {
          required: '* Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: '* Invalid email address'
          }
        })}
        id="login-email"
        label="Email"
        type={inputTypes.EMAIL}
      />
      <Input
        errorMessage={errors.password?.message}
        hookFormProps={register('password', {
          required: '* Password is required'
        })}
        icon={
          <IconButton
            icon={isPasswordVisible ? <Icons.Eye /> : <Icons.Eyelid />}
            size={iconButtonSizes.MEDIUM}
            onClick={togglePasswordVisibility}
          />
        }
        iconPosition={iconPositions.END}
        id="login-password"
        label="Password"
        type={isPasswordVisible ? inputTypes.TEXT : inputTypes.PASSWORD}
      />
      <Button
        fullWidth
        color={buttonColors.DEFAULT}
        size={buttonSizes.LARGE}
        text="Sign in"
        type={buttonTypes.SUBMIT}
        variant={buttonVariants.CONTAINED}
      />
    </form>
  )
}

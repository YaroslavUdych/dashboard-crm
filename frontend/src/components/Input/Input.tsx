import { FC, ReactNode } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import {
  IconPosition,
  iconPositions,
  InputAutoComplete,
  inputAutoCompletes,
  InputType
} from './constants'

import styles from './Input.module.scss'

import classNames from 'classnames'

interface InputProps {
  type: InputType
  id: string
  label: string
  hookFormProps: UseFormRegisterReturn
  errorMessage?: string
  autocomplete?: InputAutoComplete
  icon?: ReactNode
  iconPosition?: IconPosition
}

/**
 * Input component for rendering a styled input field with optional label, icon, and error message.
 * The component is designed to work with react-hook-form.
 * The component supports different input types, autocomplete settings, and icon positions.
 * The component uses constants for input types, autocomplete settings, and icon positions.
 *
 * @category Components
 *
 * @param {InputProps} props - The properties for the Input component.
 * @param {string} props.type - The type of the input. See `constants.ts` for available types.
 * @param {string} props.id - The unique identifier for the input element.
 * @param {string} props.label - The label text associated with the input.
 * @param {string} [props.errorMessage] - The error message to display below the input, if any.
 * @param {object} props.hookFormProps - The props object returned by the `useForm` hook from react-hook-form.
 * @param {string} [props.autocomplete=inputAutoCompletes.OFF] - The autocomplete attribute for the input, defaults to "off". See `constants.ts` for available settings.
 * @param {ReactNode} [props.icon] - An optional icon to display inside the input field.
 * @param {string} [props.iconPosition=iconPositions.START] - The position of the icon. See `constants.ts` for available positions.
 *
 * @returns {JSX.Element} A styled input component with optional label, icon, and error message.
 */
export const Input: FC<InputProps> = ({
  type,
  id,
  label,
  errorMessage,
  hookFormProps,
  autocomplete = inputAutoCompletes.OFF,
  icon,
  iconPosition = iconPositions.START
}) => {
  const inputGroupClass = classNames(styles.inputGroup, {
    [styles.iconStart]: !!icon && iconPosition === iconPositions.START,
    [styles.iconEnd]: !!icon && iconPosition === iconPositions.END
  })

  const errorMessageClass = classNames(styles.errorMessage, {
    [styles.show]: !!errorMessage
  })

  const iconClass = classNames(styles.icon, {
    [styles.positionStart]: iconPosition === iconPositions.START,
    [styles.positionEnd]: iconPosition === iconPositions.END
  })

  return (
    <div className={inputGroupClass}>
      {icon && iconPosition === iconPositions.START && (
        <span className={iconClass}>{icon}</span>
      )}
      <input
        autoComplete={autocomplete}
        className={styles.input}
        id={id}
        placeholder=""
        type={type}
        {...hookFormProps}
      />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {icon && iconPosition === iconPositions.END && (
        <span className={iconClass}>{icon}</span>
      )}
      <span className={errorMessageClass}>{errorMessage}</span>
    </div>
  )
}

import { FC, forwardRef, useState } from 'react'

import { placements } from '@/components/DropdownList/constants'
import { DropdownList } from '@/components/DropdownList/DropdownList'

import { Option } from './constants'

import styles from './Select.module.scss'

import classNames from 'classnames'

interface SelectProps {
  options: Option[]
  placeholder: string
  errorMessage?: string
  value: string | number | null
  onChange: (value: string | number | null) => void
}

/**
 * A custom `Select` component that provides a dropdown list for selecting options.
 * This is a proxy HOC that uses the `DropdownList` component to render the dropdown list.
 * The component supports a placeholder, error message, and a callback function for handling option selection.
 * This component can be used with react-hook-form to manage form state.
 * The component is wrapped with `forwardRef` to allow a parent component
 * to get a reference to the underlying HTML element.
 *
 * @category Components

 * @param {Object} props - The props for the `Select` component.

 * @param {Option[]} props.options - An array of options to display in the dropdown. Each option should have a `value` and `label`.
  See `Option` interface in `constants.ts`.
 * @param {string} props.placeholder - The placeholder text displayed when no option is selected.
 * @param {string} [props.errorMessage] - An optional error message to display below the dropdown.
 * @param {string | number} props.value - The currently selected value.
 * @param {(value: string | number) => void} props.onChange - Callback function triggered when an option is selected.
 * @param {React.Ref<HTMLDivElement>} ref - A forwarded ref to the root container of the component.
 *
 * @state
 * - `isOpen` (`boolean`): A state variable to manage the visibility of the dropdown list.
 *
 * @returns {JSX.Element} The rendered `Select` component.
 *
 * @example
 * ```tsx
  const options: Option[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' }
]

const [selectedValue, setSelectedValue] = useState<string | number | null>(null)

<Select
  options={options}
  placeholder="Select an option"
  value={selectedValue}
  onChange={(value: string | number | null) => setSelectedValue(value)}
/>
 * ```
 * or using with react-hook-form:
 * ```tsx
  import { Controller, useForm } from 'react-hook-form';
  import { Select } from '@/components/Select/Select';

  const yourOptions = [
   { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  ];

  const { control, handleSubmit, formState: { errors } } = useForm();

  // use inside form component
        <Controller
          control={control}
          name="someFieldName"
          render={({ field }) => (
            <Select
              {...field}
              errorMessage={errors.someFieldName?.message}
              options={yourOptions}
              placeholder="some placeholder"
            />
          )}
        />
 * ```
 */

export const Select: FC<SelectProps> = forwardRef<HTMLDivElement, SelectProps>(
  ({ options, placeholder, errorMessage, value, onChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const selectedOption = options.find((option) => option.value === value)

    const handleOptionClick = (option: Option) => {
      onChange(option.value)
      setIsOpen(false)
    }

    const errorMessageClass = classNames(styles.errorMessage, {
      [styles.visible]: !!errorMessage
    })

    const shouldShrinkLabel = isOpen || !!selectedOption
    const labelClass = classNames(styles.selectLabel, {
      [styles.shrink]: shouldShrinkLabel
    })

    const containerClass = classNames(styles.selectContainer, {
      [styles.active]: isOpen
    })

    return (
      <div ref={ref} className={containerClass}>
        <span className={labelClass}>{placeholder}</span>

        <DropdownList
          isOpen={isOpen}
          placement={placements.BOTTOM}
          trigger={
            <button
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              className={styles.selectButton}
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {selectedOption?.label}
              <span className={styles.arrow}></span>
            </button>
          }
          onClose={() => setIsOpen(false)}
        >
          {options.map((option) => {
            const optionClass = classNames(styles.selectOption, {
              [styles.selected]: selectedOption?.value === option.value
            })

            return (
              <button
                key={option.value}
                aria-selected={selectedOption?.value === option.value}
                className={optionClass}
                role="option"
                type="button"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            )
          })}
        </DropdownList>
        <div className={errorMessageClass}>{errorMessage}</div>
      </div>
    )
  }
)

Select.displayName = 'Select'

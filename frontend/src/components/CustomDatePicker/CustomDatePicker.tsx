import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

import { inputTypes } from '@/components/Input/constants'
import { Input } from '@/components/Input/Input'

interface CustomDatePickerProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  errorMessage?: string
}

/**
 * A custom date picker component that integrates with React Hook Form's `Controller`.
 * This component uses a `DatePicker` for date selection and a custom `Input` for rendering the input field.
 *
 * @category Components
 *
 * @param {CustomDatePickerProps<T>} props - The props for the `CustomDatePicker` component.
 * @param {Control<T>} props.control - The control object from React Hook Form for managing form state.
 * @param {Path<T>} props.name - The name of the field in the form.
 * @param {string} props.label - The label for the input field.
 * @param {string} [props.errorMessage] - An optional error message to display below the input field.
 *
 * @returns {JSX.Element} The rendered `CustomDatePicker` component.
 */

export const CustomDatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  errorMessage
}: CustomDatePickerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          format="DD/MM/YYYY"
          slots={{
            field: (params) => (
              <Input
                {...params}
                errorMessage={errorMessage}
                id={name as string}
                label={label}
                type={inputTypes.TEXT}
                value={params.inputProps?.value || ''}
                onChange={params.inputProps?.onChange}
                onClick={params.inputProps?.onClick}
              />
            )
          }}
          value={field.value ? dayjs(field.value) : null}
          onChange={(date) => field.onChange(date ? date : null)}
        />
      )}
    />
  )
}

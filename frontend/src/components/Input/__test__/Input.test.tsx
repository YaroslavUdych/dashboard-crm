import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, afterEach, expect, vi } from 'vitest'

import { Input } from '@/components/Input/Input'
import {
  inputTypes,
  iconPositions,
  inputAutoCompletes
} from '@/components/Input/constants'

describe('Input Component', () => {
  afterEach(cleanup)

  const mockHookFormProps = {
    name: 'test-input',
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn()
  }

  const renderInput = (props: Partial<React.ComponentProps<typeof Input>>) =>
    render(
      <Input
        {...{
          type: inputTypes.TEXT,
          id: 'test-id',
          label: 'Test Label',
          hookFormProps: mockHookFormProps,
          errorMessage: undefined,
          ...props
        }}
      />
    )

  it('should render correctly with label and id', () => {
    renderInput({})

    const inputElement = screen.getByRole('textbox', { name: 'Test Label' })

    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('id', 'test-id')

    const labelElement = screen.getByText('Test Label')
    expect(labelElement).toBeInTheDocument()
    expect(labelElement).toHaveAttribute('for', 'test-id')
  })

  it('should render an icon at the start position', () => {
    renderInput({
      icon: <span data-testid="icon">Icon</span>,
      iconPosition: iconPositions.START
    })

    const iconElement = screen.getByTestId('icon')

    expect(iconElement).toBeInTheDocument()
    expect(iconElement.parentElement?.className).toContain('positionStart')
    expect(iconElement.parentElement?.className).toContain('icon')
  })

  it('should render an icon at the end position', () => {
    renderInput({
      icon: <span data-testid="icon">Icon</span>,
      iconPosition: iconPositions.END
    })

    const iconElement = screen.getByTestId('icon')

    expect(iconElement).toBeInTheDocument()
    expect(iconElement.parentElement?.className).toContain('positionEnd')
    expect(iconElement.parentElement?.className).toContain('icon')
  })

  it('should apply error message styles and displays error text', () => {
    const errorMessage = 'This field is required'

    renderInput({
      errorMessage: errorMessage
    })

    const errorElement = screen.getByText(errorMessage)

    expect(errorElement).toBeInTheDocument()
    expect(errorElement.className).toContain('errorMessage')
    expect(errorElement.className).toContain('show')
  })

  it.each(Object.values(inputAutoCompletes))(
    'should render correct all autocomplete attributes',
    (autoComplete) => {
      renderInput({ autocomplete: autoComplete })

      const inputElement = screen.getByLabelText('Test Label')

      expect(inputElement).toHaveAttribute('autocomplete', autoComplete)
    }
  )

  it.each(Object.values(inputTypes))(
    'should render correct all input types',
    (type) => {
      renderInput({ type })

      const inputElement = screen.getByLabelText('Test Label')

      expect(inputElement).toHaveAttribute('type', type)
    }
  )
})

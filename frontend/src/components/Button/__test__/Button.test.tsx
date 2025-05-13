import { cleanup, render, screen } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/Button/Button'
import {
  buttonTypes,
  buttonSizes,
  buttonColors,
  buttonVariants
} from '@/components/Button/constants'

describe('Button component', () => {
  afterEach(cleanup)

  const mockOnClick = vi.fn()

  const defaultProps = {
    type: buttonTypes.BUTTON,
    color: buttonColors.DEFAULT,
    size: buttonSizes.MEDIUM,
    text: 'Click Me',
    variant: buttonVariants.CONTAINED,
    onClick: mockOnClick
  }

  it('should render correctly text', () => {
    render(<Button {...defaultProps} />)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('should render disabled button', () => {
    render(<Button {...defaultProps} disabled />)
    const button = screen.getByText('Click Me')

    expect(button).toBeDisabled()
  })

  it('should render correct class based on props', () => {
    render(
      <Button
        {...defaultProps}
        color="primary"
        size="large"
        variant="outlined"
      />
    )
    const button = screen.getByText('Click Me')

    expect(button.className).toContain('primary')
    expect(button.className).toContain('large')
    expect(button.className).toContain('outlined')
  })

  it('should call onClick function when clicked', async () => {
    render(<Button {...defaultProps} />)
    const button = screen.getByText('Click Me')
    await userEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should render ripple effect when clicked', async () => {
    render(<Button {...defaultProps} />)

    const button = screen.getByText('Click Me')
    await userEvent.click(button)

    const rippleContainer = button.querySelector('.ripple-container')
    expect(rippleContainer).toBeInTheDocument()
    expect(rippleContainer?.children.length).toBeGreaterThan(0)
  })

  it.each(Object.values(buttonTypes))(
    'should render correctly with different types',
    async (type) => {
      render(<Button {...defaultProps} type={type} />)
      const button = screen.getByText('Click Me')

      expect(button).toHaveAttribute('type', type)
    }
  )

  it.each(Object.values(buttonColors))(
    'should render correctly with different colors',
    async (color) => {
      render(<Button {...defaultProps} color={color} />)
      const button = screen.getByText('Click Me')

      expect(button.className).toContain(color)
    }
  )

  it.each(Object.values(buttonSizes))(
    'should render correctly with different sizes',
    async (size) => {
      render(<Button {...defaultProps} size={size} />)
      const button = screen.getByText('Click Me')

      expect(button.className).toContain(size)
    }
  )

  it.each(Object.values(buttonVariants))(
    'should render correctly with different variants',
    async (variant) => {
      render(<Button {...defaultProps} variant={variant} />)
      const button = screen.getByText('Click Me')

      expect(button.className).toContain(variant)
    }
  )
})

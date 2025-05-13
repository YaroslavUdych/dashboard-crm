import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import { describe, it, afterEach, expect, vi } from 'vitest'
import { IconButton } from '@/components/IconButton/IconButton'
import { iconButtonSizes } from '@/components/IconButton/constants'

describe('IconButton component', () => {
  afterEach(cleanup)

  const mockOnClick = vi.fn()

  const defaultProps = {
    icon: <svg data-testid="icon" />,
    size: iconButtonSizes.MEDIUM,
    onClick: mockOnClick
  }

  it('should render correctly with default props', () => {
    render(<IconButton {...defaultProps} />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button.className).toContain('medium')
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should call onClick function when clicked', () => {
    render(<IconButton {...defaultProps} />)

    const button = screen.getByRole('button')
    fireEvent.mouseDown(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should render ripple effect when clicked', () => {
    render(<IconButton {...defaultProps} />)

    const button = screen.getByRole('button')
    fireEvent.mouseDown(button)
    const rippleContainer = button.querySelector('.ripple-container')

    expect(rippleContainer).toBeInTheDocument()
    expect(rippleContainer?.children.length).toBeGreaterThan(0)
  })

  it('should render with bordered class when bordered prop is true', () => {
    render(<IconButton {...defaultProps} bordered />)

    const button = screen.getByRole('button')

    expect(button.className).toContain('bordered')
  })

  it('should render with disabled class when disabled prop is true', () => {
    render(<IconButton {...defaultProps} disabled />)
    const button = screen.getByRole('button')

    expect(button.className).toContain('disabled')
  })

  it.each(Object.values(iconButtonSizes))(
    'should render with different sizes',
    (size) => {
      render(<IconButton {...defaultProps} size={size} />)
      const button = screen.getByRole('button')

      expect(button.className).toContain(size)
    }
  )
})

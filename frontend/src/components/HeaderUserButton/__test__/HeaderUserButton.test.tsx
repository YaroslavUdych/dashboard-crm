import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import { describe, it, afterEach, expect, vi } from 'vitest'
import { HeaderUserButton } from '@/components/HeaderUserButton/HeaderUserButton'

describe('HeaderUserButton component', () => {
  afterEach(cleanup)
  const mockOnClick = vi.fn()
  const userAvatar = 'https://example.com/avatar.jpg'

  it('should render button with user avatar', () => {
    render(<HeaderUserButton onClick={mockOnClick} userAvatar={userAvatar} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()

    const avatarImage = screen.getByAltText('User avatar')
    expect(avatarImage).toBeInTheDocument()
    expect(avatarImage).toHaveAttribute('src', userAvatar)
  })

  it('should call onClick function when button is clicked', () => {
    render(<HeaderUserButton onClick={mockOnClick} userAvatar={userAvatar} />)

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should have userButton class', () => {
    render(<HeaderUserButton onClick={mockOnClick} userAvatar={userAvatar} />)

    const button = screen.getByRole('button')

    expect(button.className).toContain('userButton')
  })
})

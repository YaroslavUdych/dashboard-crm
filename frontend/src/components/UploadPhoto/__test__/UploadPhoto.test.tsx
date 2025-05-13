import {
  render,
  cleanup,
  screen,
  fireEvent,
  waitFor
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, afterEach, expect, vi } from 'vitest'

import { UploadPhoto } from '@/components/UploadPhoto/UploadPhoto'
import { DEFAULT_AVATAR } from '@/components/UploadPhoto/constants'

vi.mock('@/components/UploadPhoto/constants', () => ({
  AVATAR_LIST: [
    'https://example.com/avatar1.jpg',
    'https://example.com/avatar2.jpg'
  ],
  DEFAULT_AVATAR: 'https://example.com/default-avatar.jpg'
}))

describe('UploadPhoto component', () => {
  afterEach(cleanup)
  const mockRegister = {
    name: 'avatar',
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn()
  }

  it('should render correctly with default avatar', () => {
    render(<UploadPhoto register={mockRegister} />)

    const avatarImage = screen.getByAltText('Avatar')
    expect(avatarImage).toBeInTheDocument()
    expect(avatarImage).toHaveAttribute('src', DEFAULT_AVATAR)
  })

  it('should render correctly with provided user avatar', () => {
    const userAvatar = 'https://example.com/avatar.jpg'
    render(<UploadPhoto register={mockRegister} userAvatar={userAvatar} />)

    const avatarImage = screen.getByAltText('Avatar')
    expect(avatarImage).toHaveAttribute('src', userAvatar)
  })

  it('should call register.onChange when a file is uploaded', () => {
    render(<UploadPhoto register={mockRegister} />)

    const fileInput = screen.getByLabelText('Upload photo')
    const file = new File(['dummy content'], 'avatar.png', {
      type: 'image/png'
    })

    fireEvent.change(fileInput, { target: { files: [file] } })

    expect(mockRegister.onChange).toHaveBeenCalledTimes(1)
    expect(mockRegister.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: 'avatar',
          value: file
        })
      })
    )
  })

  it('should update preview when a new avatar is selected from AVATAR_LIST', async () => {
    render(<UploadPhoto register={mockRegister} />)

    const firstAvatar = 'https://example.com/avatar1.jpg'
    const avatarButton = screen.getByRole('button', { name: /avatar 0/i })

    await userEvent.click(avatarButton)

    await waitFor(() => {
      const avatarImage = screen.getByAltText('Avatar')
      // console.log('Avatar src after click:', avatarImage.getAttribute('src'))
      expect(avatarImage).toHaveAttribute('src', firstAvatar)
    })

    //  console.log('onChange calls:', mockRegister.onChange.mock.calls)

    const firstCallValue = mockRegister.onChange.mock.calls[0][0].target.value
    const secondCallValue =
      mockRegister.onChange.mock.calls[1]?.[0]?.target?.value

    //  console.log('First call value:', firstCallValue)
    //  console.log('Second call value:', secondCallValue)

    expect(
      typeof firstCallValue === 'string' || typeof secondCallValue === 'string'
    ).toBe(true)

    expect(
      typeof firstCallValue === 'string' || firstCallValue instanceof File
    ).toBe(true)
  })
})

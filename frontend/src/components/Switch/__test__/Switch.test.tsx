import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { describe, it, afterEach, expect, vi } from 'vitest'
import { Switch } from '@/components/Switch/Switch'

describe('Switch component', () => {
  afterEach(cleanup)

  it('should render correctly with default props', () => {
    render(<Switch id="switch" checked={false} onChange={() => {}} />)

    const switchInput = screen.getByRole('checkbox')

    expect(switchInput).toBeInTheDocument()
    expect(switchInput).not.toBeChecked()
    expect(switchInput).not.toBeDisabled()
    expect(switchInput).toHaveAttribute('id', 'switch')
  })

  it('should render correctly when checked', () => {
    render(<Switch id="switch" checked={true} onChange={() => {}} />)

    const switchInput = screen.getByRole('checkbox')

    expect(switchInput).toBeChecked()
  })

  it('should render correctly when disabled', () => {
    render(<Switch id="switch" checked={false} disabled onChange={() => {}} />)

    const switchInput = screen.getByRole('checkbox')

    expect(switchInput).toBeDisabled()
  })

  it('should call onChange handler when toggled', () => {
    const handleChange = vi.fn()

    render(<Switch id="switch" checked={false} onChange={handleChange} />)

    const switchInput = screen.getByRole('checkbox')

    fireEvent.click(switchInput)
    fireEvent.click(switchInput)

    expect(handleChange).toHaveBeenCalledTimes(2)
  })

  it('should not call onChange handler when disabled', () => {
    const handleChange = vi.fn()
    render(
      <Switch id="switch" checked={false} disabled onChange={handleChange} />
    )

    const switchInput = screen.getByRole('checkbox')

    fireEvent.click(switchInput)

    expect(handleChange).not.toHaveBeenCalled()
  })
})

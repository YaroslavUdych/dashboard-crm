import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, beforeAll, afterAll, afterEach, expect } from 'vitest'
import { Loader } from '@/components/Loader/Loader'

// create root div for portal
beforeAll(() => {
  const rootDiv = document.createElement('div')
  rootDiv.setAttribute('id', 'themeContainer')
  document.body.appendChild(rootDiv)
})

afterAll(() => {
  document.getElementById('themeContainer')?.remove()
})

describe('Loader Component', () => {
  afterEach(cleanup)

  it('should render correctly', () => {
    render(<Loader />)

    const loaderWrap = screen.getByTestId('loader-wrap')
    expect(loaderWrap).toBeInTheDocument()
  })

  it('should render loader in div with id "themeContainer"', () => {
    render(<Loader />)

    const portalContainer = document.getElementById('themeContainer')
    expect(portalContainer?.childElementCount).toBeGreaterThan(0)
  })
})

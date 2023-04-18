import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  test('renders button with correct text', () => {
    const buttonText = 'Click me!'
    render(<Button text={buttonText} event={() => {}} />)
    const buttonElement = screen.getByText(buttonText)
    expect(buttonElement).toBeInTheDocument()
  })

  test('calls event handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button text="Click me!" event={handleClick} />)
    const buttonElement = screen.getByText('Click me!')
    fireEvent.click(buttonElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})

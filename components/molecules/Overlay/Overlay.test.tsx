import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { Overlay } from './Overlay'

describe('Overlay', () => {
  it('should not render the overlay when the "open" prop is false', () => {
    const { container } = render(
      <Overlay open={false} setOpen={() => {}}>
        <div>Some content</div>
      </Overlay>
    )

    expect(container.firstChild).toBeNull()
  })

  it('should render the overlay and its children when the "open" prop is true', () => {
    const { getByTestId, getByText } = render(
      <Overlay open={true} setOpen={() => {}}>
        <div>Some content</div>
      </Overlay>
    )

    const overlay = getByTestId('overlay')
    expect(overlay).toBeInTheDocument()

    const content = getByText('Some content')
    expect(content).toBeInTheDocument()
  })

  it('should call the "setOpen" function when clicking on the overlay or close button', () => {
    const setOpen = jest.fn()

    const { getByTestId, getByAltText } = render(
      <Overlay open={true} setOpen={setOpen}>
        <div>Some content</div>
      </Overlay>
    )

    const overlay = getByTestId('overlay')
    fireEvent.click(overlay)
    expect(setOpen).toHaveBeenCalledTimes(1)

    const closeButton = getByAltText('Close')
    fireEvent.click(closeButton)
    expect(setOpen).toHaveBeenCalledTimes(2)
  })
})

import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Loader } from './Loader'

describe('Loader', () => {
  it('should render a loader component', () => {
    const { getByTestId } = render(<Loader />)
    const loaderContainer = getByTestId('loader-container')
    expect(loaderContainer).toBeInTheDocument()
    const loaderElement = loaderContainer.firstChild
    expect(loaderElement).toHaveClass('loader')
  })
})

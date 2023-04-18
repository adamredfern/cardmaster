import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  it('should render the title', () => {
    const { getByText } = render(<Header title="Test" />)

    const title = getByText('Test')
    expect(title).toBeInTheDocument()
  })

  it('should render the children', () => {
    const { getByText } = render(
      <Header title="Test">
        <div>Child 1</div>
        <div>Child 2</div>
      </Header>
    )

    const child1 = getByText('Child 1')
    expect(child1).toBeInTheDocument()

    const child2 = getByText('Child 2')
    expect(child2).toBeInTheDocument()
  })
})

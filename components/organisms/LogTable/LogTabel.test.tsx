import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Log } from 'types'
import { LogTable } from './LogTable'

const mockData: Log[] = [
  { timestamp: 1681820801748, message: 'Log message 1' },
  { timestamp: 1682020801748, message: 'Log message 2' },
]

describe('LogTable component', () => {
  it('renders table headers', () => {
    const { getByText } = render(<LogTable data={mockData} />)
    expect(getByText('Timestamp')).toBeInTheDocument()
    expect(getByText('Action')).toBeInTheDocument()
  })

  it('renders table rows with correct data', () => {
    const { getByText } = render(<LogTable data={mockData} />)
    expect(getByText('Tue Apr 18 2023 13:26:41 GMT+0100 (British Summer Time)')).toBeInTheDocument()
    expect(getByText('Thu Apr 20 2023 21:00:01 GMT+0100 (British Summer Time)')).toBeInTheDocument()
    expect(getByText('Log message 1')).toBeInTheDocument()
    expect(getByText('Log message 2')).toBeInTheDocument()
  })
})

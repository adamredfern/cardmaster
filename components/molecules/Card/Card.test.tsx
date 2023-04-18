import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'redux/store'
import { Card as CardType } from 'types'
import { Card } from './Card'

describe('Card component', () => {
  const card: CardType = {
    id: '1',
    cardName: 'Test Card',
    cardNumber: '1234 - 5678 - 9012 - 3456',
    bank: 'HSBC',
    balance: 1000,
    overdraft: undefined,
    cardType: 'debit',
    limit: undefined,
    transferFee: 0.01,
  }

  it('should render the card details correctly', () => {
    render(
      <Provider store={store}>
        <Card card={card} index={0} />
      </Provider>
    )

    // Check that card details are rendered correctly
    expect(screen.getByText('Card name')).toBeInTheDocument()
    expect(screen.getByText('Test Card')).toBeInTheDocument()
    expect(screen.getByText('Card number')).toBeInTheDocument()
    expect(screen.getByText('∗∗∗∗ - ∗∗∗∗ - ∗∗∗∗ - 3456')).toBeInTheDocument()
    expect(screen.getByText('Balance:')).toBeInTheDocument()
    expect(screen.getByText('£1,000.00')).toBeInTheDocument()
    expect(screen.getByText('Transfer Fee:')).toBeInTheDocument()
    expect(screen.getByText('1%')).toBeInTheDocument()
  })
  
  it('should open the passcode overlay on clicking the "Show Card Number" button', () => {
    render(
      <Provider store={store}>
        <Card card={card} index={0} />
      </Provider>
    )

    // Check that the passcode overlay is initially closed
    expect(screen.queryByText('Unlock Card Number')).not.toBeInTheDocument()

    // Click the "Show Card Number" button
    const showNumberButton = screen.getByAltText('Show Card Number')
    fireEvent.click(showNumberButton)

    // Check that the passcode overlay is now open
    expect(screen.getByText('Unlock Card Number')).toBeInTheDocument()
  })
})

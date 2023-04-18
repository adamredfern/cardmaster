import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'redux/store'
import { Card as CardType } from 'types'
import { CardList } from './CardList'

const cards: CardType[] = [
  {
    id: '1',
    cardName: 'Test Card',
    cardNumber: '1234 - 5678 - 9012 - 3456',
    bank: 'HSBC',
    balance: 1000,
    overdraft: undefined,
    cardType: 'debit',
    limit: undefined,
    transferFee: 0.01,
  },
  {
    id: '2',
    cardName: 'Test Card 2',
    cardNumber: '9456 - 1211 - 3433 - 3455',
    bank: 'TSB',
    balance: 2123,
    overdraft: undefined,
    cardType: 'credit',
    limit: undefined,
    transferFee: 0.1,
  },
]

describe('CardList', () => {
  it('should render the title and the correct number of cards', () => {
    const { getByText, getAllByTestId } = render(
      <Provider store={store}>
        <CardList title="Test" cards={cards} />
      </Provider>
    )

    const title = getByText('Test (2)')
    expect(title).toBeInTheDocument()

    const renderedCards = getAllByTestId('card')
    expect(renderedCards).toHaveLength(cards.length)

    renderedCards.forEach((card, index) => {
      expect(card).toHaveTextContent(cards[index].cardName)
      expect(card).toHaveTextContent(cards[index].cardNumber.slice(-4))
    })
  })

  it('should render a message when no cards are provided', () => {
    const { getByText } = render(<CardList title="Test" cards={[]} />)

    const message = getByText('No cards found.')
    expect(message).toBeInTheDocument()
  })
})

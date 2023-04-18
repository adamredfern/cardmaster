import { Card } from 'components/molecules/Card'
import { Card as CardType } from 'types'
import styles from './CardList.module.scss'

interface CardListProps {
  title: string
  cards: CardType[]
}

export const CardList = ({ title, cards }: CardListProps) => {
  return (
    <div className={styles.list}>
      <h2>
        {title} ({cards.length})
      </h2>
      {cards.length > 0 ? (
        <ul>
          {cards.map((card, index) => (
            <Card key={card.id} card={card} index={index} testId={'card'} />
          ))}
        </ul>
      ) : (
        <p>
          <em>No cards found.</em>
        </p>
      )}
    </div>
  )
}

import Image from 'next/image'
import { useState, FormEvent } from 'react'
import { toast, ToastOptions } from 'react-toastify'
import { formatter } from 'helpers'
import { Button } from 'components/atoms/Button'
import { Overlay } from 'components/molecules/Overlay'
import {
  useRemoveCardMutation,
  useLogEventMutation,
} from 'redux/services/apiSlice'
import { Card as CardType } from 'types'
import styles from './Card.module.scss'

interface CardProps {
  card: CardType
  index: number
  testId?: string;
}

declare module 'react' {
  export interface HTMLAttributes<T> {
    index?: number
  }
}

export const Card = ({ card, index, testId }: CardProps) => {
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [seeCardNumber, setSeeCardNumber] = useState(false)
  const last4DigitsCardNum = card.cardNumber.slice(card.cardNumber.length - 4)

  const [removeCard] = useRemoveCardMutation()
  const [logEvent] = useLogEventMutation()

  const handleRemove = (id: string) => {
    removeCard({ id })
    logEvent({ message: 'Card removed from account' })
  }

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault()

    const config: ToastOptions = {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    }
    if (passcode === 'passcode') {
      setSeeCardNumber(true)
      toast.success('Card number unlocked', config)
    } else {
      toast.error('Incorrect passcode', config)
    }
    setOverlayOpen(false)
    setPasscode('')
  }

  return (
    <>
      <Overlay open={overlayOpen} setOpen={setOverlayOpen}>
        <h2>Unlock Card Number</h2>
        <form>
          <label>Passcode</label>
          <input
            type="password"
            name="passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="'passcode' is the passcode"
          />
          <Button text="Unlock" event={(e: FormEvent) => handleUnlock(e)} />
        </form>
      </Overlay>

      <div className={styles.container} data-testid={testId ?? ""}>
        <div className={`${styles.card}`} index={index}>
          <div className={styles.info}>
            <div className={styles.cardName}>
              <span>Card name</span>
              <span>{card.cardName}</span>
            </div>
            <span className={styles.cardNumber}>
              <span>Card number</span>
              {seeCardNumber && (
                <>
                  <span>{card.cardNumber}</span>
                  <div
                    className={styles.showNumber}
                    onClick={() => setSeeCardNumber(false)}
                  >
                    <Image
                      src={'/icons/eye-shut.svg'}
                      alt={'Hide Card Number'}
                      width={24}
                      height={24}
                    />
                  </div>
                </>
              )}
              {!seeCardNumber && (
                <>
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        '&lowast;&lowast;&lowast;&lowast; - &lowast;&lowast;&lowast;&lowast; - &lowast;&lowast;&lowast;&lowast; - ' +
                        last4DigitsCardNum,
                    }}
                  ></span>
                  <div
                    className={styles.showNumber}
                    onClick={() => setOverlayOpen(true)}
                  >
                    <Image
                      src={'/icons/eye.svg'}
                      alt={'Show Card Number'}
                      width={24}
                      height={24}
                    />
                  </div>
                </>
              )}
            </span>
          </div>
          <div className={styles.remove}>
            <button onClick={() => handleRemove(card.id)}>
              <Image
                src={'/icons/trash.svg'}
                alt="Delete Card"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
        <div className={styles.details}>
          <span>
            <strong>Balance: </strong> {formatter.format(card.balance)}
          </span>
          {card.overdraft !== undefined && card.cardType === 'debit' && (
            <span>
              <strong>Overdraft: </strong> {formatter.format(card.overdraft)}
            </span>
          )}
          {card.limit !== undefined &&
            card.cardType === 'credit' &&
            card.limit > 0 && (
              <span>
                <strong>Limit: </strong> {formatter.format(card.limit)}
              </span>
            )}
          {card.transferFee !== undefined &&
            card.transferFee &&
            card.transferFee > 0 && (
              <span>
                <strong>Transfer Fee: </strong> {card.transferFee * 100}%
              </span>
            )}
        </div>
      </div>
    </>
  )
}

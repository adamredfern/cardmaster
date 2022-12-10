import { FormEvent, useState } from 'react'
import { toast, ToastOptions } from 'react-toastify'
import { Button } from 'components/atoms/Button'
import { useTransferBalanceMutation } from 'redux/services/apiSlice'
import { Card } from 'types'
import styles from 'components/organisms/Forms/Forms.module.scss'

interface TransferBalanceFormProps {
  setOpen: any
  cards: Card[]
}

export const TransferBalanceForm = ({
  setOpen,
  cards,
}: TransferBalanceFormProps) => {
  const initFormDataState = {
    fromId: cards[0].id,
    toId: cards[1].id,
    amount: 0,
  }
  const [formData, setFormData] = useState(initFormDataState)
  const [transferBalance] = useTransferBalanceMutation()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() })
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

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

    if (formData.fromId === '' || formData.toId === '') {
      return toast.error('Please fill out all required fields', config)
    }

    try {
      await transferBalance(formData).unwrap()
      toast.success('Transfer made successfully', config)
    } catch (error: any) {
      toast.error(
        error.data.message ?? 'Unable to transfer balance, please try again',
        config
      )
    }
    setFormData(initFormDataState)
    setOpen(false)
  }

  return (
    <>
      <div className={styles.form}>
        <h2>Transfer Balance</h2>
        <form>
          <div>
            <label htmlFor="fromId">From Account:</label>
            <select
              name="fromId"
              value={formData.fromId}
              onChange={handleChange}
            >
              {cards.map((card) => (
                <option value={card.id} key={card.id}>
                  {card.cardName} ({card.cardType})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="toId">To Account:</label>
            <select name="toId" value={formData.toId} onChange={handleChange}>
              {cards.map((card) => (
                <option value={card.id} key={card.id}>
                  {card.cardName} ({card.cardType})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="amount">Amount in £</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="100.00"
            />
          </div>
          <Button text="Transfer" event={(e: FormEvent) => onSubmit(e)} />
        </form>
      </div>
    </>
  )
}

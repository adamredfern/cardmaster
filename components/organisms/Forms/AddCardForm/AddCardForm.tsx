import { useState, FormEvent } from 'react'
import { toast, ToastOptions } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import {
  useAddCardMutation,
  useLogEventMutation,
} from 'redux/services/apiSlice'
import { Button } from 'components/atoms/Button'
import { Card } from 'types'
import styles from 'components/organisms/Forms/Forms.module.scss'

interface AddCardFormProps {
  setOpen: any
}

export const AddCardForm = ({ setOpen }: AddCardFormProps) => {
  const [addCard] = useAddCardMutation()
  const [logEvent] = useLogEventMutation()

  const initFormDataState = {
    id: uuidv4(),
    cardType: 'credit' as 'credit' | 'debit',
    cardName: '',
    cardNumber: '',
    bank: '',
    balance: 0,
    limit: 0,
    overdraft: 0,
    transferFee: 0,
  }
  const [formData, setFormData] = useState<Card>(initFormDataState)

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

    if (
      formData.cardName === '' ||
      formData.cardNumber === '' ||
      formData.bank === ''
    ) {
      return toast.error('Please fill out all required fields', config)
    }

    try {
      formData.balance = Number(formData.balance)
      formData.limit = Number(formData.limit)
      formData.overdraft = Number(formData.overdraft)
      formData.transferFee = Number(formData.transferFee)
      await addCard(formData).unwrap()
      logEvent({ message: 'Card added to account' })
      toast.success('Card added successfully', config)
    } catch (error: any) {
      toast.error(
        error.data.message ?? 'Unable to add card, please try again',
        config
      )
    }
    setFormData(initFormDataState)
    setOpen(false)
  }

  return (
    <>
      <div className={styles.form}>
        <h2>Add a card</h2>
        <form>
          <div>
            <label htmlFor="cardType">
              Card Type <span className={styles.required}>*</span>
            </label>
            <select
              name="cardType"
              value={formData.cardType}
              onChange={handleChange}
            >
              <option value={'credit'}>Credit</option>
              <option value={'debit'}>Debit</option>
            </select>
          </div>

          <div>
            <label htmlFor="cardName">
              Card Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="cardName"
              placeholder="AMEX Platinum"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="cardNumber">
              Card Number <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1111-2222-3333-4444"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="bank">
              Bank <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="bank"
              placeholder="AMEX"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="balance">
              Balance <span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              name="balance"
              min={0}
              max={10000000}
              placeholder="1000.00"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="limit">Credit Limit (if applicable)</label>
            <input
              type="number"
              name="limit"
              min={0}
              max={10000000}
              placeholder="5000.00"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="overdraft">Overdraft (if applicable)</label>
            <input
              type="number"
              name="overdraft"
              min={0}
              max={10000000}
              placeholder="1000.00"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="transferFee">Transfer Fee (if applicable)</label>
            <input
              type="number"
              name="transferFee"
              min={0}
              max={1}
              placeholder="0.012"
              onChange={handleChange}
            />
          </div>

          <Button text="Add" event={(e: FormEvent) => onSubmit(e)} />
        </form>
      </div>
    </>
  )
}

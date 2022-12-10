export type Card = {
  id: string
  cardType: 'credit' | 'debit'
  cardName: string
  cardNumber: string
  bank: string
  balance: number
  limit?: number
  overdraft?: number
  transferFee?: number
}

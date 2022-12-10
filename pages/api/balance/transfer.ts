import fs from 'fs'
import { dataFile, formatter } from 'helpers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiReturnResponse, Card } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiReturnResponse>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Incorrect HTTP method' })
    return
  }

  if (
    !req.body.fromId ||
    !req.body.toId ||
    !req.body.amount ||
    req.body.amount <= 0
  ) {
    res.status(401).send({ message: 'Please fill out all required fields' })
    return
  }

  try {
    const data: Card[] = JSON.parse(fs.readFileSync(dataFile, 'utf8'))

    const fromAccount: Card = data.filter(
      (card) => card.id === req.body.fromId
    )[0]
    const toAccount: Card = data.filter((card) => card.id === req.body.toId)[0]

    const amount = Number(req.body.amount)
    const fromAccountTransferFee = Number(fromAccount.transferFee)
    const fromAccountBalance = Number(fromAccount.balance)
    const fromAccountLimit = Number(fromAccount.limit)
    const toAccountBalance = Number(toAccount.balance)

    if (!fromAccount || !toAccount) throw ''

    let amountAfterFee = amount
    let fee = 0

    if (fromAccount.transferFee && fromAccountTransferFee > 0) {
      const multiplier = 1 - fromAccountTransferFee
      amountAfterFee = amount * multiplier
      fee = amount - amountAfterFee
    }

    if (fromAccount.cardType === 'debit') {
      const testTranscation = fromAccountBalance - amount
      if (testTranscation < 0)
        return res
          .status(400)
          .json({ message: 'Insufficent funds to complete transfer' })
    }

    if (fromAccount.cardType === 'credit') {
      const testTranscation = fromAccountBalance - amount
      const limit = fromAccountLimit ?? 0
      if (testTranscation < -limit)
        return res.status(400).json({
          message: 'Your credit limit is too low to make this transfer',
        })
    }

    if (toAccount.cardType === 'credit') {
      const testTranscation = toAccountBalance + amountAfterFee
      if (testTranscation > 0)
        return res.status(400).json({
          message: 'Amount too large, only pay off your debt and no extra',
        })
    }

    fromAccount.balance = fromAccountBalance - amount
    toAccount.balance = toAccountBalance + Number(amountAfterFee)

    fs.writeFileSync(dataFile, JSON.stringify(data))

    const logMessage = `Transferred ${formatter.format(
      Number(amountAfterFee)
    )} <br /> from Card ID: ${fromAccount.id} <br /> to Card ID: ${
      toAccount.id
    }. ${
      fee > 0 && fromAccount.transferFee
        ? `<br /> Incurred a fee of: ${formatter.format(fee)} calculated at ${
            fromAccount.transferFee * 100
          }%`
        : ''
    }`
    await fetch('http://localhost:3000/api/log/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: logMessage,
      }),
    })

    res.status(200).json(data)
    return
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Could not transfer funds, please try again' })
  }
}

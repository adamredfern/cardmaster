import fs from 'fs'
import { dataFile } from 'helpers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiReturnResponse, Card } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiReturnResponse | Card[]>
) {
  if (req.method !== 'PATCH') {
    res.status(405).send({ message: 'Incorrect HTTP method' })
    return
  }

  if (!req.body.id && !req.body.amount) {
    res.status(401).send({ message: 'Please fill out all required fields' })
    return
  }

  try {
    const data: Card[] = JSON.parse(fs.readFileSync(dataFile, 'utf8'))

    const card: Card = data.filter((card: Card) => card.id === req.body.id)[0]
    if (!card) throw ''

    card.balance = card.balance + Number(req.body.amount)

    fs.writeFileSync(dataFile, JSON.stringify(data))
    res.status(200).json(data)
    return
  } catch (err) {
    res.status(500).json({ message: 'Failed to update card balance' })
  }
}

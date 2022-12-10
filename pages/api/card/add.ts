import fs from 'fs'
import { dataFile } from 'helpers'
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
    !req.body.id &&
    !req.body.cardType &&
    !req.body.cardName &&
    !req.body.bank &&
    !req.body.balance
  ) {
    res.status(401).send({ message: 'Please fill out all required fields' })
    return
  }

  try {
    const data: Card[] = JSON.parse(fs.readFileSync(dataFile, 'utf8'))

    if (data.length >= 5) {
      res.status(400).json({
        message: 'You cannot have any more cards at this time.',
      })
      return
    }

    data.push(req.body)
    fs.writeFileSync(dataFile, JSON.stringify(data))
    res.status(200).json(data)
    return
  } catch (err) {
    res.status(500).json({ message: 'Failed to add new card' })
  }
}

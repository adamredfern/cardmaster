import fs from 'fs'
import { dataFile } from 'helpers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiReturnResponse, Card } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiReturnResponse>
) {
  if (req.method !== 'DELETE') {
    res.status(405).send({ message: 'Incorrect HTTP method' })
    return
  }

  if (!req.body.id) {
    res.status(401).send({ message: 'Please fill out all required fields' })
    return
  }

  try {
    const data: Card[] = JSON.parse(fs.readFileSync(dataFile, 'utf8'))
    const card: Card[] = data.filter((card: Card) => card.id === req.body.id)

    if (card.length <= 0) throw ''

    const dataWithoutCard = data.filter((card: Card) => card.id !== req.body.id)
    fs.writeFileSync(dataFile, JSON.stringify(dataWithoutCard))
    res.status(200).json(dataWithoutCard)
    return
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove card' })
  }
}

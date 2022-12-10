import fs from 'fs'
import { logFile } from 'helpers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Log } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Incorrect HTTP method' })
    return
  }

  if (!req.body.message) {
    res.status(401).send({ message: 'Please fill out all required fields' })
    return
  }

  try {
    const data: Log[] = JSON.parse(fs.readFileSync(logFile, 'utf8'))

    data.push({ timestamp: Date.now(), message: req.body.message })
    fs.writeFileSync(logFile, JSON.stringify(data))

    res.status(200).json({ message: 'Log entry created' })
    return
  } catch (err) {
    res.status(500).json({ message: 'Failed to log entry' })
  }
}

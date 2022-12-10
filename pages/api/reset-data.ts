import fs from 'fs'
import { dataFile, dataBackupFile, logFile, logBackupFile } from 'helpers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Card, Log } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Incorrect HTTP method' })
    return
  }

  try {
    const dataBackup: Card[] = JSON.parse(
      fs.readFileSync(dataBackupFile, 'utf8')
    )
    fs.writeFileSync(dataFile, JSON.stringify(dataBackup))
    const logBackup: Log[] = JSON.parse(fs.readFileSync(logBackupFile, 'utf8'))
    fs.writeFileSync(logFile, JSON.stringify(logBackup))
    res.status(200).json({ message: 'Data reset' })
    return
  } catch (err) {
    res.status(500).json({ message: 'Could not reset data' })
  }
}

import fs from 'fs'
import { logFile } from 'helpers'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiReturnResponse } from 'types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiReturnResponse>
) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Incorrect HTTP method' })
    return
  }

  const data = await fs.readFileSync(logFile, 'utf-8')
  res.status(200).json(JSON.parse(data))
}

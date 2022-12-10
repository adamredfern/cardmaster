import path from 'path'

export const dataDir = path.join(process.cwd(), 'data')
export const dataFile = dataDir + '/data.json'
export const dataBackupFile = dataDir + '/data-backup.json'
export const logFile = dataDir + '/log.json'
export const logBackupFile = dataDir + '/log-backup.json'

export const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
})

import { Log } from 'types'
import styles from './LogTable.module.scss'

interface TableProps {
  data: Log[]
}

export const LogTable = ({ data }: TableProps) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((log) => (
          <tr key={log.timestamp}>
            <td>{new Date(log.timestamp).toString()}</td>
            <td dangerouslySetInnerHTML={{ __html: log.message }}></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

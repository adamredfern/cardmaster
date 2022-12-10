import { Navigation } from 'components/organisms/Navigation'
import styles from './Dashboard.module.scss'

interface DashboardProps {
  children: React.ReactNode
}

export const Dashboard = ({ children }: DashboardProps) => {
  return (
    <div className={styles.dashboard}>
      <Navigation />
      <main>{children}</main>
    </div>
  )
}

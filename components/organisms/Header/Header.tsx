import styles from './Header.module.scss'

interface HeaderProps {
  title: string
  children?: React.ReactNode
}

export const Header = ({ title, children }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <section>{children}</section>
    </header>
  )
}

import styles from './Button.module.scss'

interface ButtonProps {
  text: string
  event: any
}

export const Button = ({ text, event }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={event}>
      {text}
    </button>
  )
}

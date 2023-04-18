import styles from './Loader.module.scss'

export const Loader = () => {
  return (
    <div data-testid="loader-container" className={styles.container}>
      <div className={styles.loader}>
        <div></div>
      </div>
    </div>
  )
}

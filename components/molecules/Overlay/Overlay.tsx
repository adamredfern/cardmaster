import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import styles from './Overlay.module.scss'

interface OverlayProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}

export const Overlay = ({ open, setOpen, children }: OverlayProps) => {
  if (!open) {
    return <></>
  }

  return (
    <div data-testid="overlay" className={styles.overlay} onClick={() => setOpen(false)}>
      <div className={styles.inner} onClick={(e) => e.stopPropagation()}>
        <div className={styles.close} onClick={() => setOpen(false)}>
          <Image
            src={'/icons/close.svg'}
            alt={'Close'}
            width={32}
            height={32}
          />
        </div>
        {children}
      </div>
    </div>
  )
}

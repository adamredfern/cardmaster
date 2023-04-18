import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useResetDataMutation } from 'redux/services/apiSlice'
import styles from './Navigation.module.scss'

interface Link {
  label: string
  link: string
  icon: string
  disabled?: boolean
}

const links: Link[] = [
  {
    label: 'Dashboard',
    link: '/',
    icon: '/icons/dashboard.svg',
  },
  {
    label: 'Transactions',
    link: '/transactions',
    icon: '/icons/transactions.svg',
  },
  {
    label: 'Scheduled',
    link: '/scheduled',
    icon: '/icons/scheduled.svg',
    disabled: true,
  },
  {
    label: 'People',
    link: '/people',
    icon: '/icons/people.svg',
    disabled: true,
  },

  {
    label: 'Vendors',
    link: '/vendors',
    icon: '/icons/vendors.svg',
    disabled: true,
  },
]

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [resetData] = useResetDataMutation()
  const router = useRouter()

  return (
    <>
      <div
        className={styles.mobileMenuTrigger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <Image
            src={'/icons/dismiss.svg'}
            alt={'Menu'}
            width={40}
            height={40}
          />
        ) : (
          <Image
            src={'/icons/hamburger.svg'}
            alt={'Menu'}
            width={40}
            height={40}
          />
        )}
      </div>

      <aside className={`${styles.nav} ${menuOpen ? '' : styles.hidden}`}>
        <section>
          <Link href={'/'} onClick={() => setMenuOpen(false)}>
            <div className={styles.branding}>
              <Image
                src={'/logo.svg'}
                alt="CardMaster"
                width={32}
                height={32}
              />{' '}
              <span>CardMaster</span>
            </div>
          </Link>
          <nav className={styles.links}>
            <ul>
              {links.map((link, index) => (
                <Link
                  href={link.link}
                  className={link.disabled ? styles.disabled : ''}
                  key={index}
                  onClick={() => setMenuOpen(false)}
                >
                  <li
                    className={
                      router.pathname == link.link ? styles.active : ''
                    }
                  >
                    <Image
                      src={link.icon}
                      alt={link.label}
                      width={24}
                      height={24}
                    />
                    <span>{link.label}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
        </section>
        <section>
          <nav className={`${styles.links} ${styles.footerLinks}`}>
            <ul>
              <Link href={'/'} onClick={() => setMenuOpen(false)}>
                <li className={styles.profilePhoto}>
                  <Image
                    src={'/profile-photos/user.jpg'}
                    alt={'John Smith'}
                    width={24}
                    height={24}
                  />
                  <span>John Smith</span>
                </li>
              </Link>
              <div className={styles.divider}></div>
              <button
                onClick={() => {
                  resetData()
                  setMenuOpen(false)
                }}
              >
                <li>
                  <Image
                    src={'/icons/settings.svg'}
                    alt={'Settings'}
                    width={24}
                    height={24}
                  />
                  <span>Reset data</span>
                </li>
              </button>
            </ul>
          </nav>
        </section>
      </aside>
    </>
  )
}

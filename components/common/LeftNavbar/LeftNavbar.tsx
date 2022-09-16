// ---------------  Next JS imports ----------------
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// --------------- library imports -----------------
import { availableTabs } from './constants'

// ---------------- styles -------------------------
import styles from './LeftNavbar.module.css'

// ---------------- components ---------------------

const LeftNavbar = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<String>('dashboard')

  useEffect(() => {
    const pathname = router.pathname
    setCurrentPage(pathname)
  }, [currentPage])

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={'/gic_logo.png'} height={50} width={50} layout={'fixed'} />
        <div className={styles.logoText}>GIC</div>
      </div>
      <div className={styles.tabs}>
        {availableTabs.map(({ name, Icon }) => {
          return (
            <div
              className={`${styles.tab} ${
                '/' + name.toLowerCase() === currentPage ? styles.active : ''
              }`}
              key={name}
              onClick={() => router.push(`/${name.toLowerCase()}`)}
            >
              <div className={styles.tabIcon}>
                <Icon />
              </div>
              <div className={styles.tabLink}>
                <Link className={styles.link} href={`/${name.toLowerCase()}`}>
                  {name}
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LeftNavbar

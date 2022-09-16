// ---------------- styles -------------------------
import styles from './Dashboard.module.css'

// ---------------- components -------------------------
import Section from '../common/Section/Section'

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.section}>
          <Section title={'Title'} size={'L'} height={'30vh'} />
        </div>
        <div className={styles.section}>
          <Section title={'Title'} size={'M'} height={'30vh'} />
          <Section title={'Title'} size={'M'} height={'30vh'} />
        </div>
        <div className={styles.section}>
          <Section title={'Title'} size={'S'} height={'30vh'} />
          <Section title={'Title'} size={'S'} height={'30vh'} />
          <Section title={'Title'} size={'S'} height={'30vh'} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

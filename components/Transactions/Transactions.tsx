import Section from '../common/Section/Section'
import Table from '../common/Table/Table'

import { headings } from './constants'

import styles from './Transactions.module.css'

const Transactions = () => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.section}>
          <Section title={'Your Transactions'} size={'L'}>
            <div>
              <Table
                columns={headings.length}
                tableHeaders={headings.map((heading) => heading.name)}
                rows={[]}
                width="65vw"
              ></Table>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}
export default Transactions

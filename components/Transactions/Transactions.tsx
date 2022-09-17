import { useEffect, useState } from 'react'
import { TransactionRowData } from '../../types/transactions'
import { parseTransactionViewData } from '../common/Parser/Parser'
import Section from '../common/Section/Section'
import Table from '../common/Table/Table'

import { headings } from './constants'
import { sampleData } from './sampleData'

import styles from './Transactions.module.css'

const Transactions = () => {
  const [queriedTransactions, setQueriedTransactions] = useState<
    TransactionRowData[]
  >([])
  const [transactions, setTransactions] = useState<TransactionRowData[]>([])

  useEffect(() => {
    // fetch Data here
    const fetchedData = parseTransactionViewData(sampleData)
    setQueriedTransactions(fetchedData), setTransactions(fetchedData)
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.section}>
          <Section title={'Your Transactions'} size={'L'}>
            <div>
              <Table
                columns={headings.length}
                tableHeaders={headings.map((heading) => heading.name)}
                rows={queriedTransactions}
                width="65vw"
                buttonName="View"
              ></Table>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}
export default Transactions

import { useEffect, useState } from 'react'
import { TransactionRowData } from '../../types/transactions'
import { getTransactions } from '../common/Apis'
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

  const fetchData = async () => {
    let res = (await getTransactions())?.data;
    if(res == undefined || res.length == 0){
      return;
    }
    console.log(res);
    const fetchedData = parseTransactionViewData(res)
    setQueriedTransactions(fetchedData), setTransactions(fetchedData)

  }

  useEffect(() => {
    // fetch Data here
    fetchData();
    
    // const fetchedData = parseTransactionViewData(sampleData)
    // setQueriedTransactions(fetchedData), setTransactions(fetchedData)
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
                // width="65vw"
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

import { useEffect, useState } from 'react'
import { TransactionData, TransactionRowData } from '../../types/transactions'
import { getTransactions, getTransactionsById, getTransactionsForInstrument } from '../common/Apis'
import Modal from '../common/Modal/Modal'
import { parseTransactionViewData } from '../common/Parser/Parser'
import Section from '../common/Section/Section'
import Table from '../common/Table/Table'

import { headings } from './constants'
import { convertTransactionDataToModal } from './helper'
import { sampleData } from './sampleData'

import styles from './Transactions.module.css'

interface TransactionsProp {
  instrumentId?: string
}

const Transactions = ({ instrumentId }: TransactionsProp) => {
  const [queriedTransactions, setQueriedTransactions] = useState<
    TransactionRowData[]
  >([])
  const [transactions, setTransactions] = useState<TransactionData[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [transactionData, setTransactionData] = useState(<div></div>)
  const handleOpenModal = (open: boolean, transaction: TransactionData) => {
    if (open) {
      setOpen(true)
      setTransactionData(
        <div>{convertTransactionDataToModal(transaction)}</div>,
      )
    } else {
      setOpen(false)
    }
  }

  const handleClick = (id: number) => {
    handleOpenModal(
      true,
      transactions.filter((transaction) => transaction.transactionId == id)[0],
    )
  }

  useEffect(() => {
    // fetch Data here
    const fetchData = async () => {
      let res =
        instrumentId?.length > 0
          ? (await getTransactionsForInstrument(instrumentId))?.data
          : (await getTransactions())?.data
      if (res == undefined || res.length == 0) {
        return
      }
      console.log(instrumentId)
      console.log(res)
      const fetchedData = parseTransactionViewData(res)
      setQueriedTransactions(fetchedData), setTransactions(res)
    }
    fetchData()

    // const fetchedData = parseTransactionViewData(sampleData)
    // setQueriedTransactions(fetchedData), setTransactions(fetchedData)
  }, [])

  return (
    <div className={styles.container}>
      <Modal
        open={open}
        height={'80vh'}
        width={'50vw'}
        handleClose={() => handleOpenModal(false, ' ')}
      >
        {transactionData}
      </Modal>
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
                handleClick={handleClick}
              ></Table>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}
export default Transactions

import { Button } from '@mui/material'
import { TransactionData } from '../../types/transactions'
import { cancelTransaction } from '../common/Apis'

import styles from './Modal.module.css'

export const convertTransactionDataToModal = (
  transactionData: TransactionData,
) => {
  return (
    <div>
      <div className={styles.body}>
        <div className={styles.section}>
          <h1 className={styles.title}>{transactionData.instrumentName}</h1>
          <div>
            <div>
              <strong>Instrument Name</strong> {transactionData.instrumentName}
            </div>
            <div>
              <strong>Info: </strong>
              <ul>
                <li>
                  {' '}
                  <div>
                    <strong>Transaction ID: </strong>
                    {transactionData.transactionId}
                  </div>
                </li>
                <li>
                  <div>
                    <strong>Transaction Amount: </strong>
                    {transactionData.transactionAmount}
                  </div>
                </li>
                <li>
                  <div>
                    <strong>Transaction Type: </strong>
                    {transactionData.transactionType}
                  </div>
                </li>
                <li>
                  <div>
                    <strong>Created At: </strong>
                    {transactionData.createdAt}
                  </div>
                </li>
                <li>
                  <div>
                    <strong>Modified At: </strong>
                    {transactionData.modifiedAt}
                  </div>
                </li>
                <li>
                  <div>
                    <strong>Cancelled? : </strong>
                    {transactionData.isCancelled ? 'True' : 'False'}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <Button
            variant="contained"
            color="error"
            className="text-my-red-1 border-my-red-1 mr-8"
            onClick={() => cancelTransaction(transactionData.transactionId)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

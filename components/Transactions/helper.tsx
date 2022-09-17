import { TransactionData } from '../../types/transactions'

export const convertTransactionDataToModal = (
  transactionData: TransactionData,
) => {
  return (
    <div>
      <div>{transactionData.instrumentName}</div>
      <div>{transactionData.transactionId}</div>
      <div>{transactionData.transactionAmount}</div>
      <div>{transactionData.transactionType}</div>
    </div>
  )
}

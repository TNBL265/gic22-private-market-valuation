import { InstrumentsData, InstrumentsRowData } from '../../../types/instruments'
import {
  TransactionData,
  TransactionRowData,
} from '../../../types/transactions'

export const parseInstrumentsViewData = (
  instrumentsData: InstrumentsData[],
) => {
  const instrumentsViewData: InstrumentsRowData[] = instrumentsData.map(
    (instrument) => {
      return {
        instrumentId: instrument.instrumentId,
        instrumentName: instrument.instrumentName,
        instrumentType: instrument.instrumentType,
        country: instrument.country,
        sector: instrument.sector,
        instrumentCurrency: instrument.instrumentCurrency,
        isTradeable: instrument.isTradeable ? 'True' : 'False',
      }
    },
  )
  return instrumentsViewData
}

export const parseTransactionViewData = (
  transactionData: TransactionData[],
) => {
  const transactionViewData: TransactionRowData[] = transactionData.map(
    (transaction) => {
      return {
        instrumentName: transaction.instrumentName
          ? transaction.instrumentName
          : ' ',
        transactionId: transaction.transactionId,
        transactionType: (
          <div
            style={{
              color: `${
                transaction.transactionType.toLowerCase() == 'buy'
                  ? 'green'
                  : 'red'
              }`,
            }}
          >
            {transaction.transactionType}
          </div>
        ),
        currency: transaction.transactionCurrency,
        amount: transaction.transactionAmount,
        quantity: transaction.quantity,
        createdAt: transaction.createdAt,
        modifiedAt: transaction.modifiedAt,
        isCancelled: transaction.isCancelled ? 'True' : 'False',
      }
    },
  )
  return transactionViewData
}

import { InstrumentsData, InstrumentsRowData } from '../../../types/instruments'
import { TransactionRowData } from '../../../types/transactions'

export const parseInstrumentsViewData = (
  instrumentsData: InstrumentsData[],
) => {
  const instrumentsViewData: InstrumentsRowData[] = instrumentsData.map(
    (instrument) => {
      return {
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

export const parseTransactionViewData = (transactionData: any) => {
  const transactionViewData: TransactionRowData[] = transactionData.map(
    (transaction: any) => {
      return {
        instrumentName: transaction.instrumentName,
        transactionType: (
          <div
            style={{
              color: `${
                transaction.transactionType == 'Buy' ? 'green' : 'red'
              }`,
            }}
          >
            {transaction.transactionType}
          </div>
        ),
        currency: transaction.currency,
        amount: transaction.amount,
        quantity: transaction.quantity,
        createdAt: transaction.createdAt,
        modifiedAt: transaction.modifiedAt,
      }
    },
  )
  return transactionViewData
}

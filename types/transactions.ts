import { ReactElement } from 'react'

export interface TransactionData {
  transactionId: number
  instrumentId: number
  quantity: number
  transactionData: string
  transactionAmount: string
  transactionType: string
  transactionCurrency: string
  isCancelled: boolean
  createdAt: string
  modifiedAt: string
}

export interface TransactionRowData {
  instrumentName: string
  transactionType: ReactElement,
  currency: string
  amount: number
  quantity: number
  createdAt: string
  modifiedAt: string
}

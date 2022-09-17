import { ReactElement } from 'react'

export interface TransactionData {
  transactionId: number
  instrumentId: number
  instrumentName?: string
  quantity: number
  transactionDate: string
  transactionAmount: number
  transactionType: string
  transactionCurrency: string
  isCancelled: boolean
  createdAt: string
  modifiedAt: string
}

export interface TransactionRowData {
  instrumentName: string
  transactionType: ReactElement
  currency: string
  amount: number
  quantity: number
  createdAt: string
  modifiedAt: string
}

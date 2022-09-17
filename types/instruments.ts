export interface InstrumentsData {
  instrumentId?: number
  instrumentName: string
  instrumentType: string
  country: string
  sector: string
  instrumentCurrency: string
  isTradeable: boolean
  createdAt: string
  modifiedAt: string
  notes: string
}

export interface InstrumentsRowData {
  instrumentName: string
  instrumentType: string
  country: string
  sector: string
  instrumentCurrency: string
  isTradeable: string
}

export interface InstrumentFormData {
  instrumentName: string
  instrumentType: string
  country: string
  sector: string
  instrumentCurrency: string
  isTradeable: string
  notes?: string
}

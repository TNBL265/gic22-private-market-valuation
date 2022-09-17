export const headings = [
  { name: 'Instruments' },
  { name: 'Type' },
  { name: 'Country' },
  { name: 'Sector' },
  { name: 'Currency' },
  { name: 'Tradeable?' },
  { name: ' ' },
]

export const requiredFields = [
  { name: 'instrumentName', label: 'Instrument Name' },
  { name: 'country', label: 'Country' },
  { name: 'sector', label: 'Sector' },
  { name: 'instrumentType', label: 'Instrument Type' },
  { name: 'instrumentCurrency', label: 'Instrument Currency' },
]

export const selectFields = [{ name: 'isTradeable', label: 'isTradeable' }]
export const optionalFields = [{ name: 'notes', label: 'Notes' }]

export const INSTRUMENTS_BASE_URL = 'http://localhost:3000/api/instruments'

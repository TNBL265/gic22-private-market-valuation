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
  { label: 'Instrument Name' },
  { label: 'Country' },
  { label: 'Sector' },
  { label: 'Instrument Type' },
  { label: 'Instrument Currency' },
  { label: 'isTradeable' },
]

export const optionalFields = [{ label: 'Note' }]

export const INSTRUMENTS_BASE_URL = "http://localhost:3000/api/instruments"

import { InstrumentsData, InstrumentsRowData } from '../../../types/instruments'

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

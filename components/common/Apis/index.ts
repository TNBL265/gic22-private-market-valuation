import axios from 'axios'
const BASE_URL = 'http://localhost:3000/api'
export const INSTRUMENTS_BASE_URL = 'http://localhost:3000/api' //'http://localhost:3000/api/instruments'
export const TRANSACTIONS_BASE_URL = 'http://localhost:5003'
export const MARKET_BASE_URL = 'http://localhost:5002'

const headers = {
  'Content-Type': 'application/json',
}

const commonGet = (path: string) => {
  return async () => {
    try {
      let res = await axios.get(`${BASE_URL}/${path}`)
      console.log(res)
      return res['data']
    } catch (e) {
      return null
    }
  }
}

const getInstruments = async () => {
  try {
    let res = await axios.get(`${BASE_URL}/instruments`)
    console.log(res)
    return res['data']
  } catch (e) {
    return null
  }
}

const getInstrumentById = async (id: number) => {
  try {
    let res = await axios.get(`${BASE_URL}/instruments/${id}`)
    console.log(res)
    return res['data']
  } catch (e) {
    return null
  }
}

const postInstruments = async (data: any) => {
  try {
    let res = await axios.post(`${BASE_URL}/instruments`, data, { headers })
    console.log(res)
    return res
  } catch (e) {
    return null
  }
}

const editInstruments = async (data: any, id: number) => {
  try {
    let res = await axios.put(`${BASE_URL}/instruments/${id}`, data, {
      headers,
    })
    console.log(res)
    return res
  } catch (e) {
    return null
  }
}

const uploadInstruments = async (data: any) => {
  try {
    let res = await axios.post(`${BASE_URL}/instruments/upload`, data, {
      headers,
    })
    console.log(res)
    return res
  } catch (e) {
    return null
  }
}

const delInstrument = async (id: number) => {
  console.log(`id: ${id}`)
  try {
    let res = await axios.delete(`${BASE_URL}/instruments/${id}`)
    console.log(res)
    return res
  } catch (e) {
    return null
  }
}

const getMarketValues = commonGet('market-values')

const getMarketValuesById = async (id: number) => {
  try {
    let res = await axios.get(`${BASE_URL}/market-values/${id}`)
    console.log(res)
    return res['data']
  } catch (e) {
    return null
  }
}

const postMarketValues = async (data: any) => {
  try {
    let res = await axios.post(`${BASE_URL}/market-values`, data, { headers })
    console.log(res)
    return res
  } catch (e) {
    return null
  }
}

const getTransactions = async () => {
  try {
    let res = await axios.get(`${BASE_URL}/transactions`)
    console.log(res)
    return res['data']
  } catch (e) {
    return null
  }
}

const getTransactionsById = async (id: string) => {
  try {
    let res = await axios.get(`${BASE_URL}/transactions/${id}`)
    console.log(res)
    return res['data']
  } catch (e) {
    return null
  }
}

const getTransactionsForInstrument = async (id: string) => {
  try {
    let res = await axios.get(`${BASE_URL}/transactions/instruments/${id}`)
    console.log(res)
    return res['data']
  } catch (e) {
    return null
  }
}

const postTransactions = async (data: any) => {
  try {
    let res = await axios.post(`${BASE_URL}/transactions`, data, { headers })
    console.log(res)
    return res
  } catch (e) {
    return null
  }
}

<<<<<<< HEAD
const getMyInstrumentValue = async (instrumentId: number,start:string,end:string) => {
=======
const cancelTransaction = async (id: number) => {
  const res = await axios.delete(`${BASE_URL}/transactions/${id}`)
}

const getMyInstrumentValue = async (instrumentId: number) => {
>>>>>>> 4d82a970e7969f5e14a426c9cee9b48d66309e9f
  try {
    let res = await axios.get(
      `${BASE_URL}/analytics/investments/${instrumentId}/total-market-values?start=${start}&end=${end}`,
    )
    console.log(res)
    return res['data']
  } catch (e) {
    return null
  }
}

const getMyInstrumentPnL = async (instrumentId: string) => {
  try {
    console.log("getMyInstrumentPnL")
    let res = await axios.get(`${BASE_URL}/analytics/investments/${instrumentId}/pnl`)
    
    console.log(res)
    return res['data']
  } catch (e) {
    return null
  }
}
const getMyInstrumentPnLDate = async (
  instrumentId: string,
  startDate: string,
  endDate: string,
) => {
  try {
    let res = await axios.get(
      `${BASE_URL}/analytics/investments/${instrumentId}/pnl?start=${startDate}&end=${endDate}`,
    )
    console.log(res)
    return res['data']
  } catch (e) {
    return null
  }
}

const getMyPortfolio = async () => {
  try {
    let res = await axios.get(`${BASE_URL}/analytics/investments`)
    console.log(res)
    return res['data']
  } catch (e) {
    return null
  }
}

const getMyPortfolioPnL = async () => {
  try {
    let res = await axios.get(`${BASE_URL}/analytics/investments/pnl`)
    console.log(res)
    return res['data']
  } catch (e) {
    return null
  }
}

export {
  getInstruments,
  getInstrumentById,
  postInstruments,
  editInstruments,
  delInstrument,
  uploadInstruments,
  getMarketValues,
  getMarketValuesById,
  postMarketValues,
  getTransactions,
  cancelTransaction,
  getTransactionsById,
  getTransactionsForInstrument,
  postTransactions,
  getMyInstrumentValue,
  getMyInstrumentPnL,
  getMyInstrumentPnLDate,
  getMyPortfolioPnL,
}

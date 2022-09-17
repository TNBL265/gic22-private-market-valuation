import axios from "axios"
const BASE_URL = 'http://localhost:3000/api'
export const INSTRUMENTS_BASE_URL = 'http://localhost:3000/api' //'http://localhost:3000/api/instruments'
export const TRANSACTIONS_BASE_URL = 'http://localhost:5003'
export const MARKET_BASE_URL = 'http://localhost:5002'

const headers = {
    'Content-Type': 'application/json',
  }

const commonGet = (path: string)=>{
    return async () => {
        try {
            let res = await axios.get(`${BASE_URL}/${path}`);
            console.log(res)
            return res["data"]
        } catch (e) {
            return null
        }
    }
}

const getInstruments = async () => {
    try {
        let res = await axios.get(`${BASE_URL}/instruments`);
        console.log(res)
        return res["data"]
    } catch (e) {
        return null
    }
}

const getInstrumentById = async (id: number) => {
    try {
        let res = await axios.get(`${BASE_URL}/instruments/${id}`);
        console.log(res)
        return res["data"]
    } catch (e) {
        return null
    }
}

const postInstruments = async (data: any) => {
    try {
        let res = await axios.post(`${BASE_URL}/instruments`,data,{headers});
        console.log(res)
        return res
    } catch (e) {
        return null
    }
}

const uploadInstruments = async (data: any) => {
    try {
        let res = await axios.post(`${BASE_URL}/instruments/upload`,data,{headers});
        console.log(res)
        return res
    } catch (e) {
        return null
    }
}

const getMarketValues = commonGet('market-values');

const getMarketValuesById = async (id: number) => {
    try {
        let res = await axios.get(`${BASE_URL}/market-values/${id}`);
        console.log(res)
        return res["data"]
    } catch (e) {
        return null
    }
}

const postMarketValues = async (data: any) => {
    try {
        let res = await axios.post(`${BASE_URL}/market-values`,data,{headers});
        console.log(res)
        return res
    } catch (e) {
        return null
    }
}

const getTransactions = async () => {
    try {
        let res = await axios.get(`${BASE_URL}/transactions`);
        console.log(res)
        return res["data"]
    } catch (e) {
        return null
    }
}



export {
    getInstruments,
    getInstrumentById,
    postInstruments,
    uploadInstruments,
    getMarketValues,
    getMarketValuesById,
    postMarketValues,
    getTransactions
}
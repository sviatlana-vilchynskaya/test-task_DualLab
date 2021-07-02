import axios from 'axios';

const baseUrl = 'https://www.nbrb.by/API/ExRates/Rates/Dynamics/';

export const getUsdData = async () => {
    try{
        const {data} = await axios.get(baseUrl + '145' + '?startDate=2021-6-1&endDate=2021-6-30');
        return data;
    }catch(error) {
        throw error;
    }
}

export const getEurData = async () => {
    try{
        const {data} = await axios.get(baseUrl + '292' + '?startDate=2021-6-1&endDate=2021-6-30');
        return data;
    }catch(error){
        throw error;
    }
}

export const getRurData = async () => {
    try{
        const {data} = await axios.get(baseUrl + '298' + '?startDate=2021-6-1&endDate=2021-6-30');
        return data;
    }catch(error){
        throw error;
    }
}
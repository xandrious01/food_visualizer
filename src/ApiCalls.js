import axios from "axios";
import { NetworkErrorContext } from "./contexts";

export async function requestFoodById(fdcId){
    const response = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BASE_URL}/fdc/v1/food/${fdcId}`,
        params: {
            api_key: process.env.REACT_APP_API_KEY
        } 
    })
    return response;
}


export async function requestFoodByQuery(query, currPageNum){
    const params = {
            api_key: process.env.REACT_APP_API_KEY,
            query: `+${query}`,
            requireAllWords: true,
            pageSize: 50,
            pageNumber : currPageNum
           
        }

    const response = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BASE_URL}/fdc/v1/foods/search`,
        params : params
    });

    return response;
}


export async function requestFoodsByIds(joinedFdcIds){
    const params = {
        api_key: process.env.REACT_APP_API_KEY,
        fdcIds : joinedFdcIds 
    }

    const response = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BASE_URL}/fdc/v1/foods`,
        params: params
    });
    return response;
}


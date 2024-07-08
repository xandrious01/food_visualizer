import axios from "axios";

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


export async function requestFoodByQuery(query, pageNum){
    
    const params = {
            api_key: process.env.REACT_APP_API_KEY,
            query: `+${query}`,
            requireAllWords: true,
            pageSize: 50,
            pageNumber : pageNum
           
        }

    const response = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BASE_URL}/fdc/v1/foods/search`,
        params : params
    });
    return response;
}


export async function requestFoodsByIds(joinedFdcIds){
    console.log('requestingFoodsByIds')
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


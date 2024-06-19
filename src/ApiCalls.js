import axios from "axios";

export async function requestFoodById(fdcId){
    const response = await axios({
        method: 'get',
        url: `https://api.nal.usda.gov/fdc/v1/food/${fdcId}`,
        params: {
            api_key: 'EqFrUQrqBk2gGfiagQYalMZdUCqUOzadhAZeywKk'
        } 
    });
    // console.log(response)
    return response;
}


export async function requestFoodByQuery(query, pageNum){
    pageNum ? pageNum = pageNum : pageNum = 1;
    const params = {
            api_key: 'EqFrUQrqBk2gGfiagQYalMZdUCqUOzadhAZeywKk',
            query: `+${query}`,
            requireAllWords: true,
            pageSize: 50,
            pageNumber : pageNum
        } 
    console.log(params)

    const response = await axios({
        method: 'get',
        url: 'https://api.nal.usda.gov/fdc/v1/foods/search',
        params : params
    });
    return response;
}


export async function requestFoodsByIds(arrayFdcIds){
    const response = await axios({
        method: 'get',
        url: `https://api.nal.usda.gov/fdc/v1/foods`,
        params: {
            api_key: 'EqFrUQrqBk2gGfiagQYalMZdUCqUOzadhAZeywKk'
        } 
    });
    console.log(response)
    return response;
}


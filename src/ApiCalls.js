import axios from "axios";

export async function requestFoodById(fdcId){
    console.log("requestingFoodById")
    const response = await axios({
        method: 'get',
        url: `https://api.nal.usda.gov/fdc/v1/food/${fdcId}`,
        params: {
            api_key: 'EqFrUQrqBk2gGfiagQYalMZdUCqUOzadhAZeywKk'
        } 
    })
    return response;
}


export async function requestFoodByQuery(query, pageNum){
    console.log('requestingFoodByQuery')
    const params = {
            api_key: 'EqFrUQrqBk2gGfiagQYalMZdUCqUOzadhAZeywKk',
            query: `+${query}`,
            requireAllWords: true,
            pageSize: 50,
            pageNumber : pageNum
        }

    const response = await axios({
        method: 'get',
        url: 'https://api.nal.usda.gov/fdc/v1/foods/search',
        params : params
    });
    return response;
}


export async function requestFoodsByIds(joinedFdcIds){
    console.log('requestingFoodsByIds')
    const params = {
        api_key: 'EqFrUQrqBk2gGfiagQYalMZdUCqUOzadhAZeywKk',
        fdcIds : joinedFdcIds 
    }

    const response = await axios({
        method: 'get',
        url: `https://api.nal.usda.gov/fdc/v1/foods`,
        params: params
    });
    return response;
}


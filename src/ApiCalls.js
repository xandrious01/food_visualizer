import axios from "axios";

export async function requestFoodById(fdcId){
    const response = await axios({
        method: 'get',
        url: `https://api.nal.usda.gov/fdc/v1/food/${fdcId}`,
        params: {
            api_key: 'EqFrUQrqBk2gGfiagQYalMZdUCqUOzadhAZeywKk'
        } 
    });
    return response;
}


export async function requestFoodByQuery(query, pageNum){
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
    const params = {
        api_key: 'EqFrUQrqBk2gGfiagQYalMZdUCqUOzadhAZeywKk',
        fdcIds : joinedFdcIds 
    }
    console.log(params)

    const response = await axios({
        method: 'get',
        url: `https://api.nal.usda.gov/fdc/v1/foods`,
        params: params
    });
    return response;
}


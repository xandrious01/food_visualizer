
import '../../styles/DisplayFood.css';

const DisplayFoodInfo = ({ foodData }) => {

    if (foodData) {
        const {fdcId} = foodData;

        return (
            < div className="foodInfoDiv" >
                <p className="displayFoodInfo">FdcId: {fdcId}</p>
                <p className="displayFoodInfo">Data Type: {foodData.dataType}</p>
                <p className="displayFoodInfo">Food Category: {(foodData.foodCategory ? foodData.foodCategory.description : '')}</p>
                <p className="displayFoodInfo">BrandName: {(foodData.brandName ? foodData.brandName : '')}</p>
                <p className="displayFoodInfo">Ingredients : {foodData.ingredients ? foodData.ingredients : ''}</p>


            </div >
        )
    }
}
export default DisplayFoodInfo;
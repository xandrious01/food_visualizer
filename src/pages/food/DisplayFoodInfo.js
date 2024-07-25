
import '../../styles/DisplayFood.css';

const DisplayFoodInfo = ({ foodData }) => {

    if (foodData) {
        const { fdcId, dataType, foodCategory, brandName, ingredients } = foodData;
    
        return (
            < div className="foodInfoDiv" >
                <p className="displayFoodInfo">FdcId: {fdcId}</p>
                <p className="displayFoodInfo">Data Type: {dataType}</p>
                <p className={foodCategory ? 'displayFoodInfo' : 'itemHidden'}>Food Category: {(foodCategory ? foodCategory.description : '')}</p>
                <p className={brandName ? 'displayFoodInfo' : 'itemHidden'}>BrandName: {brandName}</p>
                <p className={ingredients ? 'displayFoodInfo ingredients' : 'itemHidden'}>Ingredients:
                </p>
                <div className="ingredients">
                    <p className="displayFoodInfo">{foodData.ingredients ? foodData.ingredients : ''}</p>
                </div>

            </div >
        )
    }
}
export default DisplayFoodInfo;
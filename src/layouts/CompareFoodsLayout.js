import { useState, useContext, useEffect } from "react";
import { CompareFoodsContext } from "../contexts";
import { requestFoodsByIds } from "../ApiCalls";
import { Row, Col, Button } from "reactstrap";
import CompareFoodDisplay from "../pages/food/CompareFoods";
import NutrientDisplayButtons from "../pages/food/NutrientDIsplayButtons";


const CompareFoodsLayout = () => {
    const { foodsToCompare, removeFoodFromComparison } = useContext(CompareFoodsContext);
    const [displayState, setDisplayState] = useState("DISPLAY_MACROS");
    const [isLoading, setIsLoading] = useState(true);


    const [foodData, setFoodData] = useState([]);

    useEffect(() => {
    async function requestFoodData() {
        try {
            const joindedfdcIds = (foodsToCompare.map(i => i.fdcId)).join(',');
            const response = await requestFoodsByIds(joindedfdcIds);
            if (response) {
                setFoodData(response.data);
            }
        } catch (err) {
            console.log(err)
        }
    }
    requestFoodData();
    setIsLoading(false);
    }, [])

    const handleRemoveFromComparison = (e) => {
        const fdcId = e.target.parentNode.id;
        return removeFoodFromComparison(fdcId)
    }

    return (
        <div>
            <h1>Compare Foods</h1>
            {foodData.map(i => {

                return (
                    <CompareFoodDisplay 
                    foodData={i} 
                    displayState={displayState} 
                    />
                )
            })}

            <NutrientDisplayButtons
                displayState={displayState}
                setDisplayState={setDisplayState}
            />
        </div>


    )
}

export default CompareFoodsLayout;
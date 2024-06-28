import { useState, useContext, useEffect } from "react";
import { CompareFoodsContext } from "../contexts";
import { requestFoodById } from "../ApiCalls";
import { Row, Col, Button } from "reactstrap";
import CompareFoods from "../pages/food/CompareFoods";
import NutrientDisplayButtons from "../pages/food/NutrientDIsplayButtons";


const CompareFoodsLayout = () => {
    const { foodsToCompare, removeFoodFromComparison } = useContext(CompareFoodsContext);
    const [displayState, setDisplayState] = useState("DISPLAY_MACROS");
    const [foodData, setFoodData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // console.log(foodsToCompare)
    function createInitialFoodDataState() {
        console.log(foodsToCompare)

    }

    useEffect(() => {
        createInitialFoodDataState();
        async function requestFoodData(fdcId) {
            try {
                const response = await requestFoodById(fdcId);
                if (response) {
                    return response
                }
            } catch (err) {
                console.log(err)
            }
        }
        setFoodData(foodsToCompare.map(i => requestFoodData(i * 1)))
        setIsLoading(false);
        console.log(foodData)
    }, [foodsToCompare])

    return (
        <div>
            <h1>Compare Foods</h1>
            {foodsToCompare.map(i => {
                console.log(i)
                return (
                    <div key={foodsToCompare.indexOf(i)}>
                        {i.description}
                    </div>
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
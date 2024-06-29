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
    const initialFoodDataState = () => {
        const initialState = foodsToCompare.map(i => {
            const {fdcId} = i;
            return {fdcId : []}
        });
    }

    useEffect(() => {
        initialFoodDataState();
        console.log(initialFoodDataState)
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
        setFoodData(foodsToCompare.map(i => requestFoodData(parseInt(i))))
        setIsLoading(false);
        // console.log(foodData)
    }, [])

    const handleRemoveFromComparison = (e) => {
        const fdcId = e.target.parentNode.id;
        return removeFoodFromComparison(fdcId)
    }

    return (
        <div>
            <h1>Compare Foods</h1>
            {foodsToCompare.map(i => {
               
                return (
                    <div key={foodsToCompare.indexOf(i)}
                        id={i.fdcId}>
                        {i.description}
                        <Button onClick={handleRemoveFromComparison}>
                            Remove
                        </Button>
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
import { useState, useContext, useEffect } from "react";
import { CompareFoodsContext } from "../contexts";
import { requestFoodsByIds } from "../ApiCalls";
import CompareFoodDisplay from "../pages/food/CompareFoods";
import NutrientDisplayButtons from "../pages/food/NutrientDisplayButtons";
import { NetworkErrorContext } from "../contexts";
import '../styles/CompareFoods.css';
import ErrorLoadingMsg from "../pages/ErrorLoadingMsg";


const CompareFoodsLayout = () => {
    const { foodsToCompare } = useContext(CompareFoodsContext);
    const [displayState, setDisplayState] = useState("DISPLAY_MACROS");
    const [isLoading, setIsLoading] = useState(true);
    const [foodData, setFoodData] = useState([]);
    const {errorLoading, setErrorLoading} = useContext(NetworkErrorContext);

    useEffect(() => {
        async function requestFoodData() {
            try {
                const joinedfdcIds = (foodsToCompare.map(i => i.fdcId)).join(',');
                const response = await requestFoodsByIds(joinedfdcIds);
                if (response) {
                    setFoodData(response.data);
                } else if (!response){
                    setErrorLoading("Please check your network connection to continue.")
                }
            } catch (err) {
                setErrorLoading(err.message)
            }
        }
        setErrorLoading(false);
        requestFoodData();
        setIsLoading(false);
    }, [foodsToCompare])

    if(errorLoading){
        return (
            <div>
                <h3 className="compareFoodsHeader">Compare Foods</h3>
                <ErrorLoadingMsg />
            </div>
        )
    }

    if (foodsToCompare.length > 0 && foodData.length > 0) {
        return (

            <div className="compareFoodsParentDiv">
                <h3 className="compareFoodsHeader">Food Comparison</h3>
                    <div className="compareFoodsChartsDiv">
                    {foodData.map(i => {
                        
                        return (
                            <div
                                className="compareFoodIndDiv"
                                id={`compareDiv-${i.fdcId}`}
                                key={`compareDiv-${i.fdcId}`}>
                                <CompareFoodDisplay
                                    foodData={i}
                                    displayState={displayState}
                                />
                            </div>
                        )
                    })}
                    </div>

            <NutrientDisplayButtons setDisplayState={setDisplayState} />
               
            </div>

        )
    } else if (foodsToCompare.length === 0) {
        return (
            <div className="compareFoodsParentDiv">
                <h3 className="compareFoodsHeader">Compare Foods</h3>
               

                    <p className="noFoodsMsg"> You haven't added any foods to compare yet.</p>
            
            </div>
        )
    }




}

export default CompareFoodsLayout;
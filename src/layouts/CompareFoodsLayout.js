import { useState, useContext, useEffect } from "react";
import { CompareFoodsContext } from "../contexts";
import { requestFoodsByIds } from "../ApiCalls";
import { Row, Col, Button } from "reactstrap";
import CompareFoodDisplay from "../pages/food/CompareFoods";
import CompileCompareFoods from "../pages/food/CompileCompareFoods";
import NutrientDisplayButtons from "../pages/food/NutrientDisplayButtons";
import { formatNutrientsForColumnChart } from "../formattingFunctions";
import '../styles/CompareFoods.css';


const CompareFoodsLayout = () => {
    const { foodsToCompare, removeFoodFromComparison } = useContext(CompareFoodsContext);
    const [displayState, setDisplayState] = useState("DISPLAY_MACROS");
    const [isLoading, setIsLoading] = useState(true);


    const [foodData, setFoodData] = useState([]);
    const [chartType, setChartType] = useState("pie");

    useEffect(() => {
        async function requestFoodData() {
            try {
                const joinedfdcIds = (foodsToCompare.map(i => i.fdcId)).join(',');
                const response = await requestFoodsByIds(joinedfdcIds);
                if (response) {
                    setFoodData(response.data);
                }
            } catch (err) {
                console.log(err)
            }
        }
        requestFoodData();
        setIsLoading(false);
    }, [foodsToCompare])

    const handleRemoveFromComparison = (e) => {
        const fdcId = e.target.parentNode.id;
        return removeFoodFromComparison(fdcId)
    }

    const handleSetChartType = () => {
        return chartType === "pie" ? setChartType("column") : setChartType("pie");
    }

    if (chartType === "pie") {
        return (

            <div className="compareFoodsParentDiv">
                <Row><h1>Compare Foods</h1>
                 <Button onClick={handleSetChartType}>
                    Toggle Display
                 </Button>
                 </Row>
                <Row>
                    {foodData.map(i => {

                        return (
                            <div className="compareFoodIndDiv"
                                key={`compareDiv-${i.fdcId}`}>
                                <CompareFoodDisplay
                                    foodData={i}
                                    displayState={displayState}
                                />
                            </div>
                        )
                    })}
                </Row>
                <NutrientDisplayButtons
                    displayState={displayState}
                    setDisplayState={setDisplayState}
                />
            </div>


        )
    }
    if (chartType === "column") {
        return (
            <div className="compareFoodsParentDiv">
                <Row><h1>Compare Foods</h1>
                <Button onClick={handleSetChartType}>
                    Toggle Display
                 </Button>
                </Row>
                <Row>
                    <CompileCompareFoods foodData={foodData} />
                </Row>

            </div>

        )
    }

}

export default CompareFoodsLayout;
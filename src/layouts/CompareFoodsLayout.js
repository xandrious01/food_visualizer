import { useState, useContext, useEffect } from "react";
import { CompareFoodsContext } from "../contexts";
import { requestFoodsByIds } from "../ApiCalls";
import { Row, Col, Button } from "reactstrap";
import CompareFoodDisplay from "../pages/food/CompareFoods";
import NutrientDisplayButtons from "../pages/food/NutrientDisplayButtons";
import '../styles/CompareFoods.css';


const CompareFoodsLayout = () => {
    const { foodsToCompare, removeFoodFromComparison } = useContext(CompareFoodsContext);
    const [displayState, setDisplayState] = useState("DISPLAY_MACROS");
    const [isLoading, setIsLoading] = useState(true);


    const [foodData, setFoodData] = useState([]);

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


    if (foodsToCompare.length > 0 && foodData.length > 0) {
        return (

            <div className="compareFoodsParentDiv">
              <h1>Food Comparison</h1>
                
                <Row>
                    
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
                    
                </Row>
              

                <Col>
                    
                </Col>
            </div>

        )
    } else if (foodsToCompare.length === 0) {
        return (
            <div className="compareFoodsParentDiv">
                <Row><h1>Compare Foods</h1>

                </Row>
                <Row>
                    <p> You haven't added any foods to compare yet.</p>
                </Row>
            </div>
        )
    }




}

export default CompareFoodsLayout;
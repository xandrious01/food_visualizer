import { Col, Row, Button } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { requestFoodById } from "../ApiCalls";
import '../styles/DisplayFood.css'
import { CompareFoodsContext } from "../contexts";
import NutrientDisplayButtons from "../pages/food/NutrientDisplayButtons";
import DisplayFoodNutritionFacts from "../pages/food/DisplayFoodNutritionFacts";



const DisplayFoodLayout = () => {
    const { fdcId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [foodData, setFoodData] = useState([]);
    const [displayState, setDisplayState] = useState("DISPLAY_MACROS")
    const navigate = useNavigate();

    const { addFoodToCompare } = useContext(CompareFoodsContext);

    const { description } = foodData;

    useEffect(() => {
        async function requestFoodData(fdcId) {

            try {
                const response = await requestFoodById(fdcId);
                if (response) {
                    setFoodData(response.data);
                }
            } catch (err) {
                console.log(err)
            }
        }
        requestFoodData(fdcId);
        setIsLoading(false);
    }, [])

    const handleSave = () => {
        if (!localStorage.getItem("savedFoods")) {
            const saved = [fdcId];
            console.log(saved)
            localStorage.setItem("savedFoods", JSON.stringify(saved))
        } else {
            const saved = JSON.parse(localStorage.getItem("savedFoods"));
            !(saved.includes(fdcId)) ? saved.push(fdcId) : console.log("food already saved");
            localStorage.setItem("savedFoods", JSON.stringify(saved))
        }
        return console.log(JSON.parse(localStorage.getItem("savedFoods")))
    }

    const handleAddComparison = () => {
        console.log("added to comparison")
        return addFoodToCompare(fdcId, description)
    }


    if (isLoading) {
        return (
            <div>
                Loading, please wait
            </div>
        )

    } else if (!isLoading) {

        return (

            <div>
                <Row className="displayFoodLayoutMain">
                    <Row>
                        <div className="compareBtnDiv d-flex">
                            <p className="displayFoodDescription" >
                                {description}
                            </p>
                            <Button
                                id="addCompareBtn"
                                className="custom-button"
                                onClick={handleAddComparison}
                            >
                                +Add to Comparison
                            </Button>
                        </div>


                    </Row>
                    <Row>
                        <Col
                            className="col-2 flex-column foodInfoDisplayCol">

                            <p className="displayFoodInfo">FdcId: {fdcId}</p>
                            <p className="displayFoodInfo">Data Type: {foodData.dataType}</p>
                            <p className="displayFoodInfo">Food Category: {(foodData.foodCategory ? foodData.foodCategory.description : '')}</p>
                            <p className="displayFoodInfo">BrandName: {(foodData.brandName ? foodData.brandName : '')}</p>
                            <p className="displayFoodInfo">Ingredients : {foodData.ingredients ? foodData.ingredients : ''}</p>

                            <Button
                                id="backBtn"
                                className="customDisplayFoodButton"
                                onClick={() => navigate(-1)}>
                                Back to Search Results
                            </Button>

                        </Col>

                        <Col
                            className='col-2 flex-column nutritionInfoDisplayCol'>
                            <DisplayFoodNutritionFacts
                                foodData={foodData}
                                displayState={displayState} />

                            <Button
                                id="saveBtn"
                                className="customDisplayFoodButton"
                                onClick={handleSave}>
                                Save Food
                            </Button>
                        </Col>
                        <Col className='col-6 p-1 chartDisplayCol'>

                            <Outlet context={{ foodData, displayState }} />


                        </Col>

                        <NutrientDisplayButtons
                            displayState={displayState}
                            setDisplayState={setDisplayState}
                        />
                    </Row>


                </Row>

            </div>
        )
    }
};

export default DisplayFoodLayout;
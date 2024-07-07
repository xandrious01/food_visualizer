import { Col, Row, Button } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { requestFoodById } from "../ApiCalls";
import '../styles/DisplayFood.css'
import { CompareFoodsContext } from "../contexts";
import NutrientDisplayButtons from "../pages/food/NutrientDisplayButtons";
import DisplayFoodNutritionFacts from "../pages/food/DisplayFoodNutritionFacts";
import DisplayFoodInfo from "../pages/food/DisplayFoodInfo";



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

            <div className="displayFoodLayoutMain">
                <Row>
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

                    <Col
                        className="col-2 flex-column foodInfoDisplayCol">

                        <DisplayFoodInfo foodData={foodData} />

                    </Col>

                    <Col
                        className='col-2 flex-column nutritionInfoDisplayCol'>

                        <DisplayFoodNutritionFacts
                            foodData={foodData}
                            displayState={displayState} />


                    </Col>
                    <Col className='col-6 p-1 chartDisplayCol'>

                        <Outlet context={{ foodData, displayState }} />


                    </Col>

                    <NutrientDisplayButtons
                        displayState={displayState}
                        setDisplayState={setDisplayState}
                    />

                </Row>
                <div className="foodDisplaySaveBackBtnsDiv">
                    <Button
                        id="backBtn"
                        className="customDisplayFoodButton"
                        onClick={() => navigate(-1)}>
                        Go Back
                    </Button>
                    <Button
                        id="saveBtn"
                        className="customDisplayFoodButton"
                        onClick={handleSave}>
                        Save Food
                    </Button>
                </div>

            </div>
        )
    }
};

export default DisplayFoodLayout;
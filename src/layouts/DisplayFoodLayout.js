import { Col, Row, Button } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { requestFoodById } from "../ApiCalls";
import '../styles/DisplayFood.css'
import { CompareFoodsContext } from "../contexts";
import NutrientDisplayButtons from "../pages/food/NutrientDisplayButtons";



const DisplayFoodLayout = () => {
    const { fdcId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [foodData, setFoodData] = useState([]);
    const [displayState, setDisplayState] = useState("DISPLAY_MACROS")
    const navigate = useNavigate();

    const { foodsToCompare, addFoodToCompare } = useContext(CompareFoodsContext);

    const { description } = foodData;

    useEffect(() => {
        async function requestFoodData(fdcId) {
            console.log(typeof fdcId)
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
    }, [displayState])

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
                I am Loading
            </div>
        )

    } else if (foodData && !isLoading) {
        return (

            <div>
                <Row className="displayFoodLayoutMain">

                    <Col>
                        <p>{description}</p>
                        <p>FdcId: {fdcId}</p>
                        <p>Energy per 100g: {1}kcals</p>

                        <Button onClick={handleSave}>
                            Save Food
                        </Button>

                        <Button
                            onClick={() => navigate(-1)}>
                            Back to Search Results
                        </Button>

                    </Col>
                    <Col className='col-2 nutrientInfoDisplayCol'>

                    </Col>
                    <Col className='col-7 p-2 chartDisplayCol'>

                        <Outlet context={{ foodData, displayState }} />

                        <NutrientDisplayButtons
                            displayState={displayState}
                            setDisplayState={setDisplayState}
                        />

                    </Col>

                    <Col>
                        <Button onClick={handleAddComparison}>
                            + Add to Comparison
                        </Button>
                    </Col>

                </Row>

            </div>
        )
    }
};

export default DisplayFoodLayout;
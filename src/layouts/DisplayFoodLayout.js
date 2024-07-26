import { Button } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { requestFoodById } from "../ApiCalls";
import '../styles/DisplayFood.css'
import { CompareFoodsContext } from "../contexts";
import { NetworkErrorContext } from "../contexts";
import NutrientDisplayButtons from "../pages/food/NutrientDisplayButtons";
import DisplayFoodNutritionFacts from "../pages/food/DisplayFoodNutritionFacts";
import DisplayFoodInfo from "../pages/food/DisplayFoodInfo";
import ErrorLoadingMsg from "../pages/ErrorLoadingMsg";


const DisplayFoodLayout = () => {
    const { fdcId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [foodData, setFoodData] = useState([]);
    const [displayState, setDisplayState] = useState("DISPLAY_MACROS")
    const navigate = useNavigate();

    const { addFoodToCompare } = useContext(CompareFoodsContext);
    const {errorLoading, setErrorLoading} = useContext(NetworkErrorContext);
    const { description } = foodData;

    useEffect(() => {
        async function requestFoodData(fdcId) {
            setErrorLoading(false);
            try {
                const response = await requestFoodById(fdcId);
                if (response) {
                    setFoodData(response.data);
                } else if (!response){
                    setErrorLoading("Please check your network connection to continue.")
                }
            } catch (err) {
                setErrorLoading(err.message);
            }
        }
        requestFoodData(fdcId);
        setIsLoading(false);
    }, [])

    const handleSave = () => {
        if (!localStorage.getItem("savedFoods")) {
            const saved = [fdcId];
            localStorage.setItem("savedFoods", JSON.stringify(saved))
        } else {
            const saved = JSON.parse(localStorage.getItem("savedFoods"));
            !(saved.includes(fdcId)) ? saved.push(fdcId) : console.log("food already saved");
            localStorage.setItem("savedFoods", JSON.stringify(saved))
        }
    }

    const handleAddComparison = () => {
        return addFoodToCompare(fdcId, description)
    }

    if(errorLoading){
        return (
            <div>
                <ErrorLoadingMsg />
            </div>
        )
    }

    if (isLoading) {
        return (
            <div>
                Loading, please wait
            </div>
        )

    } else if (!isLoading) {

        return (

            <div className="displayFoodLayoutMain"
                id='displayFoodMain'>

                <h4 className="displayFoodDescription" >
                    {description}
                </h4>
                <Button
                    id="addCompareBtn"
                    className="custom-button foodDisplayCompareBtn"
                    onClick={handleAddComparison}
                >
                    +Add to Comparison
                </Button>


                <DisplayFoodInfo foodData={foodData} />


                <DisplayFoodNutritionFacts
                    foodData={foodData}
                    displayState={displayState} />


                <Outlet context={{ foodData, displayState }} />


                <NutrientDisplayButtons
                    displayState={displayState}
                    setDisplayState={setDisplayState}
                />


                <div className="foodDisplaySaveBackBtnsDiv">
                    <Button
                        id="saveBtn"
                        className="customDisplayFoodButton"
                        onClick={handleSave}>
                        Save Food
                    </Button>
                    <Button
                        id="backBtn"
                        className="customDisplayFoodButton"
                        onClick={() => navigate(-1)}>
                        Go Back
                    </Button>

                </div>

            </div>
        )
    }
};

export default DisplayFoodLayout;
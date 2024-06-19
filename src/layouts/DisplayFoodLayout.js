import { Col, Row, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { requestFoodById } from "../ApiCalls";
import '../styles/DisplayFood.css'


const DisplayFoodLayout = () => {
    const { fdcId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [foodData, setFoodData] = useState([]);
    const navigate = useNavigate();

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

    function pullAdditionalDetails() {
        if (foodData.foodNutrients) {
            const energy = foodData.foodNutrients.filter(i => {
                return i.nutrient.name === 'Energy' && i.nutrient.unitName === 'kcal'
            })
            // return energy[0].amount;
        }
    }

    const energyVal = pullAdditionalDetails();

    const handleSave = () => {
        console.log('hi')
        const savedFoods = localStorage.getItem('savedFoods') !== null ? JSON.parse(localStorage.getItem('savedFoods')) : new Set([fdcId]);

        console.log(savedFoods)
        return localStorage.setItem('savedFoods', JSON.stringify(savedFoods))
    }

    if (isLoading) {
        return (
            <div>
                I am Loading
            </div>
        )

    } else if (foodData && !isLoading) {
        return (
            <Row className="displayFoodLayoutMain">

                <Col className='col-2'>
                    <p>{foodData.description}</p>
                    <p>FdcId: {fdcId}</p>
                    <p>Energy per 100g: {energyVal}kcals</p>
                    
                    <Button onClick={handleSave}>
                        Save Food
                    </Button>

                    <Button
                        onClick={() => navigate(-1)}>
                        Back to Search Results
                    </Button>

                </Col>

                <Col className="col-8">
                    <Outlet context={{foodData}} />
                </Col>
            </Row>

        )
    }
};

export default DisplayFoodLayout;
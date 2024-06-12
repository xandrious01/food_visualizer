import { Container } from "reactstrap";
import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import DisplayFood from "../pages/food/DisplayFood";
import { requestFoodById } from "../ApiCalls";

const DisplayFoodLayout = () => {
    const {fdcId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [foodData, setFoodData] = useState([]);


    useEffect(() => {
        async function requestFoodData(query) {
            try {
                const response = await requestFoodById(fdcId);
                if (response) return setFoodData(response.data);
            } catch (err) {
                console.log(err)
            }
        }
        requestFoodData(fdcId);
        setIsLoading(false)
    }, [])

        if(isLoading) {
            return (
                <div>
                    I am Loading
                </div>
            )
        } else if (foodData && !isLoading){
            return (
                <div>
                    <h1>{foodData.description}</h1>
                    <DisplayFood foodData={foodData} />
                </div>
                
            )
        }
};

export default DisplayFoodLayout;
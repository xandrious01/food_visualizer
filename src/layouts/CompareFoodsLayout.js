import { useState, useContext, useEffect } from "react";
import { CompareFoodsContext } from "../contexts";
import { requestFoodById } from "../ApiCalls";
import { Row, Col } from "reactstrap";
import DisplayFood from "../pages/food/DisplayFood";

const CompareFoodsLayout = () => {
    const {foodsToCompare, handleAddCompare} = useContext(CompareFoodsContext);

    // useEffect(() => {
    //     async function requestFoodData(fdcId) {
    //         try {
    //             const response = await requestFoodById(fdcId);
    //             if (response) return setFoodData(response.data);
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     requestFoodData(fdcId);
    //     setIsLoading(false)
    // }, [])

    return (
        <div>
            <h1>Compare Foods</h1>
            <Row>
                <Col>
                </Col>
                <Col>
                </Col>
            </Row>
        </div>


    )
}

export default CompareFoodsLayout;
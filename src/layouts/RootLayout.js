import { NavLink, Button, Row, Col, Container, Nav, NavItem } from "reactstrap";
import React, { useState, useContext, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import '../styles/RootLayout.css'
import '../App.css';
import { CompareFoodsContext } from "../contexts";



const RootLayout = () => {
    const [foodsToCompare, setFoodsToCompare] = useState([]);


    useEffect(() => {
        checkLocalStorageForFoodsToCompare();
    }, [])


    function checkLocalStorageForFoodsToCompare() {
        if (localStorage.getItem("foodsToCompare")) {
            const foods = JSON.parse(localStorage.getItem("foodsToCompare"));
            setFoodsToCompare(foods);
        } else {
            setFoodsToCompare([]);
        }
    }

    const addFoodToCompare = ({fdcId, description}) => {
        console.log({fdcId : description})
        setFoodsToCompare(foodsToCompare => [...foodsToCompare, {fdcId: description}]);
        console.log(foodsToCompare)
    }

    const removeFoodFromComparison = (fdcId) => {
        setFoodsToCompare(foodsToCompare.filter(i => i.fdcId != fdcId));
    }



    return (
        <CompareFoodsContext.Provider value={{ foodsToCompare, addFoodToCompare, removeFoodFromComparison }}>
            <Container fluid className="root" id='root'>

                <Row className='parentRow'>

                    <Col className="col-xs-1 col-2 navBtnsCol">
                    
                        <div className="nav-div d-flex flex-column navBtnsDiv">
                            <Link to="/"
                                className='customLink'>
                                <Button className="navBtn custom-button" >
                                    Home
                                </Button>
                            </Link>

                            <Link to="search">
                                <Button className="navBtn custom-button" >
                                    Search
                                </Button>
                            </Link>

                            <Link to="/myFoods">
                                <Button className="navBtn custom-button" >
                                    My Foods
                                </Button>
                            </Link>

                            <Link to="compare">
                                <Button className="navBtn custom-button" >
                                    Food Comparison
                                </Button>
                            </Link>
                        </div>
                    </Col>
                    <Col className='headerCol'>
                        <header>

                            <h1>Nutrient Visualizer</h1>

                        </header>

                        <Row className='foodCompareDisplay'>
                           <p>Foods to Compare:</p> 
                        </Row>
                        <Col className='w-full colMain'>
                            <main>
                                <Outlet />
                            </main>
                        </Col>
                    </Col>


                </Row>

            </Container>
        </CompareFoodsContext.Provider >

    )
}

export default RootLayout;
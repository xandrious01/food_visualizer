import { NavLink, Button, Row, Col, Container, Nav, NavItem } from "reactstrap";
import React, { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { CompareFoodsContext } from "../contexts";
import '../styles/RootLayout.css'
import '../App.css';


const RootLayout = () => {
    const [foodsToCompare, setFoodsToCompare] = useState([]);
    const {fdcId} = useParams();

    return (
        <CompareFoodsContext.Provider value={{ foodsToCompare, setFoodsToCompare }}>
            <Container fluid className="root" id='root'>
                <header>

                    <h1>Nutrient Visualizer</h1>

                </header>
                <Row>
                    <div className='compareBtnDiv'>
            
                        <Button onClick={()=>{
                            if(foodsToCompare.length <= 4 && !foodsToCompare.includes(fdcId)){
                                return setFoodsToCompare(foodsToCompare => foodsToCompare.push(fdcId))
                            }
                            console.log(foodsToCompare)
                            return foodsToCompare
                        }}
                            className="addCompareBtn"
                            style={fdcId ? {display: 'block'} : {display : 'none'}}
                            id="addCompareBtn"
                            type="button">
                            + Add to Comparison
                        </Button>

                    </div>
                    
                    <Col className="col-xs-1 col-2">
                        <div className="nav-div">
                            <Link to="/">
                                <Button className="navBtn" >
                                    Home
                                </Button>
                            </Link>

                            <Link to="search">
                                <Button className="navBtn" >
                                    Search
                                </Button>
                            </Link>

                            <Link to="/">
                                <Button className="navBtn" >
                                    My Foods
                                </Button>
                            </Link>

                            <Link to="compare">
                                <Button className="navBtn" >
                                    Food Comparison
                                </Button>
                            </Link>
                        </div>
                    </Col>

                    <Col className='col-xs-8 col-10 main'>
                        <main>
                            <Outlet />
                        </main>
                    </Col>
                </Row>

            </Container>
        </CompareFoodsContext.Provider>

    )
}

export default RootLayout;
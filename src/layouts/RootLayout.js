import { Button } from "reactstrap";
import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import Searchbar from '../pages/search/Searchbar';
import '../styles/RootLayout.css'
import '../App.css';

import { CompareFoodsContext, TriggerReloadContext } from "../contexts";
import { NetworkErrorContext } from "../contexts";
import FoodComparisonList from "../pages/food/FoodComparisonList";



const RootLayout = () => {

    const checkLocalCompareFoods = () => {
        const foodsToCompare = JSON.parse(localStorage.getItem("foodsToCompare"));
        return foodsToCompare !== null ? foodsToCompare : [];
    }

    const [foodsToCompare, setFoodsToCompare] = useState(checkLocalCompareFoods);

    const [reloadOnSearch, setReloadOnSearch] = useState(false);

    const [errorExists, setErrorExists] = useState(false);

    useEffect(() => {
        updateCompareFoodsInLocal();
    }, [foodsToCompare])


    function updateCompareFoodsInLocal() {
        return localStorage.setItem("foodsToCompare", JSON.stringify(foodsToCompare))
    }

    const addFoodToCompare = (fdcId, description) => {
        if (foodsToCompare.every(i => i.fdcId !== fdcId)) {
            if (foodsToCompare.length < 4) {
                setFoodsToCompare(foodsToCompare => [...foodsToCompare, { fdcId, description }]);
            } else {
                console.log("maximum number of foods added")
            }
        }
    }

    const removeFoodFromComparison = (fdcId) => {
        setFoodsToCompare(foodsToCompare => foodsToCompare.filter(i => i.fdcId !== fdcId))
    }

    return (
        <CompareFoodsContext.Provider value={{ foodsToCompare, addFoodToCompare, removeFoodFromComparison }}>
            <TriggerReloadContext.Provider value={{ reloadOnSearch, setReloadOnSearch }}>
                <div className="root customRoot" id='root'>

                    <div className="nav">
                        <NavLink to="/"
                            className='customLink'>
                            Home
                        </NavLink>
                        <NavLink to="/myFoods">
                            My Foods
                        </NavLink>
                        <NavLink to="compare">
                           Food Comparison
                        </NavLink>
                    </div>


                    <div className='header'>
                        <h1 className="headerText">Nutrient Visualizer</h1>
                        <div className="headerSearchbarDiv"><Searchbar /></div>
                    </div>

                    <div className='foodCompareListDisplay'>

                        <p className="comparisonListText">Compare:</p>

                        <FoodComparisonList removeFoodFromComparison={removeFoodFromComparison} />
                    </div>

                    <main className="main">
                        <Outlet />
                    </main>

                </div>
            </TriggerReloadContext.Provider>
        </CompareFoodsContext.Provider >

    )
}

export default RootLayout;
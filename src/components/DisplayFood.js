import React, { useState, useEffect } from "react";
import { requestFoodById } from "../ApiCalls";
import PieGraph from "./PieGraph";


const DisplayFood = () => {
    let foodId = 169911;
    const [foodInfo, setFoodInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const [foodName_foodEnergy, setFoodName_foodEnergy] = useState({});
    const [foodNutrients, setFoodNutrients] = useState({});

    useEffect(() => {
        getFoodInfo();

        if (isLoading === false) {

            formatNutrients(foodInfo.foodNutrients);
            extractFoodInfo(foodInfo);
        };
    }, [isLoading, isReady])


    async function getFoodInfo() {
        try {
            const response = await requestFoodById(foodId);
            setFoodInfo(response.data);
            setIsLoading(false);

        } catch (err) {
            console.log('err', err)
        }
    };

    function extractFoodInfo(foodInfo) {
        if (foodInfo) {
            setFoodName_foodEnergy({
                name: foodInfo.description,
                energy: foodInfo.foodNutrients[2]
            });
        }
    };

    function formatNutrients(foodNutrients) {
        const macrosList = ['Water', 'Ash', 'Protein', 'Total lipid (fat)', 'Carbohydrate, by difference', 'Fiber, total dietary', 'Total Sugars'];
        const nutrientsToExclude = ['Proximates', 'Energy', 'Fatty acids, total saturated', 'Fatty acids, total monounsaturated', 'Fatty acids, total polyunsaturated'];
        // const nutrientsListedInIU = [];

        let macros = [];
        let formattedMacros = [];
        let micros = [];
        let formattedMicros = [];

        for (let i of foodNutrients) {

            let { nutrient, amount } = i;
            let { id, name, unitName } = nutrient;

            if (nutrientsToExclude.includes(name)) {
                continue;
            }

            if (macrosList.includes(name)) {
                macros.push({ id, name, amount, unitName });
                formattedMacros.push({ 'name': name, 'value': amount });

            } else if (!(macrosList.includes(name)) && amount > 0) {
                let newMicro = { id, name, amount, unitName };
                micros.push(newMicro);
                let convertedToMg = convertNutrientAmounts(newMicro);
                formattedMicros.push({ 'name': name, 'value': amount });
            }

        }
        setFoodNutrients({ macros: formattedMacros, micros: formattedMicros });
        setIsReady(true);
    }

    function convertNutrientAmounts(newMicro) {
        const { amount, unitName } = newMicro;
        if (unitName === 'g') {
            newMicro.amount = amount * 1000;
            newMicro.unitName = 'mg'
            return newMicro
        } else if (unitName === 'µg') {
            newMicro.amount = amount * 0.001;
            newMicro.unitName = 'mg'
            return newMicro;
        }
    }

    if (isLoading === true || isReady === false) {
        return <h1>I am Loading</h1>
    } else if (isReady === true){
        return (
            <div>
                <PieGraph foodNutrients={foodNutrients}/>
            </div>
        )
    }



}

export default DisplayFood;
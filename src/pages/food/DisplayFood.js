import { useState, useEffect } from "react";



const DisplayFood = ({foodData}) => {
    console.log(foodData)

    const {foodNutrients} = foodData;

    function formatNutrients(foodNutrients) {
        const macrosList = ['Water', 'Ash', 'Protein', 'Total lipid (fat)', 'Carbohydrate, by difference', 'Fiber, total dietary', 'Total Sugars'];
        const nutrientsToExclude = ['Proximates', 'Energy', 'Fatty acids, total saturated', 'Fatty acids, total monounsaturated', 'Fatty acids, total polyunsaturated'];

    }

};

export default DisplayFood;
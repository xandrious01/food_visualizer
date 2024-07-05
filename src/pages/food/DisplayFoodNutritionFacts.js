import { useState, useEffect } from 'react';

const DisplayFoodNutritionFacts = ({ foodData }) => {

    if (foodData.foodNutrients) {
        const { foodNutrients } = foodData;
        let nutritionFactsObj = {};
        const nutritionFactsItemsIds = [ 1008, 1005, 1079, 2000, 1003, 1004, 1258, 1292, 1293, 1018, 1057, 1235]
        const nutritionFacts = foodNutrients.filter(i => {
            if(nutritionFactsItemsIds.includes(i.nutrient.id)){
                const {name, unitName} = i.nutrient;
                const {amount} = i;
                return nutritionFactsObj[name] = amount+unitName;
            }
        })

        
        const foundSugarKey = (Object.keys(nutritionFactsObj)).filter(i => i.toLowerCase().includes('sugar'));
        const foundCarbKey = (Object.keys(nutritionFactsObj)).filter(i => i.toLowerCase().includes('carbohydrate'));
        const foundFiberKey = (Object.keys(nutritionFactsObj)).filter(i => i.toLowerCase().includes('fiber'));
        
        
        
        return (
            < div className="nutritionFactsDiv" >
                <p className="nutritionFactsDisplayText energy">Energy: {nutritionFactsObj.Energy} </p>

                <p className="nutritionFactsDisplayText carbs">Total Carbohydrates: {nutritionFactsObj[foundCarbKey]} </p>

                <p className="nutritionFactsDisplayText sugars">Sugars: {nutritionFactsObj[foundSugarKey]} </p>

                <p className="nutritionFactsDisplayText fiber">Dietary Fiber: {nutritionFactsObj[foundFiberKey]} </p>

                <p className="nutritionFactsDisplayText protein">Protein: {nutritionFactsObj.Protein} </p>

                <p className="nutritionFactsDisplayText totalFats">Total Fat: {nutritionFactsObj['Total lipid (fat)']} </p>

                <p className="nutritionFactsDisplayText fats">Saturated Fats: {nutritionFactsObj['Fatty acids, total saturated']} </p>

                <p className="nutritionFactsDisplayText fats">Monounsaturated Fats: {nutritionFactsObj['Fatty acids, total monounsaturated']} </p>

                <p className="nutritionFactsDisplayText fats">Polyunsaturated Fats: {nutritionFactsObj['Fatty acids, total polyunsaturated']} </p>

                <p className="nutritionFactsDisplayText caffeine">Caffeine: {nutritionFactsObj['Caffeine']} </p>

                <p className="nutritionFactsDisplayText alcohol">Ethyl Alcohol: {nutritionFactsObj['Alcohol, ethyl']} </p>

            </div >
        )
    }
}
export default DisplayFoodNutritionFacts;
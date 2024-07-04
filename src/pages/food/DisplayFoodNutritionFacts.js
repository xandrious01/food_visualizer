import { useState, useEffect } from 'react';

const DisplayFoodNutritionFacts = ({ foodData }) => {
    console.log(foodData)
    if (foodData.foodNutrients) {
        const { foodNutrients } = foodData;
       
        const nutritionFactsItems = [ 1008, 1005, 1079, 2000, 1003, 1004, 1258, 1292, 1293, 1018, 1057, 1235]
        const nutritionFacts = foodNutrients.filter(i => {
            return nutritionFactsItems.includes(i.nutrient.id)
        })

        const findNutritionFacts = foodNutrients.map(i => {
            return i.nutrient.name
        })

        
        return (
            < div className="nutritionFactsDiv" >
                {
                    nutritionFacts.map(i => {
                        const { name, unitName, id } = i.nutrient;
                        const { amount } = i;
                        return (
                            <p key={id}>{name}: {amount}{unitName} </p>
                        )
                    })
                }
            </div >
        )
    }
}
export default DisplayFoodNutritionFacts;
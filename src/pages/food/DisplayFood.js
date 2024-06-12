import { useState, useEffect } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {formatMacroNutrients, formatMicroNutrients} from "../../formattingFunctions";


const DisplayFood = ({ foodData }) => {

    const { description, foodNutrients } = foodData;
   
    let macrosData = formatMacroNutrients(foodData);
    let microsData = formatMicroNutrients(foodData);

    function createChartOptions(tableName, dataName, data) {
        const options = { chart: { type: 'pie' } };
        options.title = { text: `${tableName}` };
        options.series = [{name: `${dataName}`, data: [...data]}];
        return options;
    }

    const macrosTableName = `Macronutrients for 100g of ${foodData.description}`;
    const macrosOptions = createChartOptions(macrosTableName, "Macros", macrosData);

    const microsTableName = `Micronutrients for 100g of ${foodData.description}`;
    const microsOptions = createChartOptions(microsTableName, "Micros", microsData);

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={macrosOptions} />
            <HighchartsReact highcharts={Highcharts} options={microsOptions} />
        </div>
    )

};

export default DisplayFood;
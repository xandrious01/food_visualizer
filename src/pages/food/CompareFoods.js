import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Highcharts, { chart } from 'highcharts';
import { Button, Row, Col } from "reactstrap";
import HighchartsReact from 'highcharts-react-official';
import { vitamins, fibersAndSugars, minerals, aminos, lipids, otherNutrients, formatMacroNutrients, formatCarbsOrLipids, formatOtherNutrients } from "../../formattingFunctions";
import '../../styles/DisplayFood.css';


const CompareFoods = ({foodData, displayState}) => {

    const { description } = foodData;

    const [chartOptions, setChartOptions] = useState({});
    const [tableName, setTableName] = useState('Loading, please wait');

    useEffect(() => {
        if (displayState === 'DISPLAY_MACROS') {
            let macrosData = formatMacroNutrients(foodData);
            setTableName(`Macronutrients per 100g of ${description}`);
            setChartOptions(createChartOptionsPieChart(tableName, "Amount(g)", macrosData));
        }

        if (displayState === 'DISPLAY_VITAMINS') {
            let vitaminsData = formatOtherNutrients(foodData, vitamins);
            setTableName(`Vitamin Content per 100g of ${description}`);
            setChartOptions(createChartOptionsColumnChart(tableName, "Amount(mg)", vitaminsData));
        }

        if (displayState === 'DISPLAY_AMINOS') {
            let aminosData = formatOtherNutrients(foodData, aminos);
            setTableName(`Amino Acids Content per 100g of ${description}`);
            setChartOptions(createChartOptionsPieChart(tableName, "Amount(mg)", aminosData));
        }

        if (displayState === 'DISPLAY_SUGARS') {
            let sugarsData = formatCarbsOrLipids(foodData, fibersAndSugars);
            setTableName(`Carbohydrate Content per 100g of ${description}`);
            setChartOptions(createChartOptionsPieChart(tableName, "Amount(g)", sugarsData));
        }

        if (displayState === 'DISPLAY_LIPIDS') {
            let lipidsData = formatCarbsOrLipids(foodData, lipids);
            setTableName(`Lipids and Fat Content per 100g of ${description}`);
            setChartOptions(createChartOptionsPieChart(tableName, "Amount(g)", lipidsData));
        }

        if (displayState === 'DISPLAY_MINERALS') {
            let mineralsData = formatOtherNutrients(foodData, minerals);
            setTableName(`Minerals and Metalloids Content per 100g of ${description}`);
            setChartOptions(createChartOptionsColumnChart(tableName, "Amount(mg)", mineralsData));
        }

        if (displayState === 'DISPLAY_OTHER') {
            let otherNutrientsData = formatOtherNutrients(foodData, otherNutrients);
            setTableName(`Other Nutrient Content per 100g of ${description}`);
            setChartOptions(createChartOptionsColumnChart(tableName, "Amount(mg)", otherNutrientsData));
        }

    }, [tableName, displayState])

    function createChartOptionsPieChart(tableName, dataName, data) {
        const options = { chart: { type: 'pie' } };
        options.title = { text: `${tableName}` };
        options.series = [{ name: `${dataName}`, data: [...data] }];
        return options;
    }

    function createChartOptionsColumnChart(tableName, dataName, data) {
        const options = { chart: { type: 'column' } };
        options.title = { text: `${tableName}`, align: 'center' };
        options.xAxis = { categories: ['A', 'B', 'C'], crosshair: true };
        options.yAxis = {
            min: 0, title: {
                text: 'amount in mg'
            }
        }
        options.series = [{ name: `${dataName}`, data: [...data] }];
        return options;
    }

    return (
        <div className="chartDiv">
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                containerProps={{ style: { height: "100%" } }}
            />
        </div>

    )

};


export default CompareFoods;




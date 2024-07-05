import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Highcharts, { chart } from 'highcharts';
import { Button, Row, Col } from "reactstrap";
import HighchartsReact from 'highcharts-react-official';
import { vitamins, fibersAndSugars, minerals, macros, aminos, lipids, otherNutrients, formatMacroNutrients, formatCarbsOrLipids, formatOtherNutrients, formatAminos, formatNutrientsForColumnChart } from "../../formattingFunctions";
import '../../styles/CompareFoods.css';



const CompareFoods = ({ foodData, displayState }) => {
    let tableName = '';
    let options;
    const { description } = foodData;
    const [isReady, setIsReady] = useState(false);
    const [chartOptions, setChartOptions] = useState({});



    useEffect(() => {
        if (foodData.foodNutrients) {
            readDisplayStateAndSetOptions();
        }
    }, [displayState, foodData])


    function readDisplayStateAndSetOptions() {
        if (displayState === 'DISPLAY_MACROS') {
            let macrosData = formatMacroNutrients(foodData);
            tableName = `Macronutrients per 100g of ${description}`;
            options = createChartOptionsPieChart(tableName, "Amount(g)", macrosData);
            setChartOptions(options)
            setIsReady(true)
        }

        if (displayState === 'DISPLAY_VITAMINS') {
            let vitaminsData = formatOtherNutrients(foodData, vitamins);
            tableName = `Vitamin Content per 100g of ${description}`;
            setChartOptions(createChartOptionsColumnChart(tableName, "Amount(mg)", vitaminsData));
        }

        if (displayState === 'DISPLAY_AMINOS') {
            let aminosData = formatAminos(foodData, aminos);
            tableName = `Amino Acids Content per 100g of ${description}`;
            setChartOptions(createChartOptionsPieChart(tableName, "Amount(mg)", aminosData));
        }

        if (displayState === 'DISPLAY_SUGARS') {
            let sugarsData = formatCarbsOrLipids(foodData, fibersAndSugars);
            tableName = `Carbohydrate Content per 100g of ${description}`
            setChartOptions(createChartOptionsPieChart(tableName, "Amount(g)", sugarsData));
        }

        if (displayState === 'DISPLAY_LIPIDS') {
            let lipidsData = formatCarbsOrLipids(foodData, lipids);
            tableName = `Lipids and Fat Content per 100g of ${description}`;
            setChartOptions(createChartOptionsPieChart(tableName, "Amount(g)", lipidsData));
        }

        if (displayState === 'DISPLAY_MINERALS') {
            let mineralsData = formatOtherNutrients(foodData, minerals);
            tableName = `Minerals and Metalloids Content per 100g of ${description}`;
            setChartOptions(createChartOptionsColumnChart(tableName, "Amount(mg)", mineralsData));
        }

        if (displayState === 'DISPLAY_OTHER') {
            let otherNutrientsData = formatOtherNutrients(foodData, otherNutrients);
            tableName = `Other Nutrient Content per 100g of ${description}`;
            setChartOptions(createChartOptionsColumnChart(tableName, "Amount(mg)", otherNutrientsData));
        }
    }

    function createChartOptionsPieChart(tableName, dataName, data) {
        const options = {
            chart: {
                type: 'pie',
                backgroundColor: '#FFF2E6'
            },
            yAxis: {
                title: {
                    text: ''
                }
            }
        };
        options.title = { text: `${tableName}` };
        options.series = [{ name: `${dataName}`, data: [...data] }];
        return options;
    }

    function createChartOptionsColumnChart(tableName, dataName, { data, categories }) {
        const options = {
            chart: {
                type: 'column',
                backgroundColor: '#FFF2E6'
            }
        };
        options.title = { text: `${tableName}`, align: 'center' };
        options.xAxis = { categories: [...categories], crosshair: true };
        options.yAxis = {
            min: 0, title: {
                text: 'amount in mg'
            }
        }
        options.series = [{ name: `${dataName}`, data: [...data] }];
        return options;
    }

    if (!isReady) {
        return (
            <div>
                Please Wait
            </div>
        )
    } else if (isReady) {
        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                containerProps={{ style: { height: "100%" } }}
            />

        )
    }
};


export default CompareFoods;




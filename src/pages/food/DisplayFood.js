import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Highcharts, { chart } from 'highcharts';
import { Button, Row, Col } from "reactstrap";
import HighchartsReact from 'highcharts-react-official';
import { vitamins, fibersAndSugars, minerals, aminos, lipids, otherNutrients, formatMacroNutrients, formatCarbsOrLipids, formatOtherNutrients, formatAminos } from "../../formattingFunctions";
import '../../styles/DisplayFood.css';


const DisplayFood = () => {

    let tableName = '';
    let options;
    const { foodData, displayState } = useOutletContext();
    const { description } = foodData;
    const [chartOptions, setChartOptions] = useState(options);
    const [isReady, setIsReady] = useState(false);
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        if (foodData.foodNutrients) {
            readDisplayStateAndSetOptions();
            setIsReady(true);
        }
        
    }, [displayState, foodData])

    function readDisplayStateAndSetOptions() {
        if (displayState === 'DISPLAY_MACROS') {
            let macrosData = formatMacroNutrients(foodData);
            checkData(macrosData);
            tableName = `Macronutrients per 100g of ${description}`;
            options = createChartOptionsPieChart(tableName, "Amount(g)", macrosData);
            setChartOptions(options);
        }

        if (displayState === 'DISPLAY_VITAMINS') {
            let vitaminsData = formatOtherNutrients(foodData, vitamins);
            checkData(vitaminsData);
            tableName = `Vitamin Content per 100g of ${description}`;
            setChartOptions(createChartOptionsColumnChart(tableName, "Amount(mg)", vitaminsData));
        }

        if (displayState === 'DISPLAY_AMINOS') {
            let aminosData = formatAminos(foodData, aminos);
            checkData(aminosData);
            tableName = `Amino Acids Content per 100g of ${description}`;
            setChartOptions(createChartOptionsPieChart(tableName, "Amount(mg)", aminosData));
        }

        if (displayState === 'DISPLAY_SUGARS') {
            let sugarsData = formatCarbsOrLipids(foodData, fibersAndSugars);
            console.log(sugarsData)
            checkData(sugarsData);
            tableName = `Carbohydrate Content per 100g of ${description}`
            setChartOptions(createChartOptionsPieChart(tableName, "Amount(g)", sugarsData));
        }

        if (displayState === 'DISPLAY_LIPIDS') {
            let lipidsData = formatCarbsOrLipids(foodData, lipids);
            checkData(lipidsData);
            tableName = `Lipids and Fat Content per 100g of ${description}`;
            setChartOptions(createChartOptionsPieChart(tableName, "Amount(g)", lipidsData));
        }

        if (displayState === 'DISPLAY_MINERALS') {
            let mineralsData = formatOtherNutrients(foodData, minerals);
            checkData(mineralsData);
            tableName = `Minerals and Metalloids Content per 100g of ${description}`;
            setChartOptions(createChartOptionsColumnChart(tableName, "Amount(mg)", mineralsData));
        }

        if (displayState === 'DISPLAY_OTHER') {
            let otherNutrientsData = formatOtherNutrients(foodData, otherNutrients);
            checkData(otherNutrientsData);
            tableName = `Other Nutrient Content per 100g of ${description}`;
            setChartOptions(createChartOptionsColumnChart(tableName, "Amount(mg)", otherNutrientsData));
        }
    }

    function checkData(data){
        return data.length === 0 ? setNoData(true) : setNoData(false);
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
    console.log(noData)
    if(!isReady){
        return (
            <div>
                Loading, please wait
            </div>
        )
    } else if (isReady && noData){
        return (
            <div>
                <p>
                    No data available for this dataset.
                </p>
            </div>
        )
    } else if (isReady && !noData) {
        return (
            <div className="chartDiv">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                    containerProps={{ style: { height: "100%" } }}
                />
            </div>
        )
    } 





};

export default DisplayFood;
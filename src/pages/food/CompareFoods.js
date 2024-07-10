import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Highcharts from 'highcharts';
import { Button } from "reactstrap";
import HighchartsReact from 'highcharts-react-official';
import { vitamins, fibersAndSugars, minerals, macros, aminos, lipids, otherNutrients, formatMacroNutrients, formatCarbsOrLipids, formatOtherNutrients, formatAminos } from "../../formattingFunctions";
import { CompareFoodsContext } from "../../contexts";
import '../../styles/CompareFoods.css';



const CompareFoodDisplay = ({ foodData, displayState }) => {
    let tableName = '';
    let options;
    const { description } = foodData;
    const [isReady, setIsReady] = useState(false);
    const [chartOptions, setChartOptions] = useState({});
    const [noData, setNoData] = useState(false);
    const { removeFoodFromComparison } = useContext(CompareFoodsContext);



    useEffect(() => {
        if (foodData.foodNutrients) {
            readDisplayStateAndSetOptions();
            setIsReady(true)
        }
    }, [displayState, foodData])


    function readDisplayStateAndSetOptions() {
        if (displayState === 'DISPLAY_MACROS') {
            let macrosData = formatMacroNutrients(foodData);
            checkData(macrosData);
            tableName = `Macronutrients per 100g of ${description}`;
            options = createChartOptionsPieChart(tableName, "Amount(g)", macrosData);
            setChartOptions(options)
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
                backgroundColor: '#FFF2E6',
                margin: [50, 10, 0, 10],
                height: '80%'
            },
            yAxis: {
                title: {
                    text: ''
                }
            }
        };
        options.title = { text: `${tableName}`, align: 'center', style: {
            fontSize: '18px'
        }};
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
        options.title = { text: `${tableName}`, align: 'center', style: {
            fontSize: '18px'
        } };
        options.xAxis = { categories: [...categories], labels: {
            y: 20
        }};
        options.yAxis = {
            min: 0, title: {
                text: 'amount in mg'
            }
        }
        options.spacing=[0, 0, 0, 0];
        options.series = [{ name: `${dataName}`, data: [...data] }];
        checkDisplayStateAndModifyOptions(options)
        return options;
    }

    function checkDisplayStateAndModifyOptions(options){
        if (displayState==='DISPLAY_VITAMINS'){
            options.chart.margin=[20,10,200,10]
        }
        return options;
    }


    const handleRemove = (e) => {
        const fdcId = e.target.id.slice(-7);
        return removeFoodFromComparison(fdcId);
    }

    if (!isReady) {
        return (
            <div>
                Loading, please wait
            </div>
        )
    } else if (isReady && noData) {
        return (
            <div>
                <p>
                    No data available for this dataset.
                </p>
            </div>
        )
    } else if (isReady && !noData) {
        return (
            <div className="chartDiv"
                id={`indCompareChartDiv-${foodData.fdcId}`}>
                <div className="viewRemoveBtnsDiv  d-flex flex-column">
                    <Button
                        className='customCompareListRemoveBtn chartItem'
                        id={'comparePageRemBtn' + `${foodData.fdcId}`}
                        onClick={handleRemove}>
                        X</Button>
                    <Link to={'/food/' + `${foodData.fdcId}`}
                        className="chartItem">
                        <i className="fa-solid fa-eye"></i>
                    </Link>


                </div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                    containerProps={{ style: { height: "100%" } }}
                />
            </div>
        )
    }
};


export default CompareFoodDisplay;




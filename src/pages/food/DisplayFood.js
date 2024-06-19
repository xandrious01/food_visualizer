import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Highcharts, { chart } from 'highcharts';
import { Button } from "reactstrap";
import HighchartsReact from 'highcharts-react-official';
import { macros, vitamins, fibersAndSugars, minerals, aminos, lipids, otherNutrients, formatMacroNutrients, formatCarbsOrLipids, formatOtherNutrients } from "../../formattingFunctions";
import '../../styles/DisplayFood.css';


const DisplayFood = () => {

    const { foodData } = useOutletContext();
    const { description } = foodData;

    const [displayState, setDisplayState] = useState('DISPLAY_MACROS');
    const [chartOptions, setChartOptions] = useState({});
    const [tableName, setTableName] = useState('Loading, please wait');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (displayState === 'DISPLAY_MACROS') {
            let macrosData = formatMacroNutrients(foodData);
            setTableName(`Macronutrients per 100g of ${description}`);
            setChartOptions(createChartOptions(tableName, "Amount(g)", macrosData));
        }

        if (displayState === 'DISPLAY_VITAMINS') {
            let vitaminsData = formatOtherNutrients(foodData, vitamins);
            setTableName(`Vitamin Content per 100g of ${description}`);
            setChartOptions(createChartOptions(tableName, "Amount(mg)", vitaminsData));
        }

        if (displayState === 'DISPLAY_AMINOS') {
            let aminosData = formatOtherNutrients(foodData, aminos);
            setTableName(`Amino Acids Content per 100g of ${description}`);
            setChartOptions(createChartOptions(tableName, "Amount(mg)", aminosData));
        }

        if (displayState === 'DISPLAY_SUGARS') {
            let sugarsData = formatCarbsOrLipids(foodData, fibersAndSugars);
            setTableName(`Carbohydrate Content per 100g of ${description}`);
            setChartOptions(createChartOptions(tableName, "Amount(g)", sugarsData));
        }

        if (displayState === 'DISPLAY_LIPIDS') {
            let lipidsData = formatCarbsOrLipids(foodData, lipids);
            setTableName(`Lipids and Fat Content per 100g of ${description}`);
            setChartOptions(createChartOptions(tableName, "Amount(g)", lipidsData));
        }

        if (displayState === 'DISPLAY_MINERALS') {
            let mineralsData = formatOtherNutrients(foodData, minerals);
            setTableName(`Minerals and Metalloids Content per 100g of ${description}`);
            setChartOptions(createChartOptions(tableName, "Amount(mg)", mineralsData));
        }

        if (displayState === 'DISPLAY_OTHER') {
            let otherNutrientsData = formatOtherNutrients(foodData, otherNutrients);
            setTableName(`Other Nutrient Content per 100g of ${description}`);
            setChartOptions(createChartOptions(tableName, "Amount(mg)", otherNutrientsData));
        }

    }, [tableName, displayState])

    function createChartOptions(tableName, dataName, data) {
        const options = { chart: { type: 'pie' } };
        options.title = { text: `${tableName}` };
        options.series = [{ name: `${dataName}`, data: [...data] }];
        return options;
    }

        return (
        
            <div className="DisplayFood-main-div">
    
                <div className="chart-div">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                        containerProps={{ style: { height: "100%" } }}
                    />
                </div>

                <div className='toggleDataBtnsDiv'>
                <Button
                    className='setDisplayBtn'
                    onClick={() => {
                        return setDisplayState('DISPLAY_MACROS')
                    }}>
                    Macros
                </Button>
                
                <Button
                    className='setDisplayBtn'
                    onClick={() => {
                       return setDisplayState('DISPLAY_VITAMINS')
                    }}>
                    Vitamins
                </Button>
    
                <Button
                    className='setDisplayBtn'
                    onClick={() => {
                        return setDisplayState('DISPLAY_SUGARS')
                    }}>
                    Fibers and Sugars
                </Button>
    
                <Button
                    className='setDisplayBtn'
                    onClick={() => {
                        return setDisplayState('DISPLAY_AMINOS')
                    }}>
                    Aminos
                </Button>
                <Button
                    className='setDisplayBtn'
                    onClick={() => {
                        return setDisplayState('DISPLAY_LIPIDS')
                    }}>
                    Lipids
                </Button>
                <Button
                    className='setDisplayBtn'
                    onClick={() => {
                        return setDisplayState('DISPLAY_MINERALS')
                    }}>
                    Minerals
                </Button>
                <Button
                    className='setDisplayBtn'
                    onClick={() => {
                        return setDisplayState('DISPLAY_OTHER')
                    }}>
                    Other Nutrients
                </Button>
                </div>
    
            </div>
        )

};

export default DisplayFood;
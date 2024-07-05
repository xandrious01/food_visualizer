import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Highcharts, { chart } from 'highcharts';
import { Button, Row, Col } from "reactstrap";
import HighchartsReact from 'highcharts-react-official';
import { vitamins, fibersAndSugars, minerals, aminos, lipids, otherNutrients, formatMacroNutrients, formatCarbsOrLipids, formatOtherNutrients, formatAminos, formatNutrientsForColumnChart, macros } from "../../formattingFunctions";
import '../../styles/CompareFoods.css';

const CompileCompareFoods = ({foodData}) => {
    
    const chartData = formatNutrientsForColumnChart(foodData, macros);

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

}

export default CompileCompareFoods;
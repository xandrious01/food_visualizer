import { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  vitamins,
  fibersAndSugars,
  minerals,
  aminos,
  lipids,
  otherNutrients,
  formatMacroNutrients,
  formatCarbsOrLipids,
  formatOtherNutrients,
  formatAminos,
} from "../../formattingFunctions";
import "../../styles/DisplayFood.css";

const DisplayFood = () => {
  let tableName = "";
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
  }, [displayState, foodData]);

  function readDisplayStateAndSetOptions() {
    if (displayState === "DISPLAY_MACROS") {
      let macrosData = formatMacroNutrients(foodData);
      checkDataPieCharts(macrosData);
      tableName = `Macronutrients per 100g of ${description}`;
      options = createChartOptionsPieChart(tableName, "Amount(g)", macrosData);
      setChartOptions(options);
    }

    if (displayState === "DISPLAY_VITAMINS") {
      let vitaminsData = formatOtherNutrients(foodData, vitamins);
      checkDataColumnCharts(vitaminsData);
      tableName = `Vitamin Content per 100g of ${description}`;
      setChartOptions(
        createChartOptionsColumnChart(tableName, "Amount(mg)", vitaminsData)
      );
    }

    if (displayState === "DISPLAY_AMINOS") {
      let aminosData = formatAminos(foodData, aminos);
      checkDataPieCharts(aminosData);
      tableName = `Amino Acids Content per 100g of ${description}`;
      setChartOptions(
        createChartOptionsPieChart(tableName, "Amount(mg)", aminosData)
      );
    }

    if (displayState === "DISPLAY_SUGARS") {
      let sugarsData = formatCarbsOrLipids(foodData, fibersAndSugars);
      checkDataPieCharts(sugarsData);
      tableName = `Carbohydrate Content per 100g of ${description}`;
      setChartOptions(
        createChartOptionsPieChart(tableName, "Amount(g)", sugarsData)
      );
    }

    if (displayState === "DISPLAY_LIPIDS") {
      let lipidsData = formatCarbsOrLipids(foodData, lipids);
      checkDataPieCharts(lipidsData);
      tableName = `Lipids and Fat Content per 100g of ${description}`;
      setChartOptions(
        createChartOptionsPieChart(tableName, "Amount(g)", lipidsData)
      );
    }

    if (displayState === "DISPLAY_MINERALS") {
      let mineralsData = formatOtherNutrients(foodData, minerals);
      checkDataColumnCharts(mineralsData);
      tableName = `Minerals and Metalloids Content per 100g of ${description}`;
      setChartOptions(
        createChartOptionsColumnChart(tableName, "Amount(mg)", mineralsData)
      );
    }

    if (displayState === "DISPLAY_OTHER") {
      let otherNutrientsData = formatOtherNutrients(foodData, otherNutrients);
      checkDataColumnCharts(otherNutrientsData);
      tableName = `Other Nutrient Content per 100g of ${description}`;
      setChartOptions(
        createChartOptionsColumnChart(
          tableName,
          "Amount(mg)",
          otherNutrientsData
        )
      );
    }
  }

  function checkDataColumnCharts(data) {
    return data.data.length === 0 || data.data.length === undefined
      ? setNoData(true)
      : setNoData(false);
  }

  function checkDataPieCharts(data) {
    return data.length === 0 || data.length === undefined
      ? setNoData(true)
      : setNoData(false);
  }

  function createChartOptionsPieChart(tableName, dataName, data) {
    const options = {
      chart: {
        type: "pie",
        backgroundColor: "#FFF2E6",
        margin: [50, 10, 0, 10],
        height: "600px",
      },
    };
    options.title = { text: `${tableName}` };
    options.series = [{ name: `${dataName}`, data: [...data] }];
    return options;
  }

  function createChartOptionsColumnChart(
    tableName,
    dataName,
    { data, categories }
  ) {
    let margins = [20, 10, 100, 10];
    
    function increaseMarginsForLargerDataSets(){
        if(categories.length > 6){
            margins = [...margins].map(x => x*1.5)
        }
        return margins;
    }

    increaseMarginsForLargerDataSets();

    const options = {
      chart: {
        type: "column",
        backgroundColor: "#FFF2E6",
        margin: margins,
        height: "60%",
        padding: "100px",
      },
      yAxis: {
        title: {
          text: "Amount (mg)",
        },
      },
    };
    options.title = { text: `${tableName}`, align: "center", fontSize: "12px" };
    options.xAxis = {
      categories: [...categories],
      labels: {
        y: 20,
      },
    };
    options.yAxis = {
      min: 0,
      title: {
        text: "amount in mg",
      },
    };
    options.series = [{ name: `${dataName}`, data: [...data] }];
    return options;
  }

  if (!isReady) {
    return <div>Loading, please wait</div>;
  } else if (isReady && noData) {
    return (
      <div className="chartDiv">
        <p>No data available for this dataset.</p>
      </div>
    );
  } else if (isReady && !noData) {
    return (
      <div className="chartDiv">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          containerProps={{ style: { margin: "auto" } }}
        />
      </div>
    );
  }
};

export default DisplayFood;

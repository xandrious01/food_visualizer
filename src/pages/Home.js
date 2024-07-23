import '../styles/Home.css'
import { useState } from 'react';



const Home = () => {
 

  return (

    <div className="homeParentDiv">
      

      <h1>Welcome!</h1>
      <p>This Nutrient Visualizer is intended to be an entertaining and informative way to view the nutritional content of different foods.</p>

      <p>
        The food information available here is provided by the USDA's database and can also be viewed on their FoodData Central website located <a href="https://fdc.nal.usda.gov/index.html">here</a>.
      </p>

      <h4>How to use this tool:</h4>
      <p>
        You can search for any food in either of the search boxes. The search results will display any pertinent entries with their description, as well as their FDCID (FoodData Central ID).
        Clicking on an entry will take you to the food's page, where you will be able to see the food's nutritional data. You will also be able to save it to your foods, or add it to your comparison list. You are able to compare up to four food entries at a time.
      </p>

      <p>FoodData Central's food entries are provided from a variety of sources, which are categorized as follows:</p>
      <ul className="homeList">
        <li>Foundation Foods</li>
        <li>SR Legacy</li>
        <li>FNDDS</li>
        <li>Experimental Foods</li>
        <li>Branded Foods</li>
      </ul>

      <p>Due to this, not all entries will have information for every dataset available.</p>

      <p>You can read more about the different food sources <a href="https://fdc.nal.usda.gov/about-us.html">here</a>.</p>




    </div>

  )
};

export default Home;
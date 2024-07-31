import { useState, useEffect } from "react";
import { ListGroupItemHeading, ListGroupItem, Button } from "reactstrap";
import { Link } from "react-router-dom";
import SavedFoods from "../pages/SavedFoods";
import { requestFoodsByIds } from "../ApiCalls";
import '../styles/SavedFoods.css'

const SavedFoodsLayout = () => {
    const savedFoodsFdcIds = localStorage.getItem("savedFoods") ? JSON.parse(localStorage.getItem("savedFoods")) : new Array();
    const [foodsInfo, setFoodsInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [update, setUpdate] = useState(false);


    useEffect(() => {
        async function getSavedFoodsInfo() {
            try {
                const joinedfdcIds = savedFoodsFdcIds.join(',');
                const response = await requestFoodsByIds(joinedfdcIds);
                return setFoodsInfo(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (savedFoodsFdcIds.length > 0) {
            getSavedFoodsInfo();
            setIsLoading(false);
        }

    }, [update])

    const handleRemove = (e) => {
        const id = e.target.id.slice(6);

        const savedFoods = JSON.parse(localStorage.getItem("savedFoods"));
        const updatedSavedFoods = savedFoods.filter(i => i !== id);
        localStorage.setItem("savedFoods", JSON.stringify(updatedSavedFoods));
        setFoodsInfo(foodsInfo.filter(i => i.fdcId !== id));
        return setUpdate(!update)
    }



    if (savedFoodsFdcIds.length === 0) {
        return (
            <div className="savedFoodsParent">
                    <h3 className="myFoodsHeader">My Foods</h3>
                    <p>You haven't saved any foods yet.</p>
            </div>
        )
    } else if (foodsInfo && !isLoading) {
      return <SavedFoods foodsInfo={foodsInfo} handleRemove={handleRemove}/>
    }

}

export default SavedFoodsLayout;
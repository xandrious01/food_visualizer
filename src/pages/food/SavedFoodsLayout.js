import { useState, useEffect } from "react";
import { ListGroupItemHeading, ListGroupItem, ListGroupItemText, Col, Button} from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { requestFoodsByIds } from "../../ApiCalls";

const SavedFoods = () => {
    const savedFoodsFdcIds = localStorage.getItem("savedFoods") ? JSON.parse(localStorage.getItem("savedFoods")) : new Array();

    const [foodsInfo, setFoodsInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function getSavedFoodsInfo() {
            try {
                const response = await requestFoodsByIds(savedFoodsFdcIds);
                return setFoodsInfo(response.data)
            } catch(err){
                console.log(err)
            }
        }
        if(savedFoodsFdcIds.length > 0){
            getSavedFoodsInfo();
            setIsLoading(false);
            console.log(foodsInfo)
        }
        
    }, [])

    const handleRemove = (e) => {
        const id = e.target.id.slice(6)
        const savedFoods = JSON.parse(localStorage.getItem("savedFoods"));
        const updatedSavedFoods = savedFoods.filter(i => i !== id);
        localStorage.setItem("savedFoods", JSON.stringify(updatedSavedFoods));
        return setFoodsInfo(foodsInfo.filter(i => i.fdcId !== id));
    }



    if (savedFoodsFdcIds.length === 0) {
        return (
            <div>
                <p>You haven't saved any foods yet.</p>
            </div>
        )
    } else if (foodsInfo && !isLoading){
        return (
            <div className='savedFoodsContainer'>
                        {foodsInfo.map(i => {
                            const { description, dataType, fdcId } = i;

                            return (

                                <ListGroupItem
                                    key={fdcId}
                                >
                                    <Link to={`/food/${fdcId}`}>
                                        <ListGroupItemHeading>
                                            {description}
                                        </ListGroupItemHeading>
                                        <ListGroupItemText>
                                            fdcId: {fdcId}
                                            Data Type: {dataType}
                                            
                                            {i.additionalDescription ? i.additionalDescription : ''}
                                        </ListGroupItemText>
                                    </Link>
                                    <div>
                                        <Button 
                                        id={`remove${fdcId}`}
                                        onClick={handleRemove}>
                                            Remove
                                        </Button>
                                    </div>
                                    </ListGroupItem>
                                    )
                        })}
                </div>
        )
    }

}

export default SavedFoods;
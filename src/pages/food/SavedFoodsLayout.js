import { useState, useEffect } from "react";
import { ListGroupItemHeading, ListGroupItem, ListGroupItemText, Col, Button } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { requestFoodsByIds } from "../../ApiCalls";
import '../../styles/SavedFoods.css'

const SavedFoods = () => {
    const savedFoodsFdcIds = localStorage.getItem("savedFoods") ? JSON.parse(localStorage.getItem("savedFoods")) : new Array();
    console.log(savedFoodsFdcIds)
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
            console.log(foodsInfo)
        }

    }, [update])

    const handleRemove = (e) => {
        const id = e.target.id.slice(6);
        console.log('hi')
        const savedFoods = JSON.parse(localStorage.getItem("savedFoods"));
        const updatedSavedFoods = savedFoods.filter(i => i !== id);
        localStorage.setItem("savedFoods", JSON.stringify(updatedSavedFoods));
        setFoodsInfo(foodsInfo.filter(i => i.fdcId !== id));
        return setUpdate(!update)
    }



    if (savedFoodsFdcIds.length === 0) {
        return (
            <div>
                <p>You haven't saved any foods yet.</p>
            </div>
        )
    } else if (foodsInfo && !isLoading) {
        return (
            <div className='savedFoodsContainer'>
                {console.log(foodsInfo)}
                {foodsInfo.map(i => {
                    const { description, dataType, fdcId } = i;

                    return (

                        <ListGroupItem
                            key={fdcId}
                            className="savedFoodsListGroupItem"
                        >
                            <Link to={`/food/${fdcId}`}
                                className="customSearchLink"
                            >
                                <ListGroupItemHeading
                                    className="savedFoodsListHeading customHeading">
                                    {description}
                                </ListGroupItemHeading>
                                <div className="savedFoodsListText customText">
                                    <div>fdcId: {fdcId}</div>
                                    <div>Data Type: {dataType}</div>
                                    <div>{i.additionalDescription ? i.additionalDescription : ''}</div>
                                </div>
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
import { useState, useEffect } from "react";
import { ListGroupItemHeading, ListGroupItem, Button } from "reactstrap";
import { Link } from "react-router-dom";
import '../styles/SavedFoods.css'

const SavedFoods = ({foodsInfo, handleRemove}) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [update, setUpdate] = useState(false);

  
        return (
            <div className="savedFoodsParent">
                        <h3 className="myFoodsHeader">My Foods</h3>
                <div className='savedFoodsContainer'>
                    
                   
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
                                    <Button outline
                                        id={`remove${fdcId}`}
                                        onClick={handleRemove}>
                                        Remove
                                    </Button>
                                </div>
                            </ListGroupItem>
                        )
                    })}
                </div>
            </div>
        )
}

export default SavedFoods;
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { CompareFoodsContext } from "../../contexts";

const FoodComparisonList = ({ removeFoodFromComparison }) => {
    const { foodsToCompare } = useContext(CompareFoodsContext);
    
    const handleRemove = (e) => {
        const fdcId = e.target.parentNode.id.slice(-7);
        console.log(fdcId)
        return removeFoodFromComparison(fdcId)
    }

    return (
        foodsToCompare.map(i => {
            const { fdcId, description } = i;
            
            return (
                <div 
                id={`compareList-${i.fdcId}`}
                key={`compareListBtn-${fdcId}`}
                >
                    <Link to={'/food/'+`${fdcId}`}>{description}</Link>
                    <Button onClick={handleRemove}>X</Button>
                </div>
            )
        })
    )
}

export default FoodComparisonList;
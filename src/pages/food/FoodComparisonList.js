import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { CompareFoodsContext } from "../../contexts";

const FoodComparisonList = ({ removeFoodFromComparison }) => {
    const { foodsToCompare } = useContext(CompareFoodsContext);
    
    const handleRemove = (e) => {
        const fdcId = e.target.parentNode.id;
        return removeFoodFromComparison(fdcId)
    }

    return (
        foodsToCompare.map(i => {
            const { fdcId, description } = i;
            console.log(i)
            return (
                <div key={`compareListBtn-${fdcId}`}>
                    <Link to={'/food/'+`${fdcId}`}>{description}</Link>
                    <Button onClick={handleRemove}>X</Button>
                </div>
            )
        })
    )
}

export default FoodComparisonList;
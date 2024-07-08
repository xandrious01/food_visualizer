import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { CompareFoodsContext } from "../../contexts";
import '../../styles/RootLayout.css';
import '../../styles/CompareFoods.css';


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
                className="compareListItem"
                id={`compareList-${i.fdcId}`}
                key={`compareListBtn-${fdcId}`}
                >
                    <Link to={'/food/'+`${fdcId}`}
                    className="compareFoodsLink"
                    >{description}
                    </Link>
                    <Button 
                    className='customCompareListRemoveBtn'
                    onClick={handleRemove}>X</Button>
                </div>
            )
        })
    )
}

export default FoodComparisonList;
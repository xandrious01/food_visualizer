import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { CompareFoodsContext } from "../../contexts";
import '../../styles/RootLayout.css';



const FoodComparisonList = ({ removeFoodFromComparison }) => {
    const { foodsToCompare } = useContext(CompareFoodsContext);
    
    const handleRemove = (e) => {
        const fdcId = e.target.parentNode.id.slice(12);
        return removeFoodFromComparison(fdcId)
    }
    if(foodsToCompare.length > 0){
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
    } else {
        return (
            <div>
                <p className="userMsg">
                    You haven't added any foods to compare.
                </p>
            </div>
        )
    }
    
}

export default FoodComparisonList;
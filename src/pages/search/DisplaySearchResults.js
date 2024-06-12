import { Container, List, ListGroup, ListGroupItem} from "reactstrap";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { requestFoodByQuery } from "../../ApiCalls";



const DisplaySearchResults = () => {
    const { query } = useParams();
    console.log(query)
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function requestSearchResults(query) {
            try {
                const response = await requestFoodByQuery(query);
                if (response) return setSearchResults(response.data.foods);
            } catch (err) {
                console.log(err)
            }
        }
        requestSearchResults(query);
        setIsLoading(false)

    }, [])

    if (isLoading) {
        return (
            <Container>
                <h1>Loading</h1>
            </Container>
        )
    }
    else if (searchResults && !isLoading) {
        return(
            <Container>
                <ListGroup>
                {searchResults.map(i => {
                    const {description, brandName, foodCategory, fdcId} = i;
                    return (
                    <ListGroupItem
                        key={fdcId}
                    >
                        <Link to={`/food/${fdcId}`}>
                           {description} 
                        </Link>
                    
                    </ListGroupItem>)
                })}
                </ListGroup>
            </Container>
        )
    }
}


export default DisplaySearchResults;
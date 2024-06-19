import { Button, Container, List, ListGroup, ListGroupItem } from "reactstrap";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { requestFoodByQuery } from "../../ApiCalls";
import '../../styles/Search.css'



const DisplaySearchResults = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [res, setRes] = useState([]);
    const [resultsInfo, setResultsInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        async function requestSearchResults(query, pageNum) {
            try {
                const response = await requestFoodByQuery(query);
                if (response) {
                    setRes(response);
                    getResultsInfo();
                    return setSearchResults(response.data.foods);
                }
            } catch (err) {
                console.log(err)
            }
        }
        requestSearchResults(query);
        setIsLoading(false);

    }, [pageNum])

    function getResultsInfo() {
        if (res.data) {
            const { totalHits, totalPages, currentPage } = res.data;
            console.log({ totalHits, totalPages, currentPage });
            return setResultsInfo({ totalHits, totalPages, currentPage });
        }
    }

    function handleNext() {
        return setPageNum(2)
    }

    function handlePrev() {
        return setPageNum(pageNum => pageNum--)
    }




    if (isLoading) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    }
    else if (searchResults && resultsInfo && !isLoading) {

        return (
            <div className="displaySearchResultsParent">
                <div>
                    <p>Total Hits: {resultsInfo.totalHits}</p>

                    <Button
                        className="paginationBtn 
                    prevPage
                    {resultsInfo.currentPage === 1 ? disabled : ''}
                    "
                        onClick={handlePrev}
                    >Previous Page</Button>

                    <p className='pageInfo'>
                        Displaying Page {resultsInfo.currentPage} of {resultsInfo.totalPages}
                    </p>

                    <Button
                        onClick={handleNext}

                        className="paginationBtn 
                    nextPage
                    {resultsInfo.currentPage === resultsInfo.totalPages ? disabled : ''}"
                    >Next Page</Button>
                </div>

                <div className='resultsContainer'>
                    <ListGroup>

                        {searchResults.map(i => {
                            const { description, brandName, foodCategory, dataType, fdcId } = i;

                            return (
                                <ListGroupItem
                                    key={fdcId}
                                >
                                    <Link to={`/food/${fdcId}`}>
                                        {description}
                                        fdcId: {fdcId}
                                        Category: {foodCategory}
                                        dataType: {dataType === 'branded' ? brandName : 'Non-branded/other'}
                                        Additional Description: {i.additionalDescription ? i.additionalDescription : ''}
                                    </Link>

                                </ListGroupItem>)
                        })}
                    </ListGroup>

                </div>

            </div>
        )
    }
}


export default DisplaySearchResults;
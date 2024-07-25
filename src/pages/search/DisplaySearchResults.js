import {
    ListGroupItem,
    ListGroupItemHeading,
} from "reactstrap";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { requestFoodByQuery } from "../../ApiCalls";
import { TriggerReloadContext } from "../../contexts";
import '../../styles/Search.css'
import PaginationBar from "./PaginationBar";




const DisplaySearchResults = () => {
    const { query, pageNum } = useParams();
    const { reloadOnSearch, setReloadOnSearch } = useContext(TriggerReloadContext);
    const [searchResults, setSearchResults] = useState([]);
    const [resultsInfo, setResultsInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const currPageNum = pageNum;

    useEffect(() => {
        async function requestSearchResults(query, currPageNum) {
            try {
                const response = await requestFoodByQuery(query, currPageNum);
                if (response) {
                    const { totalHits, totalPages, currentPage } = response.data;
                    setResultsInfo({ totalHits, totalPages, currentPage });
                    setError(false);
                    return setSearchResults(response.data.foods);
                }
            } catch (err) {
                setError(true);
            }
        }

        requestSearchResults(query, parseInt(currPageNum));
        setReloadOnSearch(false);
        setIsLoading(false);
    }, [reloadOnSearch])

    const maxPage = resultsInfo.totalPages < 200 ? resultsInfo.totalPages : 200;

    if (isLoading) {
        return (
            <div className="displaySearchResultsParent">
                <h1>Loading</h1>
            </div>
        )
    }

    if (!isLoading && resultsInfo.totalHits === 0) {
        return (
            <div className="displaySearchResultsParent">
                <p className="searchNoResultsText">
                    No results found. Please check your spelling, or try a different search.
                </p>
            </div>
        )
    } else if (searchResults && !isLoading) {

        return (
            <div className="displaySearchResultsParent">
                <div className="pageInfo">
                <p className="pageInfoText numHits"> Total Hits: {resultsInfo.totalHits} </p> 
                <p className="pageInfoText numHits">{'\u2022'}</p>  
                <p className="pageInfoText numHits">Displaying Page {currPageNum} of {maxPage}</p> 
                </div>
                
                <PaginationBar 
                query={query}
                maxPage={maxPage} 
                currPageNum={currPageNum} />

                <div className='resultsContainer'>
                    {searchResults.map(i => {
                        const { description, brandName, foodCategory, dataType, fdcId } = i;

                        return (
                            <ListGroupItem
                                key={fdcId}
                                className="searchResultsListGroupItem"
                            >
                                <Link to={`/food/${fdcId}`}
                                    className="customSearchLink">
                                    <ListGroupItemHeading
                                        className="searchResultsListHeading customHeading">
                                        {description}
                                    </ListGroupItemHeading>
                                    <div className="searchResultsListText customText">
                                        <div>fdcId: {fdcId}</div>

                                        <div>Category: {foodCategory}</div>

                                        <div>Data Type: {dataType}
                                            {i.addiListGroupItemTexttionalDescription ? i.additionalDescription : ''}</div>
                                    </div>
                                </Link>

                            </ListGroupItem>)
                    })}
                </div>

            </div>
        )
    }
}


export default DisplaySearchResults;
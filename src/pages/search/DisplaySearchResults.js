import {
    Button,
    ListGroupItem,
    ListGroupItemHeading,
    Label,
    Form,
    Input
} from "reactstrap";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams, useOutletContext } from "react-router-dom";
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
    const navigate = useNavigate();

    useEffect(() => {
        async function requestSearchResults(query, currPageNum) {
            try {
                console.log(query, currPageNum)
                const response = await requestFoodByQuery(query, currPageNum);
                console.log(query, currPageNum)
                if (response) {
                    const { totalHits, totalPages, currentPage } = response.data;
                    setResultsInfo({ totalHits, totalPages, currentPage });
                    setError(false);
                    console.log(response.data.food)

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


                <p className="pageInfo">
                    Total Hits: {resultsInfo.totalHits}
                </p>
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
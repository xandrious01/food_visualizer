import {
    Button,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Label,
    Form,
    Input, Col, Row,
} from "reactstrap";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams, useOutletContext } from "react-router-dom";
import { requestFoodByQuery } from "../../ApiCalls";
import { TriggerReloadContext } from "../../contexts";
import '../../styles/Search.css'




const DisplaySearchResults = () => {
    const { query, pageNum } = useParams();
    const { reloadOnSearch, setReloadOnSearch } = useContext(TriggerReloadContext);

    const [searchResults, setSearchResults] = useState([]);
    const [resultsInfo, setResultsInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [pageInput, setPageInput] = useState({ pageNum: '' });
    const [error, setError] = useState(false);

    const navigate = useNavigate();



    useEffect(() => {
        async function requestSearchResults(query, pageNum) {
            try {
                const response = await requestFoodByQuery(query, pageNum);
                console.log(response)
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

        requestSearchResults(query, parseInt(pageNum));
        setReloadOnSearch(false);
        setIsLoading(false);

    }, [reloadOnSearch])

    const maxPages = 200;
    const availablePagesToDisplay = resultsInfo.totalPages <= 200 ? resultsInfo.totalPages : 200;

    const handlePrev = () => {
        navigate(`/search/${query}/page/${parseInt(pageNum) - 1}`)
        return setReloadOnSearch(true)
    }


    const handleNext = () => {
        navigate(`/search/${query}/page/${parseInt(pageNum) + 1}`)
        return setReloadOnSearch(true)
    }


    const handlePageInputChange = e => {
        const { value } = e.target;
        const maxPages = resultsInfo.totalPages <= 200 ? resultsInfo.totalPages : 200;
        setPageInput(pageNum => {
            return (value <= 0 && value !== '') ? { pageNum: 1 } : (value > maxPages) ? { pageNum: maxPages } : { pageNum: value }

        })
    }


    const handlePageSubmit = e => {
        e.preventDefault();
        const { pageNum } = pageInput;
        navigate(`/search/${query}/page/${parseInt(pageNum)}`);
        console.log("submitting")
        setReloadOnSearch(true);
        setPageInput({ pageNum: '' })
    }

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
                    No results found. Please check your spelling, or try another term.
                </p>
            </div>
        )
    } else if (searchResults && !isLoading) {

        return (
            <div className="displaySearchResultsParent">

    
                    <p className="pageInfo">
                        Total Hits: {resultsInfo.totalHits}
                    </p>
           

                <div className="searchPaginationRow">


                    <Button
                        id="prevPageBtn"
                        className={pageNum === 1 || resultsInfo.totalPages === 1 ? 'disabled paginationBtn customPageBtn' : 'paginationBtn customPageBtn'}
                        onClick={handlePrev}
                    >Previous Page</Button>

                   
                    <div className='pageFormDiv'>
                        <p className='pageInfo'>
                            Displaying Page {resultsInfo.currentPage} of {availablePagesToDisplay}
                        </p>

                        <Form
                            onSubmit={handlePageSubmit}
                            className={resultsInfo.totalPages > 3 ? 'pageForm' : 'hidden'} >

                            <Label className="pageFormItem" htmlFor="pageNumInput" >
                                Jump to page:
                            </Label>

                            <Input
                                id="pageNum"
                                name="pageNum"
                                placeholder=""
                                type="number"
                                value={pageInput.pageNum}
                                onChange={handlePageInputChange}
                                className="pageInput pageFormItem"
                            />

                            <Button
                                className="pageInputSubmit pageFormItem customPageBtn"
                                type="submit">Go</Button>
                        </Form>
                        </div>
                  

                    <Button
                        onClick={handleNext}
                        id="nextPageBtn"
                        className={pageNum === resultsInfo.totalPages || resultsInfo.totalPages === 1 ? 'paginationBtn disabled customPageBtn' : 'paginationBtn customPageBtn'}
                    >Next Page
                    </Button>

                </div>

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
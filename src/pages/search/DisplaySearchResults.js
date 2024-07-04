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
    const {reloadOnSearch, setReloadOnSearch} = useContext(TriggerReloadContext);

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
        // setReloadOnSearch(true);
        setPageInput({ pageNum: '' })
    }

    if (isLoading) {
        return (
            <div>
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


                <div
                    className="searchInfo">
                    <p>
                        Total Hits: {resultsInfo.totalHits}
                    </p>
                </div>

                <Row>

                    <Col className="d-flex flex-row align-items-start">
                        <Button
                            className={pageNum === 1 ? 'disabled paginationBtn' : 'paginationBtn'}
                            onClick={handlePrev}
                        >Previous Page</Button>
                    </Col>

                    <Col className="pageInfoCol">
                        <p className='pageInfo'>
                            Displaying Page {resultsInfo.currentPage} of {availablePagesToDisplay}
                        </p>

                        <Row className={resultsInfo.totalPages > 3 ? "pageFormDiv" : "hidden"}>
                            <Form
                                onSubmit={handlePageSubmit}
                                className='pageForm'
                            >
                                <Col className='pageFormItem'>
                                    <Label htmlFor="pageNumInput" >
                                        Jump to page:
                                    </Label>
                                </Col>

                                <Col className='pageFormItem'>
                                    <Input
                                        id="pageNum"
                                        name="pageNum"
                                        placeholder=""
                                        type="number"
                                        value={pageInput.pageNum}
                                        onChange={handlePageInputChange}
                                        className="pageInput"
                                    />
                                </Col>
                                <Col className='pageFormItem'>
                                    <Button
                                        className="pageInputSubmit"
                                        type="submit">Go</Button>
                                </Col>
                            </Form>
                        </Row>


                    </Col>

                    <Col className="d-flex flex-row-reverse align-items-start">
                        <Button
                            onClick={handleNext}

                            className={pageNum === resultsInfo.totalPages ? 'paginationBtn disabled' : 'paginationBtn'}
                        >Next Page</Button>
                    </Col>

                </Row>

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
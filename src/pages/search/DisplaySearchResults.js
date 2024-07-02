import {
    Button,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Label,
    Form,
    Input, Col, Row,
} from "reactstrap";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { requestFoodByQuery } from "../../ApiCalls";
import '../../styles/Search.css'




const DisplaySearchResults = () => {
    const { query, pageNum } = useParams();

    const [searchResults, setSearchResults] = useState([]);
    const [resultsInfo, setResultsInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [pageInput, setPageInput] = useState({ pageNum: '' });
    const [reloadResults, setReloadResults] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function requestSearchResults(query, pageNum) {
            try {
                const response = await requestFoodByQuery(query, pageNum);
                if (response) {
                    const { totalHits, totalPages, currentPage } = response.data;
                    setResultsInfo({ totalHits, totalPages, currentPage });
                    return setSearchResults(response.data.foods);
                }
            } catch (err) {
                console.log(err)
            }
        }

        requestSearchResults(query, parseInt(pageNum));
        setReloadResults(false);
        setIsLoading(false);

    }, [reloadResults])

    const handlePrev = () => {
        navigate(`/search/${query}/page/${parseInt(pageNum) - 1}`)
        return setReloadResults(true)
    }


    const handleNext = () => {
        navigate(`/search/${query}/page/${parseInt(pageNum) + 1}`)
        return setReloadResults(true)
    }


    const handlePageInputChange = e => {
        const { value } = e.target;
        setPageInput(pageInput => {
            return (value <= 0 && value !== '') ? { pageNum: 1 } : (value > resultsInfo.totalPages) ? { pageNum: resultsInfo.totalPages } : { pageNum: value }

        })
    }


    const handlePageSubmit = e => {
        e.preventDefault();
        const { pageNum } = pageInput;
        navigate(`/search/${query}/page/${parseInt(pageNum)}`);
        setReloadResults(true);

    }
    console.log(searchResults)

    if (isLoading) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    }
    else if (searchResults && !isLoading) {

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
                            Displaying Page {resultsInfo.currentPage} of {resultsInfo.totalPages}
                        </p>
                        <Row className="pageFormDiv">
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
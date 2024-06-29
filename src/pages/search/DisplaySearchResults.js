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
    const [pageInputError, setPageInputError] = useState(false)

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
        requestSearchResults(query, pageNum);
        setIsLoading(false);

    }, [query, pageInput, pageNum])

    const handlePrev = () => navigate(`/search/${query}/page/${pageNum * 1 - 1}`)


    const handleNext = () => navigate(`/search/${query}/page/${pageNum * 1 + 1}`)


    const handlePageInputChange = e => {
        const { value } = e.target;
        setPageInput(pageInput => {
            return (value <= 0) ? { pageNum: 1 } : (value > resultsInfo.totalPages) ? { pageNum: resultsInfo.totalPages } : { pageNum: value }
        })
    }


    const handlePageSubmit = e => {
        e.preventDefault();
        const { pageNum } = pageInput;
        navigate(`/search/${query}/page/${parseInt(pageNum)}`);

    }


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


                <p>Total Hits: {resultsInfo.totalHits}</p>
                <Row>

                    <Col className="d-flex flex-row align-items-start">
                        <Button
                            className={pageNum === 1 ? 'disabled' : ''}
                            onClick={handlePrev}
                        >Previous Page</Button>
                    </Col>

                    <Col className="d-flex flex-column">
                        <p className='pageInfo'>
                            Displaying Page {resultsInfo.currentPage} of {resultsInfo.totalPages}
                        </p>

                        <Form onSubmit={handlePageSubmit}>
                            <div className='d-inline-flex'>
                                <Label htmlFor="pageNumInput" >
                                    Jump to page:
                                </Label>
                            </div>

                            <div className='d-inline-flex'>
                                <Input
                                    id="pageNum"
                                    name="pageNum"
                                    placeholder=""
                                    type="number"
                                    value={pageInput.pageNum}
                                    onChange={handlePageInputChange}
                                />
                            </div>
                            <div className='d-inline-flex'>
                                <Button
                                    type="submit">Go</Button>
                            </div>
                        </Form>


                    </Col>

                    <Col className="d-flex flex-row-reverse align-items-start">
                        <Button
                            onClick={handleNext}

                            className={pageNum === resultsInfo.totalPages ? 'disabled' : ''}
                        >Next Page</Button>
                    </Col>

                </Row>

                <div className='resultsContainer'>
                    {searchResults.map(i => {
                        const { description, brandName, foodCategory, dataType, fdcId } = i;

                        return (
                            <ListGroupItem
                                key={fdcId}
                            >
                                <Link to={`/food/${fdcId}`}>
                                    <ListGroupItemHeading>
                                        {description}
                                    </ListGroupItemHeading>
                                    <ListGroupItemText>
                                        fdcId: {fdcId}

                                        Category: {foodCategory}

                                        Data Type: {dataType}
                                        {i.additionalDescription ? i.additionalDescription : ''}
                                    </ListGroupItemText>
                                </Link>

                            </ListGroupItem>)
                    })}
                </div>

            </div>
        )
    }
}


export default DisplaySearchResults;
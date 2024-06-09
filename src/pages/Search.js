import React from "react";
import Searchbar from "../components/Searchbar";
import SearchResults from "../components/SearchResults";
import { Container, List } from "reactstrap";
import { requestFoodByQuery } from "../ApiCalls";

const Search = () => {
    // let testQuery = "onions";
    // requestFoodByQuery(testQuery);
    return (
        <Container>
            <div>
                <Searchbar />
            </div>
            <div>
                <SearchResults />
            </div>

        </Container>
    )
};

export default Search;
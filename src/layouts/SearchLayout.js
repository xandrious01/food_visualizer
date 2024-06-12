import { useState } from "react";
import { Container } from "reactstrap";
import Searchbar from "../pages/search/Searchbar";
import DisplaySearchResults from "../pages/search/DisplaySearchResults";
import { Outlet, useParams } from "react-router-dom";

const SearchLayout = () => {
    const [searchResults, setSearchResults] = useState(null);
    const query = useParams();
    console.log(query)

    return (
        <Container>
            <Searchbar />
            <Outlet />
        </Container>
    )

}

export default SearchLayout;
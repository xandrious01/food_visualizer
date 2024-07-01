import { useState } from "react";
import { Container } from "reactstrap";
import Searchbar from "../pages/search/Searchbar";
import { Outlet, useParams } from "react-router-dom";
import '../styles/Search.css';

const SearchLayout = () => {
    // const [searchResults, setSearchResults] = useState(null);
    // const {query, pageNum} = useParams();

    return (
        <div className="searchParentDiv">
            <Searchbar />
            <Outlet />
        </div>
    )

}

export default SearchLayout;
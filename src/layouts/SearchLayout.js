import { useState } from "react";
import { Container } from "reactstrap";
import Searchbar from "../pages/search/Searchbar";
import { Outlet, useParams } from "react-router-dom";
import '../styles/Search.css';

const SearchLayout = () => {
    const [searchResults, setSearchResults] = useState(null);
    const query = useParams();

    return (
        <div>
            <Searchbar />
            <Outlet />
        </div>
    )

}

export default SearchLayout;
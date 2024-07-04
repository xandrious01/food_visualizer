import { useState, useContext } from "react";
import { Container } from "reactstrap";
import Searchbar from "../pages/search/Searchbar";
import { Outlet, useParams } from "react-router-dom";
import '../styles/Search.css';
import { TriggerReloadContext } from "../contexts";

const SearchLayout = () => {
    const {reloadOnSearch, setReloadOnSearch} = useContext(TriggerReloadContext);

    return (
        <div className="searchParentDiv">
            <Searchbar />
            <Outlet />
        </div>
    )

}

export default SearchLayout;
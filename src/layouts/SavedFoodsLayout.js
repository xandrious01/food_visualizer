import { useState } from "react";
import { Container } from "reactstrap";
import Searchbar from "../pages/search/Searchbar";
import DisplaySearchResults from "../pages/search/DisplaySearchResults";
import { Outlet, useParams } from "react-router-dom";

const SavedFoodsLayout = () => {

    return (
        <div>
            <h1>My Foods</h1>
            <Outlet />
        </div>
    )

}

export default SavedFoodsLayout;
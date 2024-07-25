import {  useContext } from "react";
import { Outlet } from "react-router-dom";
import '../styles/Search.css';
import { TriggerReloadContext } from "../contexts";

const SearchLayout = () => {

    return (
            <Outlet />
    )

}

export default SearchLayout;
import {  useContext } from "react";

import Searchbar from "../pages/search/Searchbar";
import { Outlet } from "react-router-dom";
import '../styles/Search.css';
import { TriggerReloadContext } from "../contexts";

const SearchLayout = () => {
    const {reloadOnSearch, setReloadOnSearch} = useContext(TriggerReloadContext);

    return (
        <div className="searchParentDiv"
        >
            {/* <div className="searchbarMainDiv">
                <Searchbar />
                </div> */}
            
            <Outlet />
        </div>
    )

}

export default SearchLayout;
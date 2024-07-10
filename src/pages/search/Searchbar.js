import { useState, useContext } from "react";
import { Input, Button } from "reactstrap";
import { Form, useNavigate } from "react-router-dom";
import { TriggerReloadContext } from "../../contexts";
import '../../styles/Search.css'




const Searchbar = () => {
    const { reloadOnSearch, setReloadOnSearch } = useContext(TriggerReloadContext);
    const INITIAL_STATE = { query: '' };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();
    let pageNum = 1;

    const handleChange = e => {
        const { value } = e.target;
        setFormData(formData => ({ ...formData, query: value }))
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (formData.query !== '') {
            navigate(`/search/${formData.query}/page/${pageNum}`);
            setFormData(INITIAL_STATE);
            setReloadOnSearch(true);
        }
    }

    return (

        <Form id="search-form"
            className="customSearchForm"
            role="search"
            onSubmit={handleSubmit}>
            <div className="searchbar" id="searchbarMain">
                    <Input
                        id="query"
                        aria-label="Search for a food"
                        placeholder="Search"
                        type="text"
                        name="query"
                        value={formData.query}
                        onChange={handleChange}
                        className="searchbarInput customInput"
                    />
                <Button
                    className="searchSubmit customSearchBtn"
                    type="submit">
                    Search</Button>
            </div>
        </Form>

    )
};

export default Searchbar
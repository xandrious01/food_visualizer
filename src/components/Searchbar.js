import React, { useState } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { requestFoodByQuery } from "../ApiCalls";

const Searchbar = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    

    const handleChange = e => {
        const { value } = e.target;
        setSearchInput(val => value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        getSearchResults(searchInput)
    }

    async function getSearchResults() {
        try {
            const response = await requestFoodByQuery(searchInput);
            setResults(response.data.foods);
        } catch(err){
            console.log(err)
        }
       
    }

    return (
        <div className='searchbar'>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input
                        className="searchbar-input"
                        name="searchInput"
                        type="text"
                        value={searchInput}
                        onChange={handleChange} />
                </FormGroup>
                <Button type="submit">
                    Search
                </Button>
            </Form>
        </div>
    )
};

export default Searchbar;
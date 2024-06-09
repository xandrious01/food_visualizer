import React, { useState } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

const Searchbar = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        const { value } = e.target;
        setSearch(val => value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(search)
    }
    return (
        <div className='searchbar'>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input
                        className="searchbar-input"
                        name="search"
                        type="text"
                        value={search}
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
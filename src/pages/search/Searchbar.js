import { useState } from "react";
import { FormGroup, Input, Button } from "reactstrap";
import { Form, useNavigate, redirect, useSearchParams } from "react-router-dom";
import { requestFoodByQuery } from "../../ApiCalls";


const Searchbar = () => {
    const INITIAL_STATE = {query: ''};
    const [formData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();

    const handleChange = e => {
        const { value } = e.target;
        setFormData(formData => ({...formData, query:value}))
    }

    const handleSubmit = e => {
        e.preventDefault();
        navigate(formData.query)
        setFormData(INITIAL_STATE);
    }

    return (
        <div className='searchbar'>
            <Form id="search-form" role="search" onSubmit={handleSubmit}>
                <Input
                    id="query"
                    aria-label="Search for a food"
                    placeholder="Search"
                    type="text"
                    name="query"
                    value={formData.query}
                    onChange={handleChange}  
                />
                <Button type="submit">Search</Button>
            </Form>
        </div>
    )
};

export default Searchbar
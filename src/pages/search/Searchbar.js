import { useState } from "react";
import { FormGroup, Input, Button } from "reactstrap";
import { Form, useNavigate, redirect, useSearchParams } from "react-router-dom";
import { requestFoodByQuery } from "../../ApiCalls";
import '../../styles/Search.css'



const Searchbar = () => {
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
        navigate(`/search/${formData.query}/page/${pageNum}`);
        setFormData(INITIAL_STATE);
    }

    return (
        <div className='searchbar'>
            <Form id="search-form" role="search" onSubmit={handleSubmit}>
                <FormGroup>
                    <Input
                        id="query"
                        aria-label="Search for a food"
                        placeholder="Search"
                        type="text"
                        name="query"
                        value={formData.query}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Button type="submit">Search</Button>
                </FormGroup>
            </Form>
        </div>
    )
};

export default Searchbar
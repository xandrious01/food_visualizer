import React from "react";
import { Container } from "reactstrap";
import Search from "./Search";
import Searchbar from "../components/Searchbar";
import Food from "./Food";
import DisplayFood from "../components/DisplayFood";

const Home = () => {
    return (
        <Container>
            <h1>
                I am the homepage
            </h1>
            <Search />
            <DisplayFood />
            
        </Container>
    )
}

export default Home;

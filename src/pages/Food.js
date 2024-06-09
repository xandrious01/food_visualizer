import React, {useState, PureComponent} from "react";
import { Container } from "reactstrap";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { requestFoodById } from "../ApiCalls";

const Food = (foodId) => {

    return (
        <Container>
            <h1>
                I am the page for {foodId}
            </h1>
        </Container>
    )
};

export default Food;
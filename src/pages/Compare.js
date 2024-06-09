import React, {PureComponent} from "react";
import { Container } from "reactstrap";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const Compare = ({food1, food2}) => {
    return (
        <Container>
            <div className="col-5 Compare-div">
                <h2>I am the compare div for {food1}</h2>
            </div>
            <div className="col-5 Compare-div">
                <h2>I am the compare div for {food2}</h2>
            </div>
        </Container>
    )
}

export default Compare;
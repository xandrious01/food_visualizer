import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const PieGraph = ({foodNutrients}) => {
  const {macros, micros} = foodNutrients;
  return (
    <PieChart width={1000} height={1000}>
      <Pie
        data={macros}
        dataKey="value"
        cx={200}
        cy={200}
        outerRadius={60}
        fill="#8884d8"
        label={{ value: 'value', position: 'inside' }}
      />
      <Pie
        data={micros}
        dataKey="value"
        cx={200}
        cy={200}
        innerRadius={70}
        outerRadius={90}
        fill="#82ca9d"
        label={{ value: 'name', position: 'inside' }}
      />
    </PieChart>
  );
};

export default PieGraph;
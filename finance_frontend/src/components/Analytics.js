import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./style/analytics.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CF0"];

const Analytics = (props) => {
  if (props.chartLoading) {
    return <div>Loading...</div>;
  }

  if (props.chartError) {
    return <div>{props.chartError}</div>;
  }

  return (
    <div className="analytics-container">
      <div className="analytics-summary">
        <p>Total Income: ${props.analyticsData.totalIncome.toLocaleString()}</p>
        <p>
          Total Expenses: ${props.analyticsData.totalExpenses.toLocaleString()}
        </p>
      </div>
      <div className="chart-container">
        <PieChart width={500} height={400}>
          <Pie
            data={props.analyticsData.types}
            dataKey="amount"
            nameKey="type"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {props.analyticsData.types.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Analytics;

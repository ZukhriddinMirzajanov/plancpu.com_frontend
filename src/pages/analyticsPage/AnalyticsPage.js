import React from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import "./AnalyticsPage.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const AnalyticsPage = () => {
  const data = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 200 },
    { name: "Mar", value: 150 },
    { name: "Apr", value: 250 },
    { name: "May", value: 180 },
    { name: "Jun", value: 220 },
  ];
  return (
    <>
      <NavbarComponent />
      <div className="container-fluid main-box">
        <h1 className="text-center">Analytics</h1>
        <div className="line-graph">
          <LineChart width={800} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;

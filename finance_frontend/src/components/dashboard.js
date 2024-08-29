import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style/dashboard.css";
import TransactionService from "../services/transaction.service";
import AuthService from "../services/auth.service";
import Analytics from "./Analytics";

const DashboardComponent = () => {
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartError, setChartError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);

  function formatDate(isoString) {
    const date = new Date(isoString);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await TransactionService.getAll();

        console.log("API response:", response);
        setTransactions(response.data);
        const user = AuthService.getCurrentUser();
        setUserData(user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };
    const fetchAnalyticsData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/api/analytics",
          {
            headers: { "x-access-token": token },
          }
        );
        console.log("Trans", response.data);
        setAnalyticsData(response.data);
      } catch (err) {
        setChartError("Error fetching analytics data");
        console.error("Error fetching data:", err);
      } finally {
        setChartLoading(false);
      }
    };

    fetchTransactions();
    fetchAnalyticsData();
  }, []);

  if (loading || chartLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-container container">
      <div className="main-content row justify-content-around">
        <div className="transactions card col-4">
          <h2>Recent Transactions</h2>
          <ul>
            {transactions
              .sort((a, b) => b.id - a.id)
              .slice(0, 6)
              .map((transaction) => (
                <li key={transaction.id}>
                  <span>{formatDate(transaction.date)}</span>
                  <span>${transaction.amount.toLocaleString()}</span>
                </li>
              ))}
          </ul>
          <div className="see-more-container">
            <Link to="/transactions" className="see-more-link">
              See All
            </Link>
          </div>
        </div>
        <div className="analytics card col-7">
          <h2>Analytics</h2>
          <Analytics
            analyticsData={analyticsData}
            chartLoading={chartLoading}
            chartError={chartError}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;

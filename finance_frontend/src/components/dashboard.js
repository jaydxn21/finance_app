import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "/Users/nimoyburrowes/Documents/finance_app/finance_frontend/src/dashboard.css";
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       setError("No authentication token found. Please log in.");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       // Update URL to match your backend port and route
  //       const response = await axios.get(
  //         "http://localhost:8080/api/transactions",
  //         {
  //           headers: { "x-access-token": token },
  //         }
  //       );

  //       setTransactions(response.data);
  //     } catch (err) {
  //       setError("Error fetching data. Please try again.");
  //       console.error(
  //         "Error fetching data:",
  //         err.response ? err.response.data : err.message
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="header">
          <h1>Welcome, {userData.username}</h1>
          {/* <p>Balance: ${userData.balance.toLocaleString()}</p> */}
        </div>

        <Link to="/add-transaction" className="add-transaction-button">
          Add Transaction
        </Link>
        {transactions.map((transaction) => (
          <div key={transaction.id} className="transaction-actions">
            <Link
              to={`/update-transaction/${transaction.id}`}
              className="update-transaction-button"
            >
              Update Transaction
            </Link>
            <Link
              to={`/delete-transaction/${transaction.id}`}
              className="delete-transaction-button"
            >
              Delete Transaction
            </Link>
          </div>
        ))}
      </div>
      <div className="main-content">
        <div className="balance">
          <div className="balance-statistic">
            {/* ${userData.balance.toLocaleString()} */}
          </div>
          <div className="balance-details">
            <div>Incoming: $</div>
            <div>Outgoing: $</div>
          </div>
        </div>
        <div className="transactions">
          <h2>Transactions</h2>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <span>{new Date(transaction.date).toLocaleDateString()}</span>
                {/* <span>{transaction.description}</span> */}
                <span>${transaction.amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="analytics">
          <h2>Analytics</h2>
          <Analytics
            analyticsData={analyticsData}
            chartLoading={chartLoading}
            chartError={chartError}
          />
          {/* Add your analytics components here */}
        </div>
        <div className="recent-transactions">
          <h2>Recent Transactions</h2>
          {/* Display recent transactions here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;

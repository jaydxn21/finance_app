import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/transactionList.css";
import TransactionService from "../../services/transaction.service";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  function formatDate(isoString) {
    const date = new Date(isoString);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      const userId = localStorage.getItem("userId");

      try {
        const response = await axios.get(
          "http://localhost:8080/api/transaction/user/1",
          {
            headers: { "x-access-token": token },
          }
        );

        console.log("API response:", response);
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (transactionId) => {
    const token = localStorage.getItem("token");

    try {
      TransactionService.deleteTransaction(transactionId);
      setTransactions(transactions.filter((t) => t.id !== transactionId));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="transaction-list-container">
      <div className="sidebar">
        <Link to="/add-transaction" className="add-transaction-button">
          Add Transaction
        </Link>
      </div>
      <div className="main-content">
        <h2>Transaction List</h2>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>{transaction.transactionType.description}</td>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.description}</td>
                <td>
                  <Link
                    to={`/update-transaction/${transaction.id}`}
                    className="update-button"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;

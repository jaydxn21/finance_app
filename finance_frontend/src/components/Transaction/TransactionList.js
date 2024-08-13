import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/transactionList.css";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

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
      await axios.delete(
        "http://localhost:8080/api/transaction/${transactionId}",
        {
          headers: { "x-access-token": token },
        }
      );
      setTransactions(transactions.filter((t) => t.id !== transactionId));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  // return (
  //   <div>
  //     <h2>Transaction List</h2>
  //     <ul>
  //       {transactions.map((transaction) => (
  //         <li key={transaction.id}>
  //           {transaction.amount} - {transaction.type} - {transaction.date} -{" "}
  //           {transaction.description}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  return (
    <div>
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
              <td>{transaction.type}</td>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
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
  );
};

export default TransactionList;

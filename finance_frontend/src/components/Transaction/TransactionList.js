import React, { useState, useEffect } from "react";
// import TransactionService from "../../services/transaction.service";
import axios from "axios";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     try {
  //       const response = await TransactionService.getAll();
  //       console.log("API response:", response);
  //       setTransactions(response.data);
  //     } catch (error) {
  //       console.error(error);
  //       console.error("Error fetching transactions:", error);
  //     }
  //   };

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

  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.amount} - {transaction.type} - {transaction.date} -{" "}
            {transaction.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;

import React, { useState, useEffect } from "react";
import TransactionService from "../../services/transaction.service";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await TransactionService.getAll();
        setTransactions(response.data);
      } catch (error) {
        console.error(error);
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

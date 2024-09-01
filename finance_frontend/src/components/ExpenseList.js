import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "https://finance-app-yuvz.onrender.com/api/expense",
          {
            headers: { "x-access-token": token },
          }
        );

        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.amount} - {expense.description} on {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;

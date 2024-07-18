import React, { useState } from "react";
import axios from "axios";

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/expense",
        { amount, description, date },
        { headers: { "x-access-token": token } }
      );

      console.log("Expense added:", response.data);
      setAmount("");
      setDescription("");
      setDate("");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;

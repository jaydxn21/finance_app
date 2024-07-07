import React, { useState } from "react";
import TransactionService from "../../services/transaction.service";

const AddTransaction = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      await TransactionService.create({ amount, type, date, description });
      alert("Transaction added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <form onSubmit={handleAddTransaction}>
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
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;

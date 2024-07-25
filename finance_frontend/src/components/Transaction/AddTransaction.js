import React, { useState, useEffect } from "react";
import TransactionService from "../../services/transaction.service";
import TransactionTypeService from "../../services/transactionType.service";
import { response } from "express";

const AddTransaction = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [transactionTypes, setTransactionTypes] = useState([]);

  useEffect(() => {
    TransactionTypeService.getAll()
      .then((response) => response.json())
      .then((data) => setTransactionTypes(data))
      .catch((error) =>
        console.error("Error fetching transaction types:", error)
      );
  }, []);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      await TransactionService.create({
        amount,
        type,
        date,
        description,
        userId,
      });
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
          <select
            id="transactionType"
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select a type</option>
            {transactionTypes.map((type) => (
              <option
                key={type.transactionTypeId}
                value={type.transactionTypeId}
              >
                {type.description}
              </option>
            ))}
          </select>
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

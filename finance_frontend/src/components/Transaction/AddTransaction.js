import React, { useState, useEffect } from "react";
import TransactionService from "../../services/transaction.service";
import TransactionTypeService from "../../services/transactionType.service";
import { useParams } from "react-router-dom";
import "../style/transaction/add.css";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [transactionTypes, setTransactionTypes] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    TransactionTypeService.getAll()
      .then((response) => {
        setTransactionTypes(response.data);
      })
      .catch((error) =>
        console.error("Error fetching transaction types:", error)
      );
  }, []);

  useEffect(() => {
    if (id !== null && transactionTypes.length > 0) {
      TransactionService.get(id)
        .then((response) => {
          setAmount(response.data.amount);
          setDate(response.data.date.substring(0, 10));
          setDescription(response.data.description);
          setType(response.data.typeId);
        })
        .catch((error) =>
          console.error("Error fetching transaction types:", error)
        );
    }
  }, [id, transactionTypes]);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;
      await TransactionService.create({
        amount,
        typeId: type,
        date,
        description,
        userId,
      });
      alert("Transaction added successfully");
      navigate("/transactions");
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
            {transactionTypes &&
              transactionTypes?.map((type) => (
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
            max={today}
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddTransaction;

// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AddTransaction from "./components/Transaction/AddTransaction";
import TransactionList from "./components/Transaction/TransactionList";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/expenses" element={<ExpenseList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

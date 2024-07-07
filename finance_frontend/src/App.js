// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AddTransaction from "./components/Transactions/AddTransaction";
import TransactionList from "./components/Transactions/TransactionList";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

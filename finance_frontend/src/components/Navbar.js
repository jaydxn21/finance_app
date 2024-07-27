import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/add-transaction">Add Transaction</Link>
        </li>
        <li>
          <Link to="/transactions">Transaction List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

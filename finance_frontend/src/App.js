import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AddTransaction from "./components/Transaction/AddTransaction";
import TransactionList from "./components/Transaction/TransactionList";
import Navbar from "./components/Navbar";
import DashboardComponent from "./components/dashboard";
import "../src/components/style/navbar.css";
import UpdateTransaction from "./components/Transaction/UpdateTransaction";
import AboutUs from "./components/AboutUs";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const AppRoute = () => {
  const location = useLocation();
  const showNavbar =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<DashboardComponent />} />
        <Route path="/transactions" element={<TransactionList />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/update-transaction/:id" element={<UpdateTransaction />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/dashboard" element={<DashboardComponent />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppRoute />
  </Router>
);

export default App;

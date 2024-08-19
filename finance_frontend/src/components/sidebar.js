import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style/sidebar.css";

const SidebarComponent = ({ userData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="sidebar-container">
      <div className="hamburger-menu" onClick={toggleSidebar}>
        &#9776;
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="header">
          <div className="profile-container">
            <img
              src={require("../img/defaultprofilepic.jpg")}
              alt="Profile"
              className="profile-picture"
            />
            <h1>Welcome, {userData.username}</h1>
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/settings">Settings</Link>
            </li>

            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarComponent;

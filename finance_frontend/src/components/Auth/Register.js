import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";
import "./styles/register.css";
import financePhoto from "../../img/financephoto.jpg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    console.log("handleRegister called");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await AuthService.register(username, email, password);
      console.log("Registration response:", response);
      alert("Registration successful");
      navigate("/add-expense");
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
        alert(`Registration failed: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.error("Error Message:", error.message);
      }
    }
  };

  return (
    <div className="register-body">
      <div className="container">
        <div className="left-panel">
          <div className="logo">FNCE.</div>
          <div className="register-form">
            <h2>Sign Up</h2>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="log-in">
                Log in here
              </Link>
            </p>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
        <div className="right-panel">
          <img src={financePhoto} alt="Finance" />
          <p>Get All Your Finances At One Place.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;

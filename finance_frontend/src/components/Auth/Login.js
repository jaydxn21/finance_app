import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  navigate("/home");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password);
      navigate("/transactions"); // Use history.push for navigation
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="loginBtn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";
import "./styles/login.css";
import financePhoto from "../../img/financephoto.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-body">
      <div className="authcontainer">
        <div className="left-panel">
          <div className="logo">FNCE.</div>
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
              <a href="#" className="forgot-password">
                Forgot your password?
              </a>
              <button type="submit">Login</button>
            </form>
            <p>
              Don't have an account?{" "}
              <Link className="registerLink" to="/register">
                Register
              </Link>
            </p>
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

export default Login;

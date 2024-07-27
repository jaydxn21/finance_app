import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";
import "./styles/login.css";
// import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password);
      navigate("/transactions");
    } catch (error) {
      console.error(error);
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/auth/login",
  //       {
  //         email,
  //         password,
  //       }
  //     );

  //     localStorage.setItem("token", response.data.token);
  //     navigate("/expenses"); // Redirect to the expense list after login
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //   }
  // };

  return (
    //     <div>
    //       <h2>Login</h2>
    //       <form onSubmit={handleLogin}>
    //         <div>
    //           <label>Email:</label>
    //           <input
    //             type="email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             required
    //           />
    //         </div>
    //         <div>
    //           <label>Password:</label>
    //           <input
    //             type="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             required
    //           />
    //         </div>
    //         <button className="loginBtn" type="submit">
    //           Login
    //         </button>
    //       </form>
    //     </div>
    //   );
    // };

    <div className="container">
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
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
      <div className="right-panel">
        <img
          src="/img/scott-graham-5fNmWej4tAA-unsplash.jpg"
          alt="Illustration"
        />
        <p>Get All Your Finances At One Place.</p>
      </div>
    </div>
  );
};

export default Login;

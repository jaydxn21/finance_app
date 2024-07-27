import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";
import "./styles/register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Basic client-side validation
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
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
        alert(`Registration failed: ${error.response.data.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error Message:", error.message);
      }
    }
  };

  // return (
  //   <div>
  //     <h2>Register</h2>
  //     <form onSubmit={handleRegister}>
  //       <div>
  //         <label>Username:</label>
  //         <input
  //           type="text"
  //           value={username}
  //           onChange={(e) => setUsername(e.target.value)}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label>Email:</label>
  //         <input
  //           type="email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label>Password:</label>
  //         <input
  //           type="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           required
  //         />
  //       </div>
  //       <button type="submit">Register</button>
  //     </form>
  //   </div>
  // );

  return (
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
        <img src="/img/scott-graham-5fNmWej4tAA-unsplash.jpg" alt="Finance" />
        <p>Get All Your Finances At One Place.</p>
      </div>
    </div>
  );
};

export default Register;

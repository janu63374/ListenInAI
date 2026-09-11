import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import logo from "../assets/logo.png";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password
        }
      );

      alert(response.data.message);
      navigate("/upload");

    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
  <div className="login-container">

<div className="login-left">

  <img
    src={logo}
    alt="ListenIn AI Logo"
    className="auth-logo"
  />

  <h1>ListenIn AI</h1>

  <p>
    Upload PDFs<br />
    Generate AI Summaries<br />
    Listen to Podcasts<br />
    Take Smart Quizzes<br />
    Ask Questions by Voice
  </p>

</div>

    <div className="login-right">

      <div className="login-card">

        <h2>Welcome Back</h2>

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="login-btn"
          onClick={loginUser}
        >
          Login
        </button>

        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/">
            Register Here
          </Link>
        </p>

      </div>

    </div>

  </div>
);
}

export default Login;
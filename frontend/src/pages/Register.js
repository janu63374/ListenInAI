import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import logo from "../assets/logo.png";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        {
          name,
          email,
          password
        }
      );

      alert(response.data.message);
      navigate("/login");

    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
  <div className="register-container">

    <div className="register-left">

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

    <div className="register-right">

      <div className="register-card">

        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />

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
          className="register-btn"
          onClick={registerUser}
        >
          Register
        </button>

        <p className="login-link">
          Already have an account?{" "}
          <Link to="/login">
            Login Here
          </Link>
        </p>

      </div>

    </div>

  </div>
);
}

export default Register;
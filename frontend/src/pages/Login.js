import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={loginUser}>
        Login
      </button>

      <p>
      Don't have an account?
      <Link to="/">
      Register Here
     </Link>
     </p>

    </div>
  );
}

export default Login;
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Register</h1>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

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

      <button onClick={registerUser}>
        Register
      </button>

      <p>
      Already have an account?
      <Link to="/login">
       Login Here
      </Link>
      </p>

    </div>
  );
}

export default Register;
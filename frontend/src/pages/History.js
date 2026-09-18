import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function History() {

  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    loadHistory(user.email);

  }, []);

  const loadHistory = async (email) => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/history?email=${email}`
      );

      setHistory(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>📚 My History</h1>

      {history.map((item) => (

        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px"
          }}
        >

          <h3
  style={{ cursor: "pointer", color: "#2563eb" }}
  onClick={() => navigate(`/history/${item.id}`)}
>
  {item.file_name}
</h3>

          <p>{item.created_at}</p>

        </div>

      ))}

    </div>

  );

}

export default History;
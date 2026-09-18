import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function HistoryDetails() {

  const { id } = useParams();

  const [history, setHistory] = useState(null);

  useEffect(() => {

    axios
      .get(`http://localhost:5000/api/history/details/${id}`)
      .then((response) => {

        setHistory(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, [id]);

  if (!history) {
    return <h2>Loading...</h2>;
  }

  return (

    <div style={{ padding: "20px" }}>

      <h1>{history.file_name}</h1>

      <h3>Content</h3>

      <textarea
        rows="10"
        cols="100"
        value={history.content || ""}
        readOnly
      />

      <br /><br />

      <h3>Summary</h3>

      <textarea
        rows="10"
        cols="100"
        value={history.summary || ""}
        readOnly
      />

      <br /><br />

    </div>

  );

}

export default HistoryDetails;
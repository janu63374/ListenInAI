import { useState } from "react";
import axios from "axios";

function Upload() {

  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");

  const uploadPDF = async () => {

    const formData = new FormData();
    formData.append("pdf", file);
    
    const response = await axios.post(
  "http://localhost:5000/api/upload",
  formData
   );

    setContent(response.data.text);

    alert("Upload Successful");
  };

  const generateSummary = async () => {

  try {

    const response = await axios.post(
      "http://localhost:5000/api/summarize",
      {
        text: content
      }
    );

    setSummary(response.data.summary);

  } catch (error) {

    console.log(error);
    alert("Summary generation failed");

  }
};

  return (
    <div>
      <h1>Upload PDF</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <button onClick={uploadPDF}>
        Upload
      </button>
      <br /><br />

     <textarea
       rows="20"
       cols="100"
       value={content}
       readOnly
     />

     <h2>AI Summary</h2>

      <button onClick={generateSummary}>
      Generate Summary
      </button>
      <br /><br />

<textarea
  rows="10"
  cols="100"
  value={summary}
  readOnly
/> 
    </div>
  );
}

export default Upload;
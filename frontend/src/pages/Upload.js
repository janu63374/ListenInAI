import { useState } from "react";
import axios from "axios";
import "../styles/Upload.css";
import logo from "../assets/logo.png";
import bannerImage from "../assets/hero.png";

function Upload() {

  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [activePage, setActivePage] = useState("podcast");
  const [podcastScript, setPodcastScript] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

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

const generatePodcast = async () => {

  try {

    const response = await axios.post(
      "http://localhost:5000/api/podcast",
      {
        text: content
      }
    );

    setPodcastScript(response.data.podcast);

  } catch (error) {

    console.log(error);
    alert("Podcast generation failed");

  }
};

const generateQuiz = async () => {

  try {

    const response = await axios.post(
      "http://localhost:5000/api/quiz",
      {
        text: content
      }
    );

    setQuiz(response.data.quiz);

  } catch (error) {

    console.log(error);
    alert("Quiz generation failed");

  }

};

const handleAnswer = (questionIndex, selectedOption) => {

  setSelectedAnswers({
    ...selectedAnswers,
    [questionIndex]: selectedOption
  });

};

const calculateScore = async () => {

  let correct = 0;

  quiz.forEach((q, index) => {

    if (selectedAnswers[index] === q.answer) {
      correct++;
    }

  });

  const accuracy = Math.round(
    (correct / quiz.length) * 100
  );

  setScore(correct);
  setShowResults(true);

  try {

    await axios.post(
      "http://localhost:5000/api/analytics",
      {
        email: "user@gmail.com",
        score: correct,
        accuracy: accuracy
      }
    );

    console.log("Analytics saved");

  } catch (error) {

    console.log(error);

  }

};

const speakPodcast = () => {

  const voices = window.speechSynthesis.getVoices();

  const hostVoice = voices[1];   // Google UK English Male
  const guestVoice = voices[2];  // Google UK English Female

  window.speechSynthesis.cancel();

  const lines = podcastScript.split("\n");

  lines.forEach((line) => {

    if (!line.trim()) return;

   const cleanLine = line
  .replace("Host:", "")
  .replace("Guest:", "")
  .trim();

   const speech = new SpeechSynthesisUtterance(cleanLine); 

    if (line.startsWith("Host:")) {

      speech.voice = hostVoice;
      speech.pitch = 1;
      speech.rate = 1;

    } else if (line.startsWith("Guest:")) {

      speech.voice = guestVoice;
      speech.pitch = 1.1;
      speech.rate = 1;

    }

    window.speechSynthesis.speak(speech);

  });

};

const pausePodcast = () => {
  window.speechSynthesis.pause();
};

const resumePodcast = () => {
  window.speechSynthesis.resume();
};

const stopPodcast = () => {
  window.speechSynthesis.cancel();
}; 

const getAnalytics = async () => {

  try {

    const response = await axios.get(
      "http://localhost:5000/api/getAnalytics"
    );

    setAnalytics(response.data);

  } catch (error) {

    console.log(error);
    alert("Failed to load analytics");

  }

};

const startListening = () => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.start();

  recognition.onresult = (event) => {

    const transcript =
      event.results[0][0].transcript;

    setQuestion(transcript);

  };

};

const askQuestion = async () => {

  try {

    const response = await axios.post(
      "http://localhost:5000/api/voiceqa",
      {
        question,
        content
      }
    );

    setAnswer(response.data.answer);

    const speech =
      new SpeechSynthesisUtterance(
        response.data.answer
      );

    window.speechSynthesis.speak(speech);

  } catch (error) {

    console.log(error);

    alert("Voice Q&A failed");

  }

};

  return (
    <div>

    <div className="header">

  <div className="logo-section">

    <img
      src={logo}
      alt="ListenIn AI Logo"
      className="logo"
    />

    <div>
      <h1>ListenIn AI</h1>
      <p>Upload Anything. Learn by Listening.</p>
    </div>

  </div>

</div>


<div className="navbar">

<button onClick={() => setActivePage("home")}>
  Home
</button>

<button onClick={() => setActivePage("summary")}>
  Summary
</button>

<button onClick={() => setActivePage("podcast")}>
  Podcast
</button>

<button onClick={() => setActivePage("quiz")}>
  Quiz & Analytics
</button>

<button onClick={() => setActivePage("voice")}>
  Voice Q&A
</button>

</div>

<div className="banner">
  <img
    src={bannerImage}
    alt="ListenIn AI Banner"
  />
</div>

<div className="container">
      <h2>Upload PDF</h2>

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

{activePage === "summary" && (

<>
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
</>

)}

{activePage ==="podcast" && (

<>
<h2>AI Podcast Script</h2>


      <button onClick={generatePodcast}>
      Generate Podcast
       </button>
      <br /><br />

<textarea
  rows="20"
  cols="100"
  value={podcastScript}
  readOnly
/>

<br /><br />

<button onClick={speakPodcast}>
  ▶ Play Podcast
</button>

<button onClick={pausePodcast}>
  ⏸ Pause
</button>

<button onClick={resumePodcast}>
  ▶ Resume
</button>

<button onClick={stopPodcast}>
  ⏹ Stop
</button>

</>
)}


{activePage ==="quiz" &&(
<>
<h2>AI Quiz</h2>

<button onClick={generateQuiz}>
  Generate Quiz
</button>

<br /><br />

{quiz.map((q, index) => (

  <div
    key={index}
    style={{
      border: "1px solid gray",
      padding: "10px",
      marginBottom: "20px"
    }}
  >

    <h3>
      {index + 1}. {q.question}
    </h3>

    {q.options.map((option, i) => (

      <button
        key={i}
        onClick={() =>
          handleAnswer(index, option)
        }

        style={{
          display: "block",
          margin: "5px",
          padding: "10px",

          backgroundColor:

  showResults

    ? selectedAnswers[index] === option

      ? option === q.answer
        ? "lightgreen"
        : "salmon"

      : ""

    : selectedAnswers[index] === option
      ? "lightblue"
      : ""
        }}
      >
        {option}
      </button>

    ))}

  </div>
))}

<br />

<button onClick={calculateScore}>
  Submit Quiz
</button>

{score !== null && (

  <div>

    <h2>
      Score: {score} / {quiz.length}
    </h2>

    <h3>
      Accuracy: {
        Math.round(
          (score / quiz.length) * 100
        )
      }%
    </h3>

  </div>

)}

<button onClick={getAnalytics}>
  Show Learning Analytics
</button>

{analytics && (

  <div
    style={{
      border: "1px solid black",
      padding: "15px",
      marginTop: "20px"
    }}
  >

    <h2>📊 Learning Analytics</h2>

    <p>
      Total Quizzes Taken:
      {analytics.totalQuizzes}
    </p>

    <p>
      Best Score:
      {analytics.bestScore}
    </p>

    <p>
      Average Accuracy:
      {analytics.averageAccuracy}%
    </p>

  </div>

)}
</>
)}


{activePage ==="voice" && (
<>
<h2>🎤 Voice Q&A</h2>

<button onClick={startListening}>
  Start Listening
</button>

<br /><br />

<input
  type="text"
  value={question}
  onChange={(e) =>
    setQuestion(e.target.value)
  }
  placeholder="Ask a question..."
  style={{
    width: "500px",
    padding: "10px"
  }}
/>

<br /><br />

<button onClick={askQuestion}>
  Ask AI
</button>

<br /><br />

<textarea
  rows="8"
  cols="80"
  value={answer}
  readOnly
/>
</>
)}

</div>
    </div>
  );
}

export default Upload;
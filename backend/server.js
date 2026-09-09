const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth");
const uploadRoute = require("./routes/upload");
const summarizeRoute = require("./routes/summarize");
const podcastRoute = require("./routes/podcast");
const quizRoute = require("./routes/quiz");
const analyticsRoute = require("./routes/analytics");
const getAnalyticsRoute = require("./routes/getAnalytics");
const voiceQARoute = require("./routes/voiceqa");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/summarize", summarizeRoute);
app.use("/api/podcast", podcastRoute);
app.use("/api/quiz", quizRoute);
app.use("/api/analytics", analyticsRoute);
app.use("/api/getAnalytics", getAnalyticsRoute);
app.use("/api/voiceqa", voiceQARoute);

app.get("/", (req, res) => {
  res.send("ListenIn AI Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});



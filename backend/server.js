const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth");
const uploadRoute = require("./routes/upload");
const summarizeRoute = require("./routes/summarize");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/summarize", summarizeRoute);


app.get("/", (req, res) => {
  res.send("ListenIn AI Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});



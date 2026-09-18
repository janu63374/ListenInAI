import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import History from "./pages/History";
import HistoryDetails from "./pages/HistoryDetails";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/upload"
          element={<Upload />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/history/:id"
          element={<HistoryDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}
export default App;
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";

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
      </Routes>
    </BrowserRouter>
  );
}
export default App;
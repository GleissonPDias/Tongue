import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Cadastro } from "../pages/Cadastro";
import { Login } from "../pages/Login";
import { UserPage } from "../pages/UserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/UserPage" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;

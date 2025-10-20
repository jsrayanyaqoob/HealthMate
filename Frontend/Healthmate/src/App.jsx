import { Routes, Route } from "react-router-dom";
import HomePage from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Dashboard from "../components/Dashboard";

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  );
}

export default App;

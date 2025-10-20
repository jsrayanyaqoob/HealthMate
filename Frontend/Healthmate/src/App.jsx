import { Routes, Route } from "react-router-dom";
import HomePage from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Dashboard from "../components/Dashboard";
import Report from "../components/Report";
import Feedback from "../components/Feedback";
import About from "../components/About";

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </>
  );
}

export default App;

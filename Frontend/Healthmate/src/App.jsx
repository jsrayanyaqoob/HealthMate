import React, { useState } from "react";
import HomePage from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Dashboard from "../components/Dashboard";
import Report from "../components/Feedback";

export default function App() {
  const [page, setPage] = useState("home");

  const handleNavigate = (target) => setPage(target);

  return (
    <div>
      {page === "home" && <HomePage onNavigate={handleNavigate} />}
      {page === "login" && <Login onNavigate={handleNavigate} />}
      {page === "signup" && <Signup onNavigate={handleNavigate} />}
      {page === "dashboard" && <Dashboard onNavigate={handleNavigate} />}
      {page === "report" && <Report onNavigate={handleNavigate} />}
    </div>
  );
}

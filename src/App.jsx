import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar"; 
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <SearchBar />
      </div>
    </Router>
  );
}

export default App;
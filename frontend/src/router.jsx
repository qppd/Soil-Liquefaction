import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Home from "./pages/Home";
import Administrator from "./pages/Administrator";
import Barangay from "./pages/Barangay";
import About from "./pages/About";

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/home" element={<Home />} />
        <Route path="/admin/administrator" element={<Administrator />} />
        <Route path="/admin/about" element={<About />} />
        <Route path="/map" element={<Map />} />
        <Route path="/admin/barangay" element={<Barangay />} />
      </Routes>
    </Router>
  );
}

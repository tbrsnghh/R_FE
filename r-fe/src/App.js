import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import Sign_in from "./pages/account/Sign_in";
import Sign_up from "./pages/account/Sign_up";
import Profile from "./pages/account/Profile";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Sign_in" element= {<Sign_in/>} />
          <Route path="/Sign_up" element= {<Sign_up/>} />
          <Route path="/Proflie" element= {<Profile/>} />
        </Routes>
      </Router>
    </div>
  );
}

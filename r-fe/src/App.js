import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./pages/home/Home";
import Sign_in from "./pages/account/Sign_in";
import Sign_up from "./pages/account/Sign_up";
import Profile from "./pages/account/Profile";

import { refreshAccessToken } from "./store/userSlice";
import DetailPost from "./pages/detailPost/DetailPost";
import CreatePost from "./pages/createPost/CreatePost";

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const expiresAt = localStorage.getItem("expiresAt"); 

    if (storedToken) {
      // Dispatch refresh action with the token
      //dispatch(refreshAccessToken(storedToken));
    } else if (window.location.pathname !== "/Sign_up") {
      navigate("/Sign_in");
    }
  }, [dispatch, navigate]);

  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        {/* User blocks */}
        <Route path="/Sign_in" element={<Sign_in />} />
        <Route path="/Sign_up" element={<Sign_up />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/post/:id" element={<DetailPost />} />
        <Route path="/createapost" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

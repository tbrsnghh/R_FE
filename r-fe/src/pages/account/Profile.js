import React, { useEffect, useState } from "react";
import LayoutDefault from "../../layout/default/LayoutDefault";
import ListPost from "../../components/listPost/ListPost";
import { useDispatch, useSelector } from "react-redux";
import { getComments, getPosts } from "../../store/postSlice";
import AllComments from "../../components/comments/AllComments";
import { logout, refreshAccessToken } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  

  const handleLogout = () => {
    dispatch(logout());
    navigate("/Sign_in");
  }
  
  const Profile = () => {
    return (
      <div className="w-full mt-5 h-screen">
        <h1>{userInfo}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  };
  return <LayoutDefault children={<Profile />} />;
}

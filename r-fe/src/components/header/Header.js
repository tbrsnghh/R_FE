import React, { useState } from "react";
import logo from "../../asset/img/1-1.png";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Header = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const profilePictureUrl = userInfo !== null ? `http://localhost:8080/api/posts/images/${userInfo.profilePictureUrl?.replace(/^uploads\\/, "")}` : '';
  
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State để quản lý trạng thái mở/đóng của menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();
  const goToAccount = () => {
    navigate('/Profile');
  };
  const goToCreatePost = () => {
    navigate('/createapost')
  }
  return (
    <nav className="w-full flex items-center p-2 bg-white border-b border-gray-200 shadow-md fixed left-0 top-0 z-10">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center mx-2 md:mx-4" onClick={()=> {navigate("/")}}>
          <img alt="logo" width={50} src={logo} />
        </div>
        <div className="flex items-center flex-grow mx-2 md:mx-4">
          <div className="relative w-full md:w-1/2">
            <input
              className="w-full py-1 pl-10 pr-4 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search"
              type="text"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button className="flex items-center space-x-2 " 
          onClick={goToCreatePost}
          >
            <i className="fas fa-plus text-xl text-gray-600 "></i>
            <span className="text-gray-600 text-lg ">Create</span>
          </button>
          <i className="fas fa-home text-xl text-gray-600"></i>
          <i className="fas fa-bell text-xl text-gray-600"></i>
          <button onClick={goToAccount}>
          <img
            alt="User avatar"
            className="h-8 w-8 rounded-full"
            height="40"
            src={profilePictureUrl}
            width="40"
            
          />
          </button>
          
        </div>
        <div className="md:hidden">
          <div className="flex items-center space-x-2">
            <i className="fas fa-bell text-xl text-gray-600"></i>
            <i className="fas fa-plus text-xl text-gray-600"></i>
            <button onClick={toggleMenu}>
              {" "}
              {/* Hamburger menu */}
              <i className="fas fa-bars text-xl text-gray-600"></i>
            </button>
          </div>

          {isMenuOpen && ( // Hiện các biểu tượng nếu menu đang mở
            <div className="absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
              <div className="py-2">
                <div className="flex items-center justify-start ml-8">
                  <img
                    alt="User avatar"
                    className="h-6 w-6 rounded-full"
                    height="40"
                    src="https://storage.googleapis.com/a1aa/image/4qOj1C72Pja8CxQifISEQfBp3c6xcxpecPNShxJAgr05wFXnA.jpg"
                    width="40"
                  />
                  <span className="block px-4 py-2">Profile</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

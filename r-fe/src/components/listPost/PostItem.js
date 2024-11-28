import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const PostItem = ({ post }) => {
  
  
  const [isExpanded, setIsExpanded] = useState(true);
  const images = post.imageUrls?.map((url) => url.replace(/^uploads\\/, ""));
  const profilePictureUrl = `http://localhost:8080/api/posts/images/${post.user?.profilePictureUrl.replace(/^uploads\\/, "")}`
  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };
  
  return (
    <div className="bg-white border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Post Details */}
      <div className="flex items-center mb-2">
        <img
          src={profilePictureUrl}
          className="w-12 h-12 rounded-full mr-3"
          alt="avatar"
        />
        <div>
          <p className="text-gray-700 font-bold">{post.userName}</p>
        </div>
      </div>
      {/* Post Name */}
      <Link to={`/post/${post.id}`}>
      <p className="text-2xl font-bold mb-3">{post.postName}</p>
      </Link>
     
      {/* Post Description */}
      <p
        className="text-gray-700 mb-3 transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isExpanded ? "none" : "4em", // Adjust this height as needed
          overflow: isExpanded ? "visible" : "hidden",
        }}
      >
        {isExpanded ? post.description : ""}
      </p>

      {/* Post Images */}
      <div className="w-full h-auto rounded-md">
        {images &&
          images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:8080/api/posts/images/${img}`}
              alt={`Post image ${index + 1}`}
              className="w-full h-auto rounded-md mb-2"
            />
          ))}
      </div>

      {/* Post Actions */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none">
            <i className="fa-solid fa-arrow-up text-blue-500"></i>
          </button>
          <p className="mx-2">{post.voteCount}</p>
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 focus:outline-none">
            <i className="fa-solid fa-arrow-down text-red-500"></i>
          </button>
        </div>
        <Link to={`/post/${post.id}`}>
          <div className="flex items-center">
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none">
              <i className="fas fa-comments text-gray-500"></i>
            </button>
          </div>
        </Link>
        <div className="flex items-center">
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 focus:outline-none">
            <i className="fas fa-share-alt text-green-500"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

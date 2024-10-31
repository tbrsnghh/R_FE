import React, { useState } from 'react';  
const img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzerDY3yl5rRnbAsOaMCGKGdK-Gv2BBfI20A&s';  

const PostItem = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const lines = post.content.split(/[\n\r]+/);

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-2">
        <img src={img} className="w-12 h-12 rounded-full mr-3" alt="avatar" />
        <div>
          <p className="text-gray-700 font-bold">Author Name</p>
          <p className="text-gray-500 text-sm">Author Email</p>
        </div>
      </div>

      <p
        className="text-gray-700 mb-3"
        style={{
          height: isExpanded ? "auto" : "6em",
          overflow: isExpanded ? "visible" : "hidden",
        }}
      >
        {isExpanded ? post.content : lines.slice(0, 1).join("\n\n")}

        <span
          className="text-blue-500 cursor-pointer italic"
          onClick={toggleExpand}
        >
          {isExpanded ? " Ẩn bớt" : " Xem thêm"}
        </span>
      </p>

      <img
        src={post.img}
        alt={post.title}
        className="w-full h-auto rounded-md mb-4"
      />
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none">
            <i className="fa-solid fa-arrow-up text-blue-500"></i>
          </button>
          <span className="ml-1">87</span>
        </div>
        <div className="flex items-center">
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 focus:outline-none">
            <i className="fa-solid fa-arrow-down text-red-500"></i>
          </button>
          <span className="ml-1">84</span>
        </div>
        <div className="flex items-center">
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none">
            <i className="fas fa-comments text-gray-500"></i>
          </button>
        </div>
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
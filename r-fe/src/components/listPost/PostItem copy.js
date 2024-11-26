import React, { useState } from "react";
import { useSelector } from "react-redux";

const PostItemPreview = ({ post, images }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const user = useSelector((state) => state.user);

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* User Avatar and Info */}
      <div className="flex items-center mb-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzerDY3yl5rRnbAsOaMCGKGdK-Gv2BBfI20A&s"
          className="w-12 h-12 rounded-full mr-3"
          alt="avatar"
        />
        <div>
          <p className="text-gray-700 font-bold">{user?.userInfo || 'User'}</p>
        </div>
      </div>
      
      {/* Post Title and Description */}
      <p className="text-2xl font-bold mb-3">{post.postName}</p>
      <div className="text-gray-700 whitespace-pre-line break-words">{post.description}</div>

      {/* Post Images */}
      <div className="mt-4">
        <div className="grid grid-cols-3 gap-2 mt-2">
          {images &&
            images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)} // Creates a temporary URL for the image
                alt={`Post image ${index + 1}`}
                className="w-full h-auto object-cover rounded-md"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostItemPreview;

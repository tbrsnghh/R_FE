import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../store/userSlice";

const PostItemPreview = React.memo(({ post = {}, images = [] }) => {
  
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  if(user === null) {
    dispatch(getUserInfo());
  };

  const username = user?.username || "User";
  const userImage = user !== null ? `http://localhost:8080/api/posts/images/${user.profilePictureUrl?.replace(/^uploads\\/, "")}` : '';

  // Memoize processed image URLs to avoid unnecessary computations
  const imageUrls = useMemo(
    () => images.map((image) => URL.createObjectURL(image)),
    [images]
  );

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* User Avatar and Info */}
      <div className="flex items-center mb-2">
        <img
          src={userImage}          className="w-12 h-12 rounded-full mr-3"
          alt={`${username}'s avatar`}
        />
        <div>
          <p className="text-gray-700 font-bold">{username}</p>
        </div>
      </div>

      {/* Post Title and Description */}
      <p className="text-2xl font-bold mb-3 break-words">{post.postName || "Untitled Post"}</p>
      <div className="text-gray-700 whitespace-pre-line break-words">
        {post.description || "No description provided."}
      </div>

      {/* Post Images */}
      <div className="mt-4">
        <div className="grid grid-cols-3 gap-2 mt-2">
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Post image ${index + 1}`}
              className="w-full h-auto object-cover rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default PostItemPreview;

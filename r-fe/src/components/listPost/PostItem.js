import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { votePost } from "../../store/voteSlice";
import { getLasestPosts } from "../../store/postSlice";

const PostItem = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const images = post.imageUrls?.map((url) => url.replace(/^uploads\\/, ""));
  const profilePictureUrl = post.user?.profilePictureUrl
    ? `http://localhost:8080/api/posts/images/${post.user?.profilePictureUrl?.replace(
        /^uploads\\/,
        ""
      )}`
    : "";

  const dispatch = useDispatch();

  const handleVote = (voteType) => {
    dispatch(votePost({ voteType, postId: post.id })).then(() => {
      dispatch(getLasestPosts());
    });
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
          <p className="text-gray-700 font-bold">
            {post.user ? post.user.username : "Anonymous"}
          </p>
          <p className="text-gray-600 text-sm">{post.duration}</p>
          {/* Subreddit Tag */}
          {post.subredditName && (
            <p className="inline-block bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-medium mb-2">
              {post.subredditName}
            </p>
          )}
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
          maxHeight: isExpanded ? "none" : "4em",
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
              className="w-full max-w-sm mx-auto h-auto rounded-md mb-2 object-cover"
              style={{ maxHeight: "200px" }}
            />
          ))}
      </div>

      {/* Post Actions */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {/* Upvote Button */}
          <button
            onClick={() => handleVote("UPVOTE")}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none"
          >
            <i className="fa-solid fa-arrow-up text-blue-500"></i>
          </button>
          <p className="mx-2">{post.voteCount}</p>

          {/* Downvote Button */}
          <button
            onClick={() => handleVote("DOWNVOTE")}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 focus:outline-none"
          >
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

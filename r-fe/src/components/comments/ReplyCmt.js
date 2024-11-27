import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment, getSubCmts } from "../../store/commentSlice";

const my_avatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPK2d9AVZ6B9urLI0IuWXWhhF-Rsuk1TEHNSM468o8LAbfkCASwtMfEpkz9J01f4o2Du0&usqp=CAU";

function ReplyCmt({ user, parent_comment, onCancelReply, handleViewReplies }) {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState({
    text: "",
    postId: parent_comment.postId,
    parentCommentId: parent_comment.id,
  });

  const handlePostReply = () => {
    dispatch(createComment(newComment))
      .unwrap()
      .then(() => {
        // Handle posting the reply here
        console.log("Reply posted:", newComment);
        // Clear reply text after posting
        setNewComment({ ...newComment, text: "" });
        // Optionally close the reply input
        onCancelReply();
        handleViewReplies();
      });
  };

  return (
    <div className="flex flex-col mt-4 ml-10 py-2 border-b border-gray-200">
      <div className="flex items-start">
        <img
          src={my_avatar}
          alt="avatar"
          className="w-8 h-8 rounded-full mr-3"
        />
        <div>
          <p className="font-bold text-sm">{user.name}</p>
        </div>
      </div>
      <p className="text-sm pl-10">
        Replying to <span className="font-bold">{parent_comment.userName}</span>
      </p>
      <div className="flex items-center space-x-2 text-xs ml-10 py-2">
        <input
          type="text"
          className="w-full px-2 py-1 border border-gray-300 rounded-md"
          placeholder="Enter your reply here..."
          value={newComment.text}
          onChange={(e) =>
            setNewComment({ ...newComment, text: e.target.value })
          }
        />
        <button
          className="flex items-center justify-center h-6 px-2 rounded-full bg-red-200 hover:bg-red-400 focus:outline-none"
          onClick={onCancelReply}
        >
          <p className="mx-1">Cancel</p>
        </button>
        <button
          className="flex items-center justify-center h-6 px-2 rounded-full bg-blue-200 hover:bg-blue-400 focus:outline-none"
          onClick={handlePostReply}
        >
          <p className="mx-1">Post</p>
        </button>
      </div>
    </div>
  );
}

export default ReplyCmt;

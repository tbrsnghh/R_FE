import React, { useState } from "react";
import { createComment, getCmtsLv1, getCommentsByPostId } from "../../store/commentSlice";
import { useDispatch } from "react-redux";

const my_avatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPK2d9AVZ6B9urLI0IuWXWhhF-Rsuk1TEHNSM468o8LAbfkCASwtMfEpkz9J01f4o2Du0&usqp=CAU";

function CreateCmt({ postId }) {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState({
    text: "",
    postId: postId,
    parentCommentId: "",
  });

  const sendCmt = () => {
    if (newComment.text.trim() === "") {
      console.warn("Comment cannot be empty.");
      return;
    }
    console.log("newComment", newComment);

    // Dispatch the comment to Redux store
    dispatch(createComment(newComment))
      .unwrap()
      .then(() => {
        dispatch(getCmtsLv1(postId));
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
      });

    setNewComment({ ...newComment, text: "" });
  };

  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className="flex items-center space-x-2 py-2 mb-10">
      <input
        type="text"
        className="w-full px-2 py-1 border border-gray-300 rounded-md"
        placeholder="Enter your comment here..."
        value={newComment.text} // Corrected here
        onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
      />

      {/* {isTyping && ( */}
        <div className="flex">
          <button
            className="flex items-center justify-center h-6 px-2 rounded-full bg-blue-200 hover:bg-blue-400 focus:outline-none"
            onClick={sendCmt} // Corrected here
          >
            <p className="mx-1">Post</p>
          </button>
        </div>
      {/* )} */}
    </div>
  );
}

export default CreateCmt;

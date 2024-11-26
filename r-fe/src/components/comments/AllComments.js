import React, { useEffect } from "react";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
export default function AllComments({ comments }) {
  return (
    <div className="w-full p-4 rounded-lg space-y-4 shadow-md hover:shadow-lg transition-shadow">
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id_comment} comment={comment} />
        ))}
    </div>
  );
}


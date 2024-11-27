import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import CreateCmt from "./CreateCmt";
import { createComment } from "../../store/commentSlice";
export default function AllComments({ comments , postId}) {
  return (
    <div className="w-full p-4 rounded-lg space-y-4 shadow-md hover:shadow-lg transition-shadow">
      <CreateCmt postId={postId}/>
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id_comment} comment={comment} />
        ))}
    </div>
  );
}


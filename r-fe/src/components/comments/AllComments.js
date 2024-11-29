import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import CreateCmt from "./CreateCmt";
import { createComment } from "../../store/commentSlice";
export default function AllComments({ comments , postId}) {
  return (
    <div className="w-full h-screen mx-1 space-y-4 bg-white
    overflow-auto"
    >
      <CreateCmt postId={postId}/>
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id_comment} comment={comment} />
        ))}
    </div>
  );
}


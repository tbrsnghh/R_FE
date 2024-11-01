import React from "react";
import Comment from "./Comment";

export default function AllComments({ focusPost, comments }) {
  return (
    <div className="w-full p-4 rounded-lg space-y-4 shadow-md hover:shadow-lg transition-shadow">
      AllComments {focusPost}
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id_comment} comment={comment} />
        ))}
    </div>
  );
}


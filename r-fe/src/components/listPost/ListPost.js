import React, { useState } from "react";
import PostItem from "../listPost/PostItem";

export default function ListPost({ posts, focusPost, setFocusPost }) {
  return (
    <div className="space-y-4">
      {posts &&
        posts.map((post) => (
          <div key={post.id} onClick={() => setFocusPost(post.id)}>
            <PostItem post={post} />
          </div>
        ))}
    </div>
  );
}

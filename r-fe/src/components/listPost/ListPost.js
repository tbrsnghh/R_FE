import React, { useEffect } from "react";
import PostItem from "../listPost/PostItem";
import { useDispatch, useSelector } from "react-redux";
import { getPostImageName } from "../../store/postSlice";
import { Link } from "react-router-dom";

export default function ListPost({ posts }) {
  return (
    <div className="space-y-4">
      {posts.length > 0 &&
        posts.map((post) => (
          // <Link to={`/post/${post.id}`}>
            <div key={post.id}>
              <PostItem post={post} />
            </div>
          // </Link>
        ))}
    </div>
  );
}

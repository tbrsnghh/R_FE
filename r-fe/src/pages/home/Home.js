import React, { useEffect, useState } from "react";
import LayoutDefault from "../../layout/default/LayoutDefault";
import ListPost from "../../components/listPost/ListPost";
import { useDispatch, useSelector } from "react-redux";
import { getComments, getLasestPosts, getPosts } from "../../store/postSlice";
import AllComments from "../../components/comments/AllComments";
import { refreshAccessToken } from "../../store/userSlice";
export default function Home() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getLasestPosts());
  }, []);

  return (
    <LayoutDefault>
      <div className="w-full mt-5 flex h-screen">
        {status === "loading" ? (
          <div>Loading...</div>
        ) : (
          <>
            <div
              className="w-1/2 mx-auto overflow-auto"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <ListPost posts={posts} />
            </div>
          </>
        )}
      </div>
    </LayoutDefault>
  );
}

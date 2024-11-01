import React, { useEffect, useState } from "react";
import LayoutDefault from "../../layout/default/LayoutDefault";
import ListPost from "../../components/listPost/ListPost";
import { useDispatch, useSelector } from "react-redux";
import { getComments, getPosts } from "../../store/postSlice";
import AllComments from "../../components/comments/AllComments";
export default function Home() {
  const dispatch = useDispatch();
  const { posts, comments, status } = useSelector((state) => state.posts);
  const [focusPost, setFocusPost] = useState(0);
  useEffect(() => {
    dispatch(getPosts());
    console.log("posts", posts);
  }, []);
  useEffect(() => {
    dispatch(getComments());
    console.log("focusPost", focusPost);
  }, [focusPost]);
  const Home = () => {
    return (
      <div className="w-full mt-5 flex h-screen">
        {status === "loading" ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="w-1/2 overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              <ListPost
                posts={posts}
                focusPost={focusPost}
                setFocusPost={setFocusPost}
              />
            </div>
            {focusPost !== 0 ? (
              <div className="w-1/2 overflow-y-auto mt-12"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <AllComments focusPost={focusPost} comments={comments} />
              </div>
            ) : null }
          </>
        )}
      </div>
    );
  };
  return <LayoutDefault children={<Home />} />;
}

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import LayoutDefault from "../../layout/default/LayoutDefault";
import { useDispatch, useSelector } from "react-redux";
import ListPost from "../../components/listPost/ListPost";
import PostItem from "../../components/listPost/PostItem";
import AllComments from "../../components/comments/AllComments";
import { getCommentsByPostId } from "../../store/commentSlice";

export default function DetailPost() {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
    const { posts, status } = useSelector((state) => state.posts);
    const { comments } = useSelector((state) => state.comments);
    const postId = useParams().id;  
    const post = posts && posts.find(post => post.id == postId);
    useEffect(() => {
      dispatch(getCommentsByPostId(postId));
    }, [postId]);
  return (
    <LayoutDefault>
      <div className="w-full mt-5 flex h-screen">
        {status === "loading" ? (
          <div>Loading...</div>
        ) : (
          <>
            <div
              className="w-1/3 overflow-y-auto"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <button className="text-gray-500 hover:text-gray-700
              mb-4 transition-colors duration-150"
              onClick={() => window.history.back()}
              >
                <i className="fas fa-arrow-left"></i></button>
              <PostItem post={post} />
            </div>
            <div className="w-1/2 overflow-y-auto">
              <AllComments comments={comments} />
            </div>
          </>
        )}
      </div>
    </LayoutDefault>
  )
}

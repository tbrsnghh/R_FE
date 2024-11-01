import React from "react";  
import PostItem from "../listPost/PostItem";  

export default function ListPost({ posts, focusPost, setFocusPost }) {  
  // Lọc danh sách bài viết dựa trên giá trị focusPost  
  const displayedPosts = focusPost === 0 ? posts : posts.filter(post => post.id === focusPost);  

  return (  
    <div className="space-y-4">  
      {focusPost === 0 ? null : (
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none" onClick={() => setFocusPost(0)}>
          <i className="fas fa-arrow-left text-blue-500"></i>
        </button>
      )}
      {displayedPosts &&  
        displayedPosts.map((post) => (  
          <div key={post.id} onClick={() => setFocusPost(post.id)}>  
            <PostItem post={post} />  
          </div>  
        ))}  
    </div>  
  );  
}
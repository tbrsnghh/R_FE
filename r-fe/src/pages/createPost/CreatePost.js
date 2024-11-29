import React, { useState } from "react";
import LayoutDefault from "../../layout/default/LayoutDefault";
import CreateForm from "../../components/createPost/CreateForm";
import PostItem from "../../components/listPost/PostItem";
import { useDispatch } from "react-redux";
import { createPost, uploadsImage } from "../../store/postSlice";
import PostItemPreview from "../../components/listPost/PostItem copy";

export default function CreatePost() {
  const dispatch = useDispatch();
  const [post, setPost] = useState({
    postName: "",
    description: "",
    subredditName: "",
  });
  const [images, setImages] = useState([]);

  // const handleSave = async () => {
  //   try {
  //     // Step 1: Dispatch createPost and wait for its response
  //     const createPostResult = await dispatch(createPost(post)).unwrap();
  //     const postId = createPostResult.data.id;

  //     // Step 2: Dispatch uploadsImage with the obtained postId if images are selected
  //     if (images.length > 0) {
  //       await Promise.all(
  //         images.map((image) =>
  //           dispatch(uploadsImage({ image, id: postId }))
  //         )
  //       );
  //     }

  //     console.log("Post created and images uploaded successfully.");
  //   } catch (error) {
  //     console.error("Error creating post or uploading images:", error);
  //   }
  // };
  const handleSave = async () => {  
    try {  
        // Step 1: Dispatch createPost and wait for its response  
        const createPostResult = await dispatch(createPost(post)).unwrap();  
        const postId = createPostResult.data.id;  

        // Step 2: Dispatch uploadsImage with the obtained postId  
        if (images.length > 0) {  
            await dispatch(uploadsImage({ images, id: postId })).unwrap();  
        }  

        console.log("Post created and images uploaded successfully.");  
    } catch (error) {  
        console.error("Error creating post or uploading images:", error);  
    }  
};
  return (
    <LayoutDefault>
      <div className="flex">
        <div className="mt-5 w-1/2">
          <CreateForm
            post={post}
            setPost={setPost}
            handleSave={handleSave}
            images={images}
            setImages={setImages}
          />
        </div>
        <div className="mt-5 ml-10 w-1/3">
          <PostItemPreview post={post} images={images}/>
        </div>
      </div>
    </LayoutDefault>
  );
}

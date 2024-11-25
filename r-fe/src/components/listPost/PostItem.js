import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPostImageName } from "../../store/postSlice";

// const PostItem = ({ post }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const dispatch = useDispatch();
//   const imgs = useSelector((state) => state.posts.postImageNames);

//   if (post.id) {
//       dispatch(getPostImageName(post.id));
//     }
  

//   const toggleExpand = () => {
//     setIsExpanded((prevState) => !prevState);
//   };

//   const lines = post.description.split(/[\n\r]+/);

//   return (
//     <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//       <div className="flex items-center mb-2">
//         <img
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzerDY3yl5rRnbAsOaMCGKGdK-Gv2BBfI20A&s"
//           className="w-12 h-12 rounded-full mr-3"
//           alt="avatar"
//         />
//         <div>
//           <p className="text-gray-700 font-bold">{post.userName}</p>
//           <p className="text-gray-500 text-sm">Author Email</p>
//         </div>
//       </div>

//       <p
//         className="text-gray-700 mb-3"
//         style={{
//           height: isExpanded ? "auto" : "6em",
//           overflow: isExpanded ? "visible" : "hidden",
//         }}
//       >
//         {isExpanded ? post.description : lines.slice(0, 1).join("\n\n")}
//         <span
//           className="text-blue-500 cursor-pointer italic"
//           onClick={toggleExpand}
//         >
//           {isExpanded ? " Ẩn bớt" : " Xem thêm"}
//         </span>
//       </p>

//       <div className="w-full h-auto rounded-md mb-4">
//         {/* {imgs &&
//           imgs.map((img, index) => (
//             <img
//               key={index}
//               // src={`http://localhost:8080/api/posts/images/${img}`}
//               alt={`Post image ${index + 1}`}
//               className="w-full h-auto rounded-md mb-2"
//             />
//           ))} */}
//           {/* <img
//               key={index}
//               src={`http://localhost:8080/api/posts/images/${imgs[0]}`}
//               alt={`Post image `}
//               className="w-full h-auto rounded-md mb-2"
//             /> */}
//       </div>

//       <div className="flex items-center space-x-4">
//         <div className="flex items-center">
//           <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none">
//             <i className="fa-solid fa-arrow-up text-blue-500"></i>
//           </button>
//           <span className="ml-1">87</span>
//         </div>
//         <div className="flex items-center">
//           <button className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 focus:outline-none">
//             <i className="fa-solid fa-arrow-down text-red-500"></i>
//           </button>
//           <span className="ml-1">84</span>
//         </div>
//         <div className="flex items-center">
//           <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none">
//             <i className="fas fa-comments text-gray-500"></i>
//           </button>
//         </div>
//         <div className="flex items-center">
//           <button className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 focus:outline-none">
//             <i className="fas fa-share-alt text-green-500"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
const PostItem = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  console.log('Post', post);
  const images = post.imageUrls.map(url => url.replace(/^uploads\\/, ""));
  console.log('Images', images);
  const toggleExpand = () => {
      setIsExpanded((prevState) => !prevState);
  };

  const lines = post.description.split(/[\n\r]+/);

  return (
      <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          {/* Post Details */}
          <div className="flex items-center mb-2">
              <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzerDY3yl5rRnbAsOaMCGKGdK-Gv2BBfI20A&s"
                  className="w-12 h-12 rounded-full mr-3"
                  alt="avatar"
              />
              <div>
                  <p className="text-gray-700 font-bold">{post.userName}</p>
                  <p className="text-gray-500 text-sm">Author Email</p>
              </div>
          </div>

          {/* Post Description */}
          <p
              className="text-gray-700 mb-3"
              style={{
                  height: isExpanded ? "auto" : "6em",
                  overflow: isExpanded ? "visible" : "hidden",
              }}
          >
              {isExpanded ? post.description : lines.slice(0, 1).join("\n\n")}
              <span
                  className="text-blue-500 cursor-pointer italic"
                  onClick={toggleExpand}
              >
                  {isExpanded ? " Ẩn bớt" : " Xem thêm"}
              </span>
          </p>

          {/* Post Images */}
          <div className="w-full h-auto rounded-md mb-4">
              {images &&
                  images.map((img, index) => (
                      <img
                          key={index}
                          src={`http://localhost:8080/api/posts/images/${img}`}
                          alt={`Post image ${index + 1}`}
                          className="w-full h-auto rounded-md mb-2"
                      />
                  ))}
                  {/* <img
                          
                        //   src={`http://localhost:8080/api/posts/images/${img}`}
                          src={`http://localhost:8080/api/posts/images/1732229670674_cat2%20-%20Copy.jpg`}
                          alt=""
                          className="w-full h-auto rounded-md mb-2"
                      /> */}
          </div>

          {/* Post Actions */}
          <div className="flex items-center space-x-4">
              <div className="flex items-center">
                  <button className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none">
                      <i className="fa-solid fa-arrow-up text-blue-500"></i>
                  </button>
                  <span className="ml-1">87</span>
              </div>
              <div className="flex items-center">
                  <button className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 focus:outline-none">
                      <i className="fa-solid fa-arrow-down text-red-500"></i>
                  </button>
                  <span className="ml-1">84</span>
              </div>
              <div className="flex items-center">
                  <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none">
                      <i className="fas fa-comments text-gray-500"></i>
                  </button>
              </div>
              <div className="flex items-center">
                  <button className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 focus:outline-none">
                      <i className="fas fa-share-alt text-green-500"></i>
                  </button>
              </div>
          </div>
      </div>
  );
};

export default PostItem;

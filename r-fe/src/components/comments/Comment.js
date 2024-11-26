import React, { useState } from 'react';

const avatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzerDY3yl5rRnbAsOaMCGKGdK-Gv2BBfI20A&s";
const my_avatar = 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPK2d9AVZ6B9urLI0IuWXWhhF-Rsuk1TEHNSM468o8LAbfkCASwtMfEpkz9J01f4o2Du0&usqp=CAU"

function Comment({ comment }) {
  console.log('comment', comment);
  
    const user = {
        name: "My name"
    }
    const convertTimestampToLocalTime = (timestamp) => {  
      // Chuyển đổi Unix timestamp sang đối tượng Date  
      const date = new Date(timestamp * 1000); // Nhân với 1000 để chuyển đổi giây thành mili giây  
  
      // Lấy giờ UTC+7  
      const utcOffset = 7 * 60; // UTC+7 tính bằng phút  
      const localTime = new Date(date.getTime() + utcOffset * 60 * 1000); // Cộng thêm 7 giờ  
  
      // Định dạng thời gian thành chuỗi dễ đọc  
      const options = {  
          year: 'numeric',  
          month: '2-digit',  
          day: '2-digit',  
          hour: '2-digit',  
          minute: '2-digit',  
          second: '2-digit',  
          hour12: false, // Định dạng 24 giờ  
          timeZone: 'Asia/Bangkok' // Thiết lập múi giờ  
      };  
  
      return localTime.toLocaleString('vi-VN', options);  
  }; 
    const [mylike, setMyLike] = useState(null);
    const likeCountStart = 0;
    const [likeCount, setLikeCount] = useState(likeCountStart);
    const handleMyLike = (op) => {
        if (mylike === null) {
            setMyLike(op);
        }
        if ((mylike === 'like' && op === 'like') || (mylike === 'dislike' && op === 'dislike')) {
            setMyLike(null);
            setLikeCount(likeCountStart);
        } else if(op === 'like') {
            setMyLike('like');
            setLikeCount(likeCountStart + 1);
        } else{
            setMyLike('dislike');
            setLikeCount(likeCountStart - 1);
        }
    };
    const [isReplying, setIsReplying] = useState(false);
  return (
    <div className="flex flex-col mt-4 ml-2 py-2 border-b border-gray-200">
      <div className="flex items-start">
        <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full mr-3" />
        <div>
          <p className="font-bold text-sm">{comment.userName}</p>
          <p className="text-gray-500 text-xs">{convertTimestampToLocalTime(comment.createdDate)}</p>
        </div>
      </div>
      <p className="text-sm pl-10">{comment.text}</p>
      <div className="flex items-center space-x-2 text-xs ml-10 py-2">
        <div className={`flex items-center justify-center rounded-full ${mylike === 'like' ? 'bg-blue-100 hover:bg-blue-200' : mylike === 'dislike' ? 'bg-red-100 hover:bg-red-200' : ''}`}>
          <button onClick={() => handleMyLike('like')} className={`flex items-center justify-center w-6 h-6 rounded-full  hover:bg-blue-200  focus:outline-none ${mylike === 'like' ? 'text-blue-500' : ''}`} >
            <i className="fa-solid fa-arrow-up "></i>
          </button>
          <span className="mx-1">{likeCount}</span>
          <button onClick={() => handleMyLike('dislike')} className={`flex items-center justify-center w-6 h-6 rounded-full  hover:bg-red-200 focus:outline-none ${mylike === 'dislike' ? 'text-red-500' : ''}`} >
            <i className="fa-solid fa-arrow-down "></i>
          </button>
        </div>
        <div className="flex items-center">
          <button className="flex items-center justify-center 
          h-6 px-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
            onClick={() => setIsReplying(!isReplying)}>
            <i className="fas fa-reply text-gray-500"></i>
            <p className="mx-1">Reply</p>
          </button>
        </div>
        <div className="flex items-center">
          <button className="flex items-center justify-center h-6 px-2 rounded-full bg-green-100 hover:bg-green-200 focus:outline-none">
            <i className="fas fa-share text-green-500"></i>
            <p className="mx-1">Share</p>
          </button>
        </div>
      </div>
        {isReplying ? (
            <div className="flex flex-col mt-4 ml-10 py-2 border-b border-gray-200">
                <div className="flex items-start">
                    <img src={my_avatar} alt="avatar" className="w-8 h-8 rounded-full mr-3" />
                    <div>
                        <p className="font-bold text-sm">{user.name}</p>
                        
                    </div>
                </div>
                <p className="text-sm pl-10">Replying to <span className="font-bold">{comment.id_user}</span></p>
                <div className="flex items-center space-x-2 text-xs ml-10 py-2">
                    
                    <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded-md" placeholder="Enter your reply here..."></input>
                    <button className="flex items-center justify-center h-6 px-2 rounded-full bg-red-200 hover:bg-red-400 focus:outline-none" onClick={() => setIsReplying(false)}>
                        
                        <p className="mx-1">Cancel</p>
                    </button>
                    <button className="flex items-center justify-center h-6 px-2 rounded-full bg-blue-200 hover:bg-blue-400 focus:outline-none">        
                        <p className="mx-1">Post</p>
                    </button>
                </div>
            </div>
        ) : (
            ""
        )}
    </div>
  );
}

export default Comment;

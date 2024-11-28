import React from "react"; 

function SubComment({ comment }) {
  const user = comment.user  
  const other_avatar = user !== null ? `http://localhost:8080/api/posts/images/${user.profilePictureUrl?.replace(/^uploads\\/, "")}` : "";

    const convertTimestampToLocalTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const utcOffset = 0;
        const localTime = new Date(date.getTime() + utcOffset * 60 * 1000);
    
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Asia/Bangkok',
        };
    
        return localTime.toLocaleString('vi-VN', options);
      };
  return (
    <div className="flex mt-2 ml-10">
      <img src={other_avatar} alt="avatar" className="w-6 h-6 rounded-full mr-2" />
      <div>
        <p className="font-bold text-sm">{comment.userName}</p>
        <p className="text-xs text-gray-500">{convertTimestampToLocalTime(comment.createdDate)}</p>
        <p className="text-sm">{comment.text}</p>
      </div>
    </div>
  );
}

export default SubComment;

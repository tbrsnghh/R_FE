import React, { useState } from 'react';
import CreateCmt from './ReplyCmt';
import ReplyCmt from './ReplyCmt';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCmts } from '../../store/commentSlice';
import SubComment from './SubComment';

function Comment({ comment }) {
  const user = comment.user  
  const other_avatar = user !== null ? `http://localhost:8080/api/posts/images/${user.profilePictureUrl?.replace(/^uploads\\/, "")}` : "";

  const convertTimestampToLocalTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const utcOffset = 0 * 60;
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

  const [mylike, setMyLike] = useState(null);
  const likeCountStart = 0;
  const [likeCount, setLikeCount] = useState(likeCountStart);
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const dispatch = useDispatch();
  const subComments = useSelector((state) => state.comments).subComments.filter((cmt) => cmt.parentCommentId === comment.id);
  const handleViewReplies = () => {
    dispatch(getSubCmts(comment.id)).unwrap().then(() => {
      console.log('subComments', subComments);
    });
    setShowReplies(!showReplies);
  };
  const handleMyLike = (op) => {
    if (mylike === null) {
      setMyLike(op);
    }
    if ((mylike === 'like' && op === 'like') || (mylike === 'dislike' && op === 'dislike')) {
      setMyLike(null);
      setLikeCount(likeCountStart);
    } else if (op === 'like') {
      setMyLike('like');
      setLikeCount(likeCountStart + 1);
    } else {
      setMyLike('dislike');
      setLikeCount(likeCountStart - 1);
    }
  };
  const onCancelReply = () => {
    setIsReplying(false);
    setShowReplies(true)
    handleViewReplies();
    
  };
  return (
    <div className="flex flex-col p-2 m-1 rounded-lg 
    hover:shadow-md transition-shadow
    hover:bg-stone-50">

      <div className="flex items-start">
        <img src={other_avatar} alt="avatar" className="w-8 h-8 rounded-full mr-3" />
        <div>
          <p className="font-bold text-sm">{comment.user.username}</p>
          <p className="text-gray-500 text-xs">
            {convertTimestampToLocalTime(comment.createdDate)}
          </p>
        </div>
      </div>

      <p className="text-sm pl-10">{comment.text}</p>

      <div className="flex items-center text-xs ml-10 py-2">

        <div className="flex items-center space-x-1">
          <button
            className="flex items-center justify-center h-6 rounded-full bg-blue-100 hover:bg-blue-300 focus:outline-none"
            onClick={() => setIsReplying(!isReplying)}
          >
            {/* <i className="fas fa-reply text-gray-500"></i> */}
            <p className="mx-1">Reply</p>
          </button>

          <button
            className="flex items-center justify-center h-6 rounded-full bg-blue-100 hover:bg-blue-300 focus:outline-none"
            onClick={handleViewReplies}>
            <p className="mx-1">View replies</p>
          </button>
        </div>
      </div>

      {isReplying && (
        <ReplyCmt
          user={user}
          parent_comment={comment}
          onCancelReply={() => setIsReplying(false)}
          handleViewReplies={handleViewReplies}
        />
      )}
      {showReplies && subComments.length > 0 &&
        subComments.filter((subComment) => subComment.parentCommentId === comment.id).map((subComment) => (
          <SubComment key={subComment.id} comment={subComment} />
        ))}
    </div>
  );
}

export default Comment;

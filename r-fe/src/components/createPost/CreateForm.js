import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubreddit } from '../../store/voteSlice';

const CreateForm = ({ post, setPost, handleSave, images, setImages }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('Text'); // State to manage which tab is active
  const [error, setError] = useState(''); // State to manage error messages

  // Fetch subreddits from Redux store
  useEffect(() => {
    dispatch(getSubreddit());
  }, [dispatch]);

  const subreddits = useSelector((state) => state.vote.subreddit);

  // Handle image upload
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles); // Set selected files to images state
  };

  // Handle form submission
  const handleFormSubmit = () => {
    if (!post.subreddit) {
      setError('Xin chọn danh mục bài viết.');
      setTimeout(() => setError(''), 1000);
      return;
    }
    setError(''); // Clear error if validation passes
    handleSave({ ...post, images });
  };

  return (
    <div className="w-full bg-white p-6 rounded-md shadow-md">
      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          type="text"
          placeholder="Title"
          maxLength="300"
          value={post.postName}
          onChange={(e) => setPost({ ...post, postName: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Subreddit Selector */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Select Subreddit</label>
        <select
          value={post.subreddit || ''}
          onChange={(e) => setPost({ ...post, subredditName: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="" disabled>
            Chọn danh mục bài viết
          </option>
          {subreddits && subreddits.map((subreddit) => (
            <option key={subreddit.id} value={subreddit.name}>
              {subreddit.name}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        <button
          onClick={() => setTab('Text')}
          className={`px-4 py-2 text-gray-600 border-b-2 ${
            tab === 'Text' ? 'border-blue-500 text-blue-500' : 'border-transparent'
          } focus:outline-none`}
        >
          Text
        </button>
        <button
          onClick={() => setTab('Images')}
          className={`px-4 py-2 text-gray-600 border-b-2 ${
            tab === 'Images' ? 'border-blue-500 text-blue-500' : 'border-transparent'
          } focus:outline-none`}
        >
          Images
        </button>
      </div>

      {/* Conditional Rendering for Body or Image Upload */}
      <div className="mb-4">
        {tab === 'Text' ? (
          <>
            <label className="block text-gray-700 text-sm font-bold mb-2">Body</label>
            <textarea
              placeholder="Body"
              value={post.description}
              onChange={(e) => setPost({ ...post, description: e.target.value })}
              className="w-full h-72 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>
          </>
        ) : (
          <>
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {images &&
                images.map((image, index) => (
                  <div key={index} className="w-32 h-32 relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Selected ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>

      {/* Save Draft and Post Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md cursor-not-allowed"
          disabled
        >
          Save Draft
        </button>
        <button
          className="px-4 py-2 bg-red-200 text-black-500 rounded-md 
          hover:bg-red-300 hover:text-black focus:outline-none"
          onClick={handleFormSubmit}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreateForm;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/userSlice'; // Import async thunk từ userSlice
import { useNavigate } from 'react-router-dom';

function Sign_in() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy trạng thái từ Redux store
  const { loading, error, userInfo } = useSelector((state) => state.user);

  // Hàm để chuyển đổi trạng thái hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Hàm xử lý đăng nhập
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        console.log('userInfo', userInfo);
        navigate('/'); // Chuyển hướng sau khi đăng nhập thành công
        
        
      })
      .catch(() => {
        console.error("Login failed");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign In</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6 relative">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              onCopy={(e) => e.preventDefault()}   // Chặn sao chép
              onPaste={(e) => e.preventDefault()}   // Chặn dán
            />
            {/* Icon mắt để bật tắt mật khẩu */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2/3 transform -translate-y-1/2 flex items-center text-gray-500 focus:outline-none"
            >
              <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <p className="text-gray-500 text-center mt-4">
          Don't have an account? 
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/Sign_up")}> Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default Sign_in;

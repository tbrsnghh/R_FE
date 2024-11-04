import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Hàm để chuyển đổi trạng thái hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign In</h2>
        
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
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
          >
            Sign In
          </button>
        </form>

        <p className="text-gray-500 text-center mt-4">
          Don't have an account? <a href="/Sign_up" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;

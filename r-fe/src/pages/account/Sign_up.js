import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SignUp({ onSignUp }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [password, setPassword] = useState('');
  const [redirectPassword, setRedirectPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== redirectPassword) {
      alert("Passwords do not match!");
      return;
    }
    onSignUp({ username, email, studentCode, password });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="studentCode">
              Student Code
            </label>
            <input
              type="text"
              id="studentCode"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
            </button>
          </div>

          <div className="mb-6 relative">
            <label className="block text-gray-600 font-semibold mb-2" htmlFor="redirectPassword">
              Confirm Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="redirectPassword"
              value={redirectPassword}
              onChange={(e) => setRedirectPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

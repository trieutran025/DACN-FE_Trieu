import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from "../services/authService"; // Đảm bảo import đúng đường dẫn

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Xóa lỗi cũ trước khi gửi yêu cầu
    try {
      const response = await authService.login(username, password);
      if (response && response.access_token) {
        sessionStorage.setItem("token", response.access_token);
        console.log(response)
        const userRole =
          response.roles && Array.isArray(response.roles)
            ? response.roles[0]
            : null;
        if (userRole) {
          sessionStorage.setItem("role", userRole);
          onLogin(userRole); // Cập nhật role khi login thành công
          switch (userRole) {
            case "ROLE_ADMIN":
              navigate("/admin");
              break;
            case "ROLE_STUDENT":
              navigate("/student");
              break;
            case "ROLE_MANAGER":
              navigate("/manager-dashboard");
              break;
            default:
              navigate("/");
          }
        } else {
          setError("Vai trò người dùng không xác định.");
        }
      } else {
        // Nếu không có token, kiểm tra phản hồi có message hay không
        setError(response.message || "Đăng nhập thất bại. Không nhận được token.");
      }
    } catch (err) {
      // Xử lý lỗi khi gọi API (ví dụ như lỗi mạng)
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Lấy message từ phản hồi lỗi của API
      } else {
        setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      }
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error && ( // Hiển thị thông báo lỗi nếu có lỗi
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
  
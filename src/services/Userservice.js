import axios from "axios";

// URL của API
const API_URL = "http://localhost:8080/api/user/";
// Tạo instance axios đã cấu hình
const axiosInstance = axios.create({
  baseURL: API_URL, // Địa chỉ cơ sở của API
  headers: {
    "Content-Type": "application/json", // Đảm bảo dữ liệu gửi là JSON
  },
});

// Các hàm dịch vụ sử dụng axiosInstance

// Lấy danh sách người dùng
export const fetchUser = async (page = 1, size = 3) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${API_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        page: page - 1, // Truyền tham số page
        size: size, // Truyền tham số size (số lượng items mỗi trang)
      },
    });

    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error(
      "Lỗi khi lấy danh sách người dùng:",
      error.response ? error.response.data : error.message
    ); // In ra lỗi nếu có
    throw error; // Ném lại lỗi để có thể xử lý ở nơi gọi
  }
};

// Thêm người dùng mới
export const addUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/", userData); // Gọi API để thêm người dùng mới
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error(
      "Lỗi khi thêm người dùng:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Chỉnh sửa thông tin người dùng
export const updateUser = async (userId, updatedData) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axiosInstance.put(`/${userId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    }); // Gọi API để chỉnh sửa thông tin người dùng
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error(
      "Lỗi khi chỉnh sửa người dùng:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Xóa người dùng
export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/${userId}`); // Gọi API để xóa người dùng
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error(
      "Lỗi khi xóa người dùng:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Xuất toàn bộ axiosInstance và các hàm dịch vụ
export default {
  axiosInstance,
  fetchUser,
  addUser,
  updateUser,
  deleteUser,
};

import React, { useState, useEffect } from "react";
import { fetchUser,updateUser } from "../../services/Userservice"; // Adjust the path to your service file

// User Table Component
const UserTable = ({ users, onEdit, onDelete }) => (
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b">Name</th>
        <th className="py-2 px-4 border-b">Số điện thoại</th>
        <th className="py-2 px-4 border-b">Địa chỉ</th>
        <th className="py-2 px-4 border-b">Role</th>
        <th className="py-2 px-4 border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td className="py-2 px-4 border-b">{user.fullName}</td>
          <td className="py-2 px-4 border-b">{user.phoneNumber}</td>
          <td className="py-2 px-4 border-b">{user.address}</td>
          <td className="py-2 px-4 border-b">
            {user.roleName?.length > 0 ? user.roleName[0].roleName : "Không có vai trò"}
          </td>
          <td className="py-2 px-4 border-b">
            <button onClick={() => onEdit(user)} className="text-blue-500 hover:text-blue-700 mr-2">
              Edit
            </button>
            <button onClick={() => onDelete(user)} className="text-red-500 hover:text-red-700">
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

// User Form Modal Component
const UserFormModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    role: user?.role || user?.roleName,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role:  user?.roleName,
      });
    } else {
      setFormData({
        fullName: "",
        phoneNumber: "",
        address: "",
        role: "",
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...user, ...formData });
    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{user ? "Edit User" : "Add User"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Số điện thoại</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Địa chỉ</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Role</label>
            <select
              className="w-full border rounded px-2 py-1"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteUserModal = ({ isOpen, onClose, user, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Delete User</h2>
        <p className="mb-4">Are you sure you want to delete {user?.fullName}?</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded mr-2">
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(user.id);
              onClose();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center mt-4">
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`mx-1 px-3 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        {page}
      </button>
    ))}
  </div>
);

// Main Account Management Component  
export default function AccountManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 3;

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUser(currentPage, usersPerPage);
      setUsers(data.content);
      setTotalPages(data.totalPages);
    };
    loadUsers();
  }, [currentPage]);

  useEffect(() => {
    if (users && users.length > 0) {
      const results = users.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(results);
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm, users]);

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
    setIsAddModalOpen(false);
  };

  const handleEditUser = async (updatedUser) => {
    try {
      // Gọi API để cập nhật thông tin người dùng
      await updateUser(updatedUser.id, updatedUser); // Không cần gán giá trị vào biến
  
      // Re-fetch the users to ensure data is up-to-date
      const data = await fetchUser(currentPage, usersPerPage);
      setUsers(data.content);
      setTotalPages(data.totalPages);
  
      setIsEditModalOpen(false); // Đóng modal
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
      alert("Không thể cập nhật người dùng. Vui lòng thử lại.");
    }
  };
  
  const handleDeleteUser = async (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Search users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add User
        </button>
      </div>

      <UserTable
        users={filteredUsers}
        onEdit={(user) => { setSelectedUser(user); setIsEditModalOpen(true); }}
        onDelete={(user) => { setSelectedUser(user); setIsDeleteModalOpen(true); }}
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />

      <UserFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        user={selectedUser}
        onSave={handleAddUser}
      />
      <UserFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSave={handleEditUser}
      />
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        user={selectedUser}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
}

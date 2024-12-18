import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';

const Sidebar = () => (
  <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
    <nav>
      <ul>
        <li><Link to="/admin" className="block py-2 px-4 hover:bg-gray-700">Dashboard</Link></li>
        <li><Link to="/admin/accounts" className="block py-2 px-4 hover:bg-gray-700">Accounts</Link></li>
        <li><Link to="/admin/classes" className="block py-2 px-4 hover:bg-gray-700">Classes</Link></li>
        <li><Link to="/admin/notifications" className="block py-2 px-4 hover:bg-gray-700">Notifications</Link></li>
      </ul>
    </nav>
  </aside>
);

export default function AdminLayout({ isAuthenticated, role }) {
  if (!isAuthenticated || role !== 'ROLE_ADMIN') {
    // If the user is not authenticated or not an admin, redirect to login
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

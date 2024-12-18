import React, { useState } from 'react';

const NotificationList = ({ notifications }) => (
  <ul className="bg-white rounded-lg shadow-md">
    {notifications.map((notification) => (
      <li key={notification.id} className="border-b last:border-b-0 p-4">
        <h3 className="font-semibold">{notification.title}</h3>
        <p className="text-gray-600">{notification.message}</p>
        <p className="text-sm text-gray-500 mt-2">Sent to: {notification.recipients}</p>
      </li>
    ))}
  </ul>
);

const NotificationForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, message, recipients });
    setTitle('');
    setMessage('');
    setRecipients('all');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Create Notification</h2>
      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded px-2 py-1"
          rows="4"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Recipients</label>
        <select
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          className="w-full border rounded px-2 py-1"
        >
          <option value="all">All Users</option>
          <option value="students">Students Only</option>
          <option value="instructors">Instructors Only</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Send Notification
      </button>
    </form>
  );
};

export default function NotificationManagement() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Course Available', message: 'Check out our new Python course!', recipients: 'All Users' },
    { id: 2, title: 'System Maintenance', message: 'The system will be down for maintenance on Saturday.', recipients: 'All Users' },
  ]);

  const handleSubmit = (newNotification) => {
    setNotifications([
      { id: notifications.length + 1, ...newNotification },
      ...notifications,
    ]);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Notification Management</h1>
      <NotificationForm onSubmit={handleSubmit} />
      <NotificationList notifications={notifications} />
    </div>
  );
}


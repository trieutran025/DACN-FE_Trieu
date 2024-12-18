import React, { useState } from 'react';
import { Button } from "../../components/ui/button.tsx";
import { Input } from "../../components/ui/input.tsx";
import { Textarea } from "../../components/ui/textarea.tsx";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState('');

  const handleAddNotification = () => {
    if (newNotification.trim()) {
      setNotifications([...notifications, newNotification]);
      setNewNotification('');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Notification title"
          value={newNotification}
          onChange={(e) => setNewNotification(e.target.value)}
          className="mb-2"
        />
        <Textarea placeholder="Notification content" className="mb-2" />
        <Button onClick={handleAddNotification}>Send Notification</Button>
      </div>
      <h2 className="text-xl font-bold mb-2">Sent Notifications</h2>
      <ul className="list-disc pl-5">
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

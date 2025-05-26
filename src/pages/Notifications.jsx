import React, { useState } from "react";
import { Bell, Trash2 } from "lucide-react";

const initialNotifications = [
  { id: 1, title: "New Order Received", message: "You have received a new order #12345.", date: "2025-05-26", read: false },
  { id: 2, title: "Product Stock Low", message: "Product XYZ is low on stock.", date: "2025-05-25", read: true },
];

export default function SellerNotificationPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <Bell className="text-gray-700" /> Seller Notifications
      </h1>
      <div className="flex justify-end mb-4">
        <button onClick={deleteAllNotifications} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2">
          <Trash2 size={16} /> Delete All
        </button>
      </div>
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className={`p-4 rounded-xl shadow ${notif.read ? "bg-gray-100" : "bg-white"}`}>
            <h2 className="font-semibold text-gray-800">{notif.title}</h2>
            <p className="text-gray-600">{notif.message}</p>
            <p className="text-sm text-gray-400">{notif.date}</p>
            <div className="mt-2 flex gap-2">
              {!notif.read && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => deleteNotification(notif.id)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-1"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
        {notifications.length === 0 && <p>No notifications available.</p>}
      </div>
    </div>
  );
}

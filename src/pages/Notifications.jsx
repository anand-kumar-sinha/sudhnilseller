import React, { useEffect, useState } from "react";
import { Bell, Trash2 } from "lucide-react";
import axios from "axios";
import { backandUrl } from "../App";

export default function SellerNotificationPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.post(
        backandUrl + "/api/seller/notifications",
        {},
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.log(error);
    }
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
        <button
          onClick={deleteAllNotifications}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
        >
          <Trash2 size={16} /> Delete All
        </button>
      </div>
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif._id} className="p-4 rounded-xl shadowbg-white">
            <h2 className="font-semibold text-gray-800">{notif.title}</h2>
            <p className="text-gray-600">{notif.body}</p>
            <p className="text-sm text-gray-400">
              {new Date(notif.createdAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>{" "}
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => deleteNotification(notif._id)}
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

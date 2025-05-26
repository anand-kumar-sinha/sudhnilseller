import { useEffect, useState } from "react";
import axios from "axios";
import { backandUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const DashBord = ({ token }) => {
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSellerData = async () => {
    try {
      const response = await axios.get(backandUrl + "/api/seller/me", {
        headers: { token },
      });
      if (response.data.success) {
        setSellerData(response.data.seller);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch seller data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!sellerData) {
    return <div className="text-center py-10">No seller data available</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>
      
      {/* Profile Summary Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <img 
            src={assets.profile_icon} 
            alt="Profile" 
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold">{sellerData.name}</h2>
            <p className="text-gray-600">{sellerData.email}</p>
            <p className="text-sm text-gray-500 capitalize">{sellerData.role}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Total Sells</h3>
          <p className="text-3xl font-bold">{sellerData.totalSells || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold">{currency} {sellerData.totalEarning || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-500 mb-2">Active Products</h3>
          <p className="text-3xl font-bold">{sellerData.products?.length || 0}</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-4">Recent Orders ({sellerData.orders || 0})</h3>
          {sellerData.recentOrders?.length > 0 ? (
            <ul className="space-y-3">
              {sellerData.recentOrders.map((order, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Order #{order._id.slice(-6)}</p>
                    <p className="text-sm text-gray-500">
                      {order.item.quantity} x {order.item.size} • {currency}{order.amount}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded ${
                    order.status === 'Order Placed' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Shipping' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {order.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent orders</p>
          )}
          {sellerData.orders > 2 && (
            <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all orders
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-4">Recent Notifications ({sellerData.notifications || 0})</h3>
          {sellerData.recentNotification?.length > 0 ? (
            <ul className="space-y-3">
              {sellerData.recentNotification.map((notification, index) => (
                <li key={index} className="flex items-start border-b pb-2">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <img src={assets.notification_icon} alt="Notification" className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-gray-500">{notification.body}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent notifications</p>
          )}
          {sellerData.notifications > 2 && (
            <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all notifications
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBord;
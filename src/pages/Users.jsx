import React, { useEffect, useState } from "react";
import { Trash2, Edit, UserPlus } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { backandUrl } from "../App";

export default function Users({ token }) {
  const [users, setUsers] = useState();

  useEffect(() => {
    fetchAllUsers();
  }, []);
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(backandUrl + "/api/user/users-all", {
        headers: { token },
      });

      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin - User Management</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Mobile</th>
              <th className="py-3 px-6 text-left">State</th>
              <th className="py-3 px-6 text-left">City</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users?.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-3 px-6">{user?.name}</td>
                  <td className="py-3 px-6">{user?.email}</td>
                  <td className="py-3 px-6">
                    {user?.defaultAddress?.mobileNumber || "---"}
                  </td>
                  <td className="py-3 px-6">
                    {user?.defaultAddress?.state || "---"}
                  </td>
                  <td className="py-3 px-6">
                    {user?.defaultAddress?.city || "---"}
                  </td>
                  <td className="py-3 px-6 text-right space-x-2">
                    <button className="text-gray-600 hover:text-blue-600">
                      <Edit size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

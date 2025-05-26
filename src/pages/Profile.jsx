import React, { useEffect, useState } from "react";
import { backandUrl } from "../App";
import axios from "axios";
import { Edit, Save, UserCircle } from "lucide-react";

const Profile = () => {
  const [seller, setSeller] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editedSeller, setEditedSeller] = useState();

  useEffect(() => {
    fetchSeller();
  }, []);

  const fetchSeller = async () => {
    let token = localStorage.getItem("token");
    try {
      const response = await axios.get(backandUrl + "/api/seller/me", {
        headers: { token },
      });
      if (response.data.success) {
        setSeller(response.data.seller);
        localStorage.setItem("seller", JSON.stringify(response.data.seller));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedSeller(seller);
  };

  const handleSave = async () => {
    let token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        backandUrl + "/api/seller/me/update",
        editedSeller,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        localStorage.setItem("seller", JSON.stringify(response.data.seller));
        setSeller(response.data.seller);
      }
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSeller((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <UserCircle className="text-gray-700" /> Seller Profile
      </h1>
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold">Store Information</h2>
        <div className="mt-4 space-y-2">
          {isEditing ? (
            <>
              <input
                name="storeName"
                value={editedSeller?.storeName}
                onChange={handleChange}
                className="border rounded p-1 w-full"
                placeholder="Enter store name"
              />
              <input
                name="storeAddress"
                value={editedSeller?.storeAddress}
                onChange={handleChange}
                className="border rounded p-1 w-full"
                placeholder="Enter store address"
              />
              <textarea
                name="description"
                value={editedSeller?.description}
                onChange={handleChange}
                className="border rounded p-1 w-full"
                placeholder="Enter store description"
              ></textarea>
            </>
          ) : (
            <>
              <p>
                <strong>Store Name:</strong> {seller?.storeName}
              </p>
              <p>
                <strong>Store Address:</strong> {seller?.storeAddress}
              </p>
              <p>
                <strong>Description:</strong> {seller?.description}
              </p>
            </>
          )}
        </div>
        <h2 className="text-lg font-semibold mt-6">Personal Information</h2>
        <div className="mt-4 space-y-2">
          {isEditing ? (
            <>
              <input
                name="name"
                value={editedSeller?.name}
                onChange={handleChange}
                className="border rounded p-1 w-full"
                placeholder="Enter your name"
              />
              <input
                name="email"
                value={editedSeller?.email}
                onChange={handleChange}
                className="border rounded p-1 w-full"
                placeholder="Enter your email"
              />
              <input
                name="phone"
                value={editedSeller?.phone}
                onChange={handleChange}
                className="border rounded p-1 w-full"
                placeholder="Enter your phone number"
              />
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {seller?.name}
              </p>
              <p>
                <strong>Email:</strong> {seller?.email}
              </p>
              <p>
                <strong>Phone:</strong> {seller?.phone}
              </p>
            </>
          )}
        </div>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <Save size={16} /> Save Profile
          </button>
        ) : (
          <button
            onClick={handleEditToggle}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Edit size={16} /> Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;

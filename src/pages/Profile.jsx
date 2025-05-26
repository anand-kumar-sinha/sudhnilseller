import React, { useState } from "react";
import { UserCircle, Edit, Save } from "lucide-react";

const initialSellerData = {
  name: "Seller One",
  email: "seller1@example.com",
  phone: "(555) 987-6543",
  storeName: "Gadget Store",
  storeAddress: "456 Market Street, Springfield, IL, 62704",
  description: "Specializing in electronics and gadgets."
};

export default function SellerProfilePage() {
  const [seller, setSeller] = useState(initialSellerData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSeller, setEditedSeller] = useState(initialSellerData);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedSeller(seller);
  };

  const handleSave = () => {
    setSeller(editedSeller);
    setIsEditing(false);
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
              <input name="storeName" value={editedSeller.storeName} onChange={handleChange} className="border rounded p-1 w-full" />
              <input name="storeAddress" value={editedSeller.storeAddress} onChange={handleChange} className="border rounded p-1 w-full" />
              <textarea name="description" value={editedSeller.description} onChange={handleChange} className="border rounded p-1 w-full"></textarea>
            </>
          ) : (
            <>
              <p><strong>Store Name:</strong> {seller.storeName}</p>
              <p><strong>Store Address:</strong> {seller.storeAddress}</p>
              <p><strong>Description:</strong> {seller.description}</p>
            </>
          )}
        </div>
        <h2 className="text-lg font-semibold mt-6">Personal Information</h2>
        <div className="mt-4 space-y-2">
          {isEditing ? (
            <>
              <input name="name" value={editedSeller.name} onChange={handleChange} className="border rounded p-1 w-full" />
              <input name="email" value={editedSeller.email} onChange={handleChange} className="border rounded p-1 w-full" />
              <input name="phone" value={editedSeller.phone} onChange={handleChange} className="border rounded p-1 w-full" />
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {seller.name}</p>
              <p><strong>Email:</strong> {seller.email}</p>
              <p><strong>Phone:</strong> {seller.phone}</p>
            </>
          )}
        </div>
        {isEditing ? (
          <button onClick={handleSave} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2">
            <Save size={16} /> Save Profile
          </button>
        ) : (
          <button onClick={handleEditToggle} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
            <Edit size={16} /> Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

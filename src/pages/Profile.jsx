import React, { useState } from "react";
import { Edit, Save, X, UploadCloud } from "lucide-react";

const initialSellerData = {
  name: "Seller One",
  email: "seller1@example.com",
  phone: "(555) 987-6543",
  storeName: "Gadget Store",
  storeAddress: "456 Market Street, Springfield, IL, 62704",
  description: "Specializing in electronics and gadgets.",
  profileImage: null,
};

export default function SellerProfilePage() {
  const [seller, setSeller] = useState(initialSellerData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSeller, setEditedSeller] = useState(initialSellerData);
  const [previewImage, setPreviewImage] = useState(null);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedSeller(seller);
      setPreviewImage(null);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const requiredFields = [
      "name",
      "email",
      "phone",
      "storeName",
      "storeAddress",
      "description",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !editedSeller[field]?.trim()
    );

    if (emptyFields.length > 0) {
      alert("Please fill out all fields before saving.");
      return;
    }

    const updatedData = {
      ...editedSeller,
      profileImage: previewImage || editedSeller.profileImage,
    };

    setSeller(updatedData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSeller((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  const profileImgSrc =
    previewImage || seller.profileImage || "https://via.placeholder.com/120?text=Profile";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2 bg-blue-400 text-black p-6 rounded-xl shadow">
        <div className="relative w-28 h-28 flex-shrink-0">
          <img
            src={profileImgSrc}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-white"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer hover:bg-gray-200">
              <UploadCloud size={18} className="text-green-600" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>
        <div className="max-w-full break-words">
          <h1 className="text-2xl font-bold">{seller.storeName}</h1>
          <p className="opacity-90">{seller.email}</p>
        </div>
      </div>

      {/* Store Info and Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">
        <div>
          <h2 className="text-lg font-semibold mb-4 text-blue-600">
            Store Information
          </h2>
          <div className="space-y-3">
            {isEditing ? (
              <>
                <input
                  name="storeName"
                  value={editedSeller.storeName}
                  onChange={handleChange}
                  placeholder="Store Name"
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="storeAddress"
                  value={editedSeller.storeAddress}
                  onChange={handleChange}
                  placeholder="Store Address"
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="description"
                  value={editedSeller.description}
                  onChange={handleChange}
                  placeholder="Store Description"
                  className="border border-gray-300 rounded px-3 py-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            ) : (
              <>
                <p>
                  <span className="font-medium">Store Name:</span>{" "}
                  {seller.storeName}
                </p>
                <p>
                  <span className="font-medium">Store Address:</span>{" "}
                  {seller.storeAddress}
                </p>
                <p>
                  <span className="font-medium">Description:</span>{" "}
                  {seller.description}
                </p>
              </>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 text-blue-600">
            Personal Information
          </h2>
          <div className="space-y-3">
            {isEditing ? (
              <>
                <input
                  name="name"
                  value={editedSeller.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="email"
                  value={editedSeller.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="phone"
                  value={editedSeller.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            ) : (
              <>
                <p>
                  <span className="font-medium">Name:</span> {seller.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {seller.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {seller.phone}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
            >
              <Save size={16} /> Save
            </button>
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 flex items-center gap-2"
            >
              <X size={16} /> Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Edit size={16} /> Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

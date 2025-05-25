import React, { useState } from 'react';

const CompanyDetails = () => {
  const [formData, setFormData] = useState({
    about: '',
    mobile: '',
    email: '',
    address: '',
    referral: '',
    facebook: '',
    whatsapp: '',
    twitter: '',
    youtube: '',
    instagram: '',
    telegram: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6">Company Details</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-5">
        {/* Single column fields */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block font-medium mb-1">About Us</label>
            <input type="text" name="about" value={formData.about} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Mobile Number</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Refer Amount</label>
            <input type="number" name="referral" value={formData.referral} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
        </div>

        {/* Two-column social URLs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Facebook URL</label>
            <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">YouTube URL</label>
            <input type="text" name="youtube" value={formData.youtube} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">WhatsApp URL</label>
            <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Instagram URL</label>
            <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Twitter URL</label>
            <input type="text" name="twitter" value={formData.twitter} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Telegram URL</label>
            <input type="text" name="telegram" value={formData.telegram} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
        </div>

        <div className="text-right">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-200 hover:text-black">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyDetails;

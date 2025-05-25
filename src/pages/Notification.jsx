import React, { useState } from "react";

const Notification = () => {
  const [formAll, setFormAll] = useState({
    title: "",
    body: "",
    url: "",
  });

  const [formSingle, setFormSingle] = useState({
    title: "",
    body: "",
    mobile: "",
    url: "",
  });

  const [sentAll, setSentAll] = useState([]);
  const [sentSingle, setSentSingle] = useState([]);

  const handleAllSubmit = (e) => {
    e.preventDefault();
    const newNotification = {
      ...formAll,
      time: new Date().toLocaleString(),
      type: "All Users",
    };
    setSentAll([newNotification, ...sentAll]);
    alert("Notification sent to all users.");
    setFormAll({ title: "", body: "", url: "" });
  };

  const handleSingleSubmit = (e) => {
    e.preventDefault();
    if (!formSingle.mobile.trim()) {
      alert("Please enter user mobile number.");
      return;
    }
    const newNotification = {
      ...formSingle,
      time: new Date().toLocaleString(),
      type: "Single User",
    };
    setSentSingle([newNotification, ...sentSingle]);
    alert("Notification sent to the specific user.");
    setFormSingle({ title: "", body: "", mobile: "", url: "" });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      {/* All Users Notification */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Notification</h2>
        <form onSubmit={handleAllSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Notification Title</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded"
              value={formAll.title}
              onChange={(e) => setFormAll({ ...formAll, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Notification Body</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded"
              value={formAll.body}
              onChange={(e) => setFormAll({ ...formAll, body: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Click URL</label>
            <input
              type="url"
              className="w-full border px-4 py-2 rounded"
              value={formAll.url}
              onChange={(e) => setFormAll({ ...formAll, url: e.target.value })}
              required
            />
          </div>
          <div className="col-span-1 md:col-span-3">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-200 hover:text-black"
            >
              Create Notification
            </button>
          </div>
        </form>
      </div>

      {/* Single User Notification */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Notification Single User</h2>
        <form onSubmit={handleSingleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Notification Title</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded"
              value={formSingle.title}
              onChange={(e) => setFormSingle({ ...formSingle, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Notification Body</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded"
              value={formSingle.body}
              onChange={(e) => setFormSingle({ ...formSingle, body: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">User Mobile No</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded"
              value={formSingle.mobile}
              onChange={(e) => setFormSingle({ ...formSingle, mobile: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Click URL</label>
            <input
              type="url"
              className="w-full border px-4 py-2 rounded"
              value={formSingle.url}
              onChange={(e) => setFormSingle({ ...formSingle, url: e.target.value })}
              required
            />
          </div>
          <div className="col-span-1 md:col-span-4">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-200 hover:text-black"
            >
              Create Notification
            </button>
          </div>
        </form>
      </div>

      {/* Sent Notifications */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Sent Notifications</h2>

        {[...sentAll, ...sentSingle].map((note, idx) => (
          <div key={idx} className="border rounded p-4 bg-gray-50 shadow-sm space-y-1">
            <p className="text-sm font-semibold">Title: {note.title}</p>
            <p className="text-sm">Body: {note.body}</p>
            <p className="text-sm">Click URL: {note.url}</p>
            {note.mobile && <p className="text-sm">Mobile: {note.mobile}</p>}
            <p className="text-xs text-gray-500">
              Type: {note.type} | Sent at: {note.time}
            </p>
          </div>
        ))}
      </div>
    </div>
 

  )
}

export default Notification
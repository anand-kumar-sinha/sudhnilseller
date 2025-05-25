import { useState } from "react";
import { Mail, Phone, User, MessageCircle, Trash2 } from "lucide-react";

const supportRequests = [
  {
    id: 1,
    name: "Priya Kumari",
    mobile: "6206571984",
    email: "priyakumarinwd100@gmail.com",
    question: "How can I track my order? ffdsdsfds df s",
    time: "Just now",
  },
  {
    id: 2,
    name: "Ravi Verma",
    mobile: "9876543210",
    email: "ravi@example.com",
    question: "Can I cancel my order after shipping? sdfdfdfds" ,
    time: "10 mins ago",
  },
];

export default function AdminSupportNotifications() {
  const [requests, setRequests] = useState(supportRequests);

  const deleteRequest = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-blue-700">
          <MessageCircle className="w-6 h-6" />
          Support Requests
        </h1>
        <p className="text-sm text-gray-500">View user-submitted questions to the admin.</p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center text-gray-400 py-10">No support requests yet.</div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white border p-4 rounded-xl shadow-sm flex justify-between items-start"
            >
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="font-medium">{req.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span>{req.mobile}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span>{req.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-gray-600 mt-1" />
                  <span className="text-gray-800">{req.question}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{req.time}</p>
              </div>
              <button
                onClick={() => deleteRequest(req.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete request"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
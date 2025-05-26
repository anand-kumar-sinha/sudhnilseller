import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import DashBord from "./pages/DashBord";
import axios from "axios";
import Notifications from "./pages/Notifications";

export const backandUrl = "https://ecomm-backend-tau.vercel.app";
// export const backandUrl = "http://localhost:4000";

export const currency = "₹";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    fetchSeller();
  }, [token])
  const fetchSeller = async () => {
    try {
      const response = await axios.get(backandUrl + "/api/seller/me", {
        headers: { token },
      });
      if (response.data.success) {
        localStorage.setItem("seller", JSON.stringify(response.data.seller));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />

          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route
                  path="/me"
                  element={
                    <Profile
                      token={token}
                      seller={JSON.parse(localStorage.getItem("seller"))}
                    />
                  }
                />
                <Route path="/dashboard" element={<DashBord token={token} />} />
                <Route
                  path="/notifications"
                  element={<Notifications token={token} />}
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

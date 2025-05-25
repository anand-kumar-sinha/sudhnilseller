import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import Banner from "./pages/Banner";
import Category from "./pages/Category";
import Users from "./pages/Users";
import Notification from "./pages/Notification";
import CompanyDeatils from "./pages/CompanyDeatils";
import Query from "./Query";

export const backandUrl = "https://ecomm-backend-tau.vercel.app";
// export const backandUrl = "http://localhost:4000";

export const currency = "₹" ;

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

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
                <Route path="/banners" element={<Banner token={token} />} />
                <Route path="/category" element={<Category token={token} />} />
                <Route path="/users" element={<Users token={token} />} />
                <Route path="/notifications" element={<Notification token={token} />} />
                <Route path="/company-details" element={<CompanyDeatils token={token} />} />
                <Route path="/query" element={<Query token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

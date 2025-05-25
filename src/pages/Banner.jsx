import axios from "axios";
import { useEffect, useState } from "react";
import { backandUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
const Banner = ({ token }) => {
  const [list, setList] = useState([]);
  const [image1, setImage1] = useState(false);

  useEffect(() => {
    fetchBanner();
  }, []);
  const fetchBanner = async () => {
    try {
      const response = await axios.get(backandUrl + "/api/banner/fetch");

      if (response.data.success) {
        setList(response.data.banner);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      image1 && formData.append("image1", image1);

      const response = await axios.post(
        backandUrl + "/api/banner/add",
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setImage1(false);
      } 
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backandUrl + "/api/banner/delete",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchBanner();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmitHandler} className="mb-4">
        <p className="mb-2">Upload Banner</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 cursor-pointer"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-20 py-3 mt-4 bg-black text-white rounded-md hover:bg-slate-300 hover:text-black"
        >
          ADD
        </button>
      </form>
      <p className="mb-2">All Banner List</p>

      <div className="flex flex-col gap-2 ">
        {/*---------List Table Title---------*/}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>File name</b>
          <b className="text-center">Action</b>
        </div>

        {/*-----------Products List------------*/}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm"
            key={index}
          >
            <img className="w-12" src={item.image} />
            <p>{item.fileName}</p>
   
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Banner;

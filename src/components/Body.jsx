import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return; // User data already exists in the store
    try {
      const res = await axios.get(API_BASE_URL + "/profile/view", {
        withCredentials: true
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response && error.response.status === 401) navigate("/login");
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet /> {/* Render nested routes here */}
      <Footer />
    </>
  );
};

export default Body;

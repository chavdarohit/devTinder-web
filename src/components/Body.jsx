import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setLoading, setError } from "../utils/userSlice";
import { useEffect } from "react";
import Toast from "./Toast";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: userData, loading } = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) {
      dispatch(setLoading(false));
      return;
    }

    try {
      const res = await axios.get(API_BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      dispatch(setError(error.message));
      if (error.response && error.response.status === 401) navigate("/login");
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-base-200/30">
      <Navbar />
      <main className="grow flex flex-col pt-4">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default Body;

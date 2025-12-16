import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(API_BASE_URL + "/feed", {
        withCredentials: true
      });

      dispatch(addFeed(response.data.user));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;

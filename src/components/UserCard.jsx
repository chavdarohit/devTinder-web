import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { API_BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, bio } = user || {};
  const dispatch = useDispatch();
  console.log({ user });

  const handleSendRequest = async (status, userId) => {
    // Logic to send connection request

    try {
      await axios.post(
        API_BASE_URL + `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error sending connection request:", error);
    }
  };

  return user ? (
    <div className="card bg-base-300 w-96 shadow-sm ">
      <img src={photoUrl} alt="User profile" />

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && (
          <p>
            {age} years, {gender}
          </p>
        )}
        <p>{bio}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore{" "}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>No user data available.</div>
  );
};

export default UserCard;

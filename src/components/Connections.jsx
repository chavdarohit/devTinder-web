import { useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections, setLoading } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const { data: connections, loading } = useSelector(
    (state) => state.connection
  );

  const fetchConnections = async () => {
    if (connections.length > 0) {
      dispatch(setLoading(false));
      return;
    }
    try {
      const res = await axios.get(API_BASE_URL + "/user/connections", {
        withCredentials: true
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!connections) {
    return null;
  }

  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="my-10">
      <h1 className="text-bold text-center text-white text-3xl mb-6">
        Connections
      </h1>

      {connections.map((connection) => {
        const { firstName, lastName, bio, skills, age, gender, photoUrl } =
          connection;

        return (
          <div
            key={connection._id}
            className="card w-1/2 bg-black shadow-xl m-auto mb-6"
          >
            <div className="card-body shadow-2xl">
              <div className="flex items-center gap-4">
                {/* Avatar - Fixed width */}
                <div className="flex-shrink-0">
                  <img
                    src={
                      photoUrl ||
                      "https://images.unsplash.com/vector-1742875355318-00d715aec3e8?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={`${firstName} ${lastName}`}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>

                {/* Name and Bio - Fixed width, takes priority */}
                <div className="flex-shrink-0 w-64">
                  <h1 className="card-title text-lg">
                    {firstName} {lastName}
                  </h1>
                  {age && (
                    <p className="text-sm mt-1">
                      {age}, {gender}
                    </p>
                  )}
                  {bio && (
                    <p className="text-sm text-base-content/70 line-clamp-2">
                      {bio}
                    </p>
                  )}
                  {skills && (
                    <p className="text-sm break-words overflow-wrap-anywhere">
                      {skills?.length > 0 ? skills.join(", ") : "N/A"}
                    </p>
                  )}
                </div>

                {/* Skills and Info - Flexible, grows but with max width */}
                <div className="flex-1 min-w-0"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;

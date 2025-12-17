import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const { data: user, loading } = useSelector((store) => store.user);

  if (loading) {
    return (
      <div className="flex w-52 flex-col gap-4 justify-center items-center mx-auto mt-10">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  }

  return (
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;

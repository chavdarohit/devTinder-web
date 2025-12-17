import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [initialData, setInitialData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    photoUrl: user.photoUrl || "",
    bio: user.bio || "",
    skills: user.skills?.join(", ") || "",
    age: user.age || ""
  });

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [bio, setBio] = useState(user.bio || "");
  const [skills, setSkills] = useState(user.skills?.join(", ") || "");
  const [age, setAge] = useState(user.age || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  // Check if form has changed
  useEffect(() => {
    const hasChanged =
      firstName !== initialData.firstName ||
      lastName !== initialData.lastName ||
      photoUrl !== initialData.photoUrl ||
      bio !== initialData.bio ||
      skills !== initialData.skills ||
      age !== initialData.age;

    setIsChanged(hasChanged);
  }, [firstName, lastName, photoUrl, bio, skills, age, initialData]);

  const handleUpdate = async () => {
    setError("");
    setSuccess("");

    try {
      const skillsArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill);

      const res = await axios.patch(
        API_BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          bio,
          skills: skillsArray,
          age
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setSuccess("Profile updated successfully!");

      // Update initial data after successful save
      setInitialData({
        firstName,
        lastName,
        photoUrl,
        bio,
        skills,
        age
      });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "Update failed. Please try again."
        );
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-center align-center my-10">
      <div className="flex justify-center mx-10">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-384 max-w-md border p-4">
          <legend className="fieldset-title text-2xl font-bold mb-4">
            Edit Profile
          </legend>

          <label className="label">First Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label">Age</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label">Photo URL</label>
          <input
            type="url"
            className="input w-full"
            placeholder="Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <label className="label">About</label>
          <textarea
            className="textarea w-full"
            placeholder="Tell us about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <label className="label">Skills (comma-separated)</label>
          <input
            type="text"
            className="input w-full"
            placeholder="e.g., React, Node.js, MongoDB"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}

          <button
            className="btn btn-neutral mt-4 w-full"
            onClick={handleUpdate}
            disabled={!isChanged}
          >
            Update Profile
          </button>
        </fieldset>
      </div>
      <UserCard
        user={{
          firstName,
          lastName,
          photoUrl:
            photoUrl ||
            "https://images.unsplash.com/vector-1742875355318-00d715aec3e8?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          bio,
          skills: skills
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s)
        }}
      />
    </div>
  );
};

export default EditProfile;

import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        API_BASE_URL + "/login",
        {
          email,
          password
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data) {
        setError(err?.response?.data || "Login failed. Please try again.");
        setEmail("");
        setPassword("");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        API_BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      navigate("/profile");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data || "Sign Up failed. Please try again.");
        setEmail("");
        setPassword("");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-center my-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <h2 className="text-center ">{isLoginForm ? "Login" : "Sign Up"}</h2>
        {!isLoginForm && (
          <>
            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="label">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500">{error}</p>
        <button
          className="btn btn-neutral mt-4"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
        <p className="m-auto mt-2 ">
          {isLoginForm ? (
            <>
              Don't have an account? .
              <button
                className="text-blue-500 underline cursor-pointer"
                onClick={() => setIsLoginForm(false)}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-blue-500 underline cursor-pointer "
                onClick={() => setIsLoginForm(true)}
              >
                Login
              </button>
            </>
          )}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;

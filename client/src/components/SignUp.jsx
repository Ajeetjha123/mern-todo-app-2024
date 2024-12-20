import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [fullName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigateTo = useNavigate();

  const signUpHandeler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    setIsSubmitting(true);
    try {
      const data = await axios.post(
        "http://localhost:4000/api/v1/user/signup",
        { fullName, email, password, confirmPassword },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
     
      toast.success(data?.data?.message || "User registered successfully");
      navigateTo("/login");
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.errors || "User registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-5">
            Sign Up
          </h2>
          <form onSubmit={signUpHandeler}>
            {/* User Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                User Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter User Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter User Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}{" "}
            </button>
            {/* Login Link */}
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline ">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

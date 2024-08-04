import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../lib/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token); // Store token
        alert("Login successful!");
        // navigate("/subscription");
        window.location.href = "/create-subscription"; // Redirect to dashboard or home page
      } else {
        setError(result.message || "Login failed.");
      }
    } catch (error) {
      setError("Server error.");
      alert(error);
    }
  };

  return (
    <>
      <div className="bg-[#f1f1f1] flex w-full h-screen">
        <div className="w-full flex items-center justify-center md:w-1/2">
          <div className="form text-[#008000] bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 shadow-md">
            <h1 className="text-5xl font-semibold text-[#fb0200]">
              Welcome Back
            </h1>
            <p className="font-medium text-lg mt-4">
              Welcome Back! Please enter your details
            </p>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-8">
              <div>
                <label className="text-lg font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  required
                />
              </div>
              <div>
                <label className="text-lg font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  required
                />
              </div>
              <div className="mt-8 flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 font-medium text-lg"
                  >
                    Remember Me
                  </label>
                </div>
                <Link to="/forgot-password">
                  <p
                    className="font-medium text-[#fb0200]"
                    onClick={() => alert("Forgot password?")}
                  >
                    Forgot password?
                  </p>
                </Link>
              </div>
              <div className="mt-8 flex flex-col">
                <button
                  type="submit"
                  className="bg-[#fb0200] text-white font-bold text-lg py-3 rounded-xl active:scale-[.98] hover:bg-[#fb6000] duration-500 ease-in uppercase"
                >
                  LogIn
                </button>
              </div>
              <div className="mt-2">
                <p className="font-medium">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-[#fb0200] text-xl">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden md:flex w-[100%] items-center justify-center lg:w-1/2 bg-gray-200">
          <img
            src="/images/home.png"
            className="w-60 h-60 animate-bounce"
            alt="Decorative"
          />
        </div>
      </div>
    </>
  );
};

export default Login;

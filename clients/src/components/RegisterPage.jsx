import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { API_URL } from "../lib/utils";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!terms) {
      setError("Agreement to the terms and conditions is compulsory.");
      return;
    }

    try {
      const response = await fetch(
        "https://forex-trading-app-iqbg.onrender.com//api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        window.location.href = "/login"; // Redirect to login page
      } else {
        setError(result.message || "Registration failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-[#f1f1f1] flex w-full h-screen">
        <div className="w-full flex items-center justify-center md:w-1/2">
          <div className="form text-[#008000] bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 shadow-md">
            <h1 className="text-5xl font-semibold text-[#fb0200]">
              Get Started
            </h1>
            <p className="font-medium text-lg mt-4">
              Hi There! Please enter your details
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
                <label className="text-lg font-medium">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
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
                    id="terms"
                    checked={terms}
                    onChange={() => setTerms(!terms)}
                  />
                  <label htmlFor="terms" className="ml-2 font-medium text-lg">
                    I agree to terms and conditions
                  </label>
                </div>
              </div>
              <div className="mt-8 flex flex-col">
                <button
                  type="submit"
                  className="bg-[#fb0200] text-white font-bold text-lg py-3 rounded-xl active:scale-[.98] hover:bg-[#fb6000] duration-500 ease-in uppercase"
                >
                  Register
                </button>
              </div>
              <div className="mt-2">
                <p className="font-medium">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#fb0200] text-xl">
                    Login
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

export default Register;

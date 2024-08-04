import React, { useState } from "react";
import  API_URL from "../lib/utils";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage(
          result.message || "Check your email for further instructions."
        );
      } else {
        setError(result.message || "Request failed.");
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
              Forgot Password
            </h1>
            <p className="font-medium text-lg mt-4">
              Enter your email to receive a password reset link
            </p>
            {message && <p className="text-green-500">{message}</p>}
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
              <div className="mt-8 flex flex-col">
                <Link to="/reset-password/:token">
                  <button
                    type="submit"
                    className="bg-[#fb0200] text-white font-bold text-lg py-3 rounded-xl active:scale-[.98] hover:bg-[#fb6000] duration-500 ease-in uppercase"
                  >
                    Send Reset Link
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

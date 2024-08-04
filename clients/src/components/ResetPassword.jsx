import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../lib/utils";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(
          result.message || "Password reset successful. You can now log in."
        );
        // Optionally redirect to login page
      } else {
        setError(result.message || "Password reset failed.");
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
              Reset Password
            </h1>
            <p className="font-medium text-lg mt-4">Enter your new password</p>
            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-8">
              <div>
                <label className="text-lg font-medium">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  required
                />
              </div>
              <div>
                <label className="text-lg font-medium">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  required
                />
              </div>
              <div className="mt-8 flex flex-col">
                <button
                  type="submit"
                  className="bg-[#fb0200] text-white font-bold text-lg py-3 rounded-xl active:scale-[.98] hover:bg-[#fb6000] duration-500 ease-in uppercase"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

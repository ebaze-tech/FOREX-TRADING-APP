/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../lib/utils";

const Protected = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      alert("Unauthorized.");
      return;
    }

    // Fetch protected data
    const fetchProtectedData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/protected-data`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          setError(data.error || "Failed to fetch protected data.");
          if (data.error === "Not authorized to access this resource.") {
            navigate("/login");
          }
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
        console.error(error);
      }
    };

    fetchProtectedData();
  }, [navigate]);

  return (
    <>
      <div className="bg-[#f1f1f1] flex w-full h-screen">
        <div className="w-full flex items-center justify-center">
          <div className="text-[#008000] bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 shadow-md">
            <h1 className="text-5xl font-semibold text-[#fb0200]">
              Protected Content
            </h1>
            <p className="font-medium text-lg mt-4">
              Here is the protected content for premium users.
            </p>
            {error && <p className="text-red-500">{error}</p>}
            {userData && (
              <div className="mt-8">
                <p className="text-lg font-medium">
                  User ID: {userData.user.id}
                </p>
                <p className="text-lg font-medium">
                  User Email: {userData.user.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Protected;

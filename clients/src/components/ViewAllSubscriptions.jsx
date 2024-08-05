import React, { useState, useEffect } from "react";
// import { API_URL } from "../lib/utils";

const ViewAllSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(
          "https://forex-trading-app-2.onrender.com/api/subscription/all/subscriptions",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setSubscriptions(data.subscriptions);
        } else {
          setError(data.error || "Failed to fetch subscriptions.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
        console.error(error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className="bg-[#f1f1f1] flex w-full h-screen">
      <div className="w-full flex items-center justify-center md:w-1/2">
        <div className="form text-[#008000] bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 shadow-md">
          <h1 className="text-5xl font-semibold text-[#fb0200]">
            All Subscriptions
          </h1>
          {error && <p className="text-red-500">{error}</p>}
          {subscriptions.length > 0 ? (
            <ul className="mt-8">
              {subscriptions.map((sub) => (
                <li key={sub._id} className="mb-4">
                  <p>
                    <strong>User ID:</strong> {sub.userId}
                  </p>
                  <p>
                    <strong>Plan:</strong> {sub.plan}
                  </p>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {new Date(sub.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>End Date:</strong>{" "}
                    {new Date(sub.endDate).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No subscriptions found.</p>
          )}
        </div>
      </div>
      <div className="hidden md:flex w-[100%] items-center justify-center lg:w-1/2 bg-gray-200">
        <img
          src="/images/home.png"
          className="w-60 h-60 animate-bounce"
          alt="Subscription"
        />
      </div>
    </div>
  );
};

export default ViewAllSubscriptions;

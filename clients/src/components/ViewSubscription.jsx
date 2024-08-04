import React, { useState, useEffect } from "react";
import API_URL from "../lib/utils";

const ViewSubscription = () => {
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch(`${API_URL}/api/subscription/get_subscription`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setSubscription(data.subscription);
        } else {
          setError(data.error || "Failed to fetch subscription.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
        console.error(error);
      }
    };

    fetchSubscription();
  }, []);

  return (
    <div className="bg-[#f1f1f1] flex w-full h-screen">
      <div className="w-full flex items-center justify-center md:w-1/2">
        <div className="form text-[#008000] bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 shadow-md">
          <h1 className="text-5xl font-semibold text-[#fb0200]">
            Subscription Details
          </h1>
          {error && <p className="text-red-500">{error}</p>}
          {subscription ? (
            <div className="mt-8">
              <p>
                <strong>Plan:</strong> {subscription.plan}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(subscription.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(subscription.endDate).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>Loading...</p>
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

export default ViewSubscription;

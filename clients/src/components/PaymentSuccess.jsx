import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { API_URL } from "../lib/utils";

const PaymentSuccess = () => {
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reference = params.get("reference");
  const navigate = useNavigate();

  useEffect(() => {
    if (reference) {
      // Verify payment on the server
      const verifyPayment = async () => {
        try {
          const response = await fetch(
            "https://forex-trading-app-2.onrender.com/api/subscription/payment/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ reference }),
            }
          );

          const data = await response.json();
          if (response.ok) {
            setSubscriptionDetails(data.subscription);

            // Automatically navigate to the premium page after a delay
            console.log("Setting up redirection...");
            setTimeout(() => {
              console.log("Redirecting to premium page...");
              navigate("/course");
            }, 3000); // 3 seconds delay
          } else {
            alert("Payment verification failed.");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          alert("An error occurred while verifying payment.");
        }
      };

      verifyPayment();
    }
  }, [reference, navigate]);

  return (
    <div className="bg-[#f1f1f1] flex w-full h-screen items-center justify-center">
      <div className="text-[#008000] bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 shadow-md">
        <h1 className="text-3xl font-semibold text-[#fb0200]">
          Payment Successful
        </h1>
        {subscriptionDetails ? (
          <div className="mt-4">
            <p className="font-medium text-lg">Subscription Details:</p>
            <p>Plan: {subscriptionDetails.plan}</p>
            <p>
              Start Date:{" "}
              {new Date(subscriptionDetails.startDate).toLocaleDateString()}
            </p>
            <p>
              End Date:{" "}
              {new Date(subscriptionDetails.endDate).toLocaleDateString()}
            </p>
            <p>Status: {subscriptionDetails.status}</p>
          </div>
        ) : (
          <p>Loading subscription details...</p>
        )}
        <p className="mt-4">Redirecting to premium page shortly...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;

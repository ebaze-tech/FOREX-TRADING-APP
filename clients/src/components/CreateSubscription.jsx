import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { API_URL } from "../lib/utils";

const CreateSubscription = () => {
  const [plan, setPlan] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      // alert("Unauthorized.");
      setError("Unauthorized.");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!plan) {
      // alert("Please select a subscription plan.");
      setError("Please select a subscription plan.");
      return;
    }
    if (!agreeTerms) {
      // alert("Agreement to the terms and conditions is required.");
      setError("Agreement to the terms and conditions is required.");
      return;
    }

    try {
      const response = await fetch(
        "https://forex-trading-app-2.onrender.com/api/subscription/create/subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ plan }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Payment URL:", data.paymentUrl);
        window.location.href = data.paymentUrl;
      } else {
        setError(data.error || "Subscription creation failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl; // Redirect to Paystack for payment
      setPaymentUrl(paymentUrl);
    }
  }, [paymentUrl]);

  return (
    <div className="bg-[#f1f1f1] flex w-full h-screen">
      <div className="w-full flex items-center justify-center md:w-1/2">
        <div className="form text-[#008000] bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 shadow-md">
          <h1 className="text-5xl font-semibold text-[#fb0200]">
            Subscribe Now
          </h1>
          <p className="font-medium text-lg mt-4">
            Choose your subscription plan
          </p>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-8">
            <div>
              <label className="text-lg font-medium">Subscription Plan</label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                required
              >
                <option value="">Select a plan</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div className="mt-8 flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                />
                <label
                  htmlFor="agreeTerms"
                  className="ml-2 font-medium text-lg"
                >
                  I agree to terms and conditions
                </label>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <button
                type="submit"
                className="bg-[#fb0200] text-white font-bold text-lg py-3 rounded-xl active:scale-[.98] hover:bg-[#fb6000] duration-500 ease-in uppercase"
              >
                Subscribe
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
          alt="Subscription"
        />
      </div>
    </div>
  );
};

export default CreateSubscription;

import React from "react";
// import { API_URL } from "../lib/utils";

const DeleteSubscription = () => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        "https://forex-trading-app-iqbg.onrender.com/api/subscription/delete/subscription",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Subscription deleted successfully!");
      } else {
        alert(data.error || "Failed to delete subscription.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="bg-[#f1f1f1] flex w-full h-screen">
      <div className="w-full flex items-center justify-center md:w-1/2">
        <div className="form text-[#008000] bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 shadow-md">
          <h1 className="text-5xl font-semibold text-[#fb0200]">
            Delete Subscription
          </h1>
          <div className="mt-8">
            <button
              onClick={handleDelete}
              className="bg-[#fb0200] text-white font-bold text-lg py-3 rounded-xl active:scale-[.98] hover:bg-[#fb6000] duration-500 ease-in uppercase"
            >
              Delete Subscription
            </button>
          </div>
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

export default DeleteSubscription;

import React from "react";

const PaymentFailure = () => {
  return (
    <div className="bg-[#f1f1f1] flex w-full h-screen">
      <div className="w-full flex items-center justify-center">
        <div className="text-[#008000] bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 shadow-md">
          <h1 className="text-5xl font-semibold text-[#fb0200]">
            Payment Failed
          </h1>
          <p className="font-medium text-lg mt-4">
            Unfortunately, your payment was not successful. Please try again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../lib/utils";
import axios from "axios";

const PaymentCallback = () => {
//   const [trxref, setTrxref] = useState("");
  const [reference, setReference] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referenceValue = params.get("reference");

    console.log("Reference: ", referenceValue);

    // Handle the payment callback logic here
    const verifyPayment = async (reference) => {
      try {

        console.log("Verifying payment with reference:", reference);

        const response = await axios.post(
          `${API_URL}/api/subscription/payment/verify`,
          {
            reference: reference,
          }
        );

        console.log("Verification response:", response.data);

        if (response.data.success) {
          navigate("/payment/success?reference=" + reference);
        } else {
          navigate("/payment/failed");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        navigate("/payment/failed");
      }
    };

    if (referenceValue) {
    //   setTrxref(trxrefValue);
      setReference(referenceValue);
      verifyPayment(referenceValue);
    } else {
      setError("There was an error verifying the payment.");
      navigate("/payment/failed");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Payment Callback</h1>
      <p>
        Your payment was processed. Please wait while we verify the payment.
      </p>
      {/* <p>Transaction Reference: {trxref}</p> */}
      <p>Reference: {reference}</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PaymentCallback;

import React from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../lib/utils";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token"); // Remove token from storage
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-[#fb0200] text-white font-bold text-lg py-3 rounded-xl hover:bg-[#fb6000] duration-500 ease-in"
    >
      Logout
    </button>
  );
};

export default Logout;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../lib/utils";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/check`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          navigate("/login");
        }
      } catch (error) {
        setAuthenticated(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  return authenticated;
};

export default useAuth;

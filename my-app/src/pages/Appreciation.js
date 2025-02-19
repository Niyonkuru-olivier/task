import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Appreciation.css";

const Appreciation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to redirect the user after 60 seconds (60000ms)
    const timer = setTimeout(() => {
      navigate("/login");
    }, 60000);

    // Cleanup the timer if the component unmounts before the 60 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="appreciation-container">
      <div className="appreciation-message">
        <h1>Thank You for Creating an Account!</h1>
        <p>We appreciate you joining our platform and look forward to your engagement.</p>
        <p>You will be redirected to the login page shortly, or you can click the button below to proceed.</p>
        
        <button
          className="login-button"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Appreciation;

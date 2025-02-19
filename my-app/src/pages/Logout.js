import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css"; // Optionally add styles for this page

const Logout = () => {
  const navigate = useNavigate();

  // Use useEffect to redirect after a delay or you can use the button to navigate
  useEffect(() => {
    setTimeout(() => {
      navigate("/login"); // After 60 seconds or whenever needed, navigate to login page
    }, 600000); // 60000 ms = 600 seconds = 6minutes
  }, [navigate]);

  return (
    <div className="logout-container">
      <div className="logout-message">
        <h1>You have logged out</h1>
        <p>We hope to see you again soon!</p>
        <a href="/login"><button
          onClick={() => navigate("/login")} // Direct user to login immediately
          className="login-button"
        >
          Login Again
        </button></a>
      </div>
    </div>
  );
};

export default Logout;

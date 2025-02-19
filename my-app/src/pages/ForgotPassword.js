import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./ForgotPassword.css"; // Add your CSS styling

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Mock email submission (replace this with your actual backend logic)
    setMessage("If an account with that email exists, you will receive a password reset link shortly.");

    // Optionally redirect to login page after some time
    setTimeout(() => {
      navigate("/log-in");
    }, 3000);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2>Forgot Password?</h2>
        <p>Enter your email to reset your password.</p>
        
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <Button
            type="submit"
            label="Send Reset Link"
            className="submit-button"
          />
        </form>

        <p className="back-to-login">
          Remembered your password? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

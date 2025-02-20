import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const submitHandler = (data) => {
    console.log("Form submitted with data:", data);

    // For now, just simulate successful login
    const isLoginSuccessful = true; // Simulate a successful login condition
    if (isLoginSuccessful) {
      // Navigate to the dashboard after successful login
      navigate("/dashboard");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Welcome Back</h1>
        <p>Keep all your credentials safe</p>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="input-container">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              {...register("email", {
                required: "Email Address is required!",
              })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your Password"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          <span className="forgot-password">
            <a href="/forgotpassword">Forgot Password?</a>
          </span>
          <button type="submit" className="submit-button">Submit</button>
        </form>
        <p className="create-account">
          Don't have an account? <a href="/createaccount">Create Account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

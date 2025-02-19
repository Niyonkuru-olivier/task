import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios
import "./CreateAccount.css"; // Import the CSS file

const CreateAccount = () => {
  const navigate = useNavigate();

  // Use memoization to optimize the performance of password validation regex
  const passwordPattern = useMemo(() => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, []);

  // Set up the form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handler for form submission
  const submitHandler = async (data) => {
    console.log("Form submitted with data:", data);

    // Send a POST request to the backend to create an account
    try {
      const response = await axios.post('http://localhost:5000/users/CreateAccount', {
        email: data.email,
        password: data.password,
      });

      // Handle successful account creation and navigate to the login page
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      // Display error messages from the backend or a generic error message
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="create-account-container">
      <div className="create-account-form">
        <h1>Create Account</h1>
        <p>Sign up to manage your tasks and more</p>
        <form onSubmit={handleSubmit(submitHandler)}>
          {/* Email Input Field */}
          <div className="input-container">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              {...register("email", {
                required: "Email Address is required!",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address format",
                },
              })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          {/* Password Input Field */}
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
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: passwordPattern,
                  message:
                    "Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
                },
              })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>

        {/* Existing Account Link */}
        <p className="existing-account">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;

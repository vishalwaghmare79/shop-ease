import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  // State variables to store email and password input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Send a POST request to the login endpoint
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          email,
          password,
        }
      );
      if (res.data.success) {
        // If login is successful, show a success message and navigate to home
        toast.success(res.data.message);
        navigate("/");
      } else {
        // If login fails, show an error message
        toast.error(res.data.message || "Failed to sign in");
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="auth-page">
      <div className="form">
        <h1 className="form-title">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-div">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Email"
              required
            />
          </div>
          <div className="input-div">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="form-button">
            Sign In
          </button>
          <div>
            <p className="forgot-password">Forgot password?</p>
            <p className="form-link">
              Don't have an account?{" "}
              <span onClick={() => navigate("/Signup")} className="form-btn">
                <strong>Sign up</strong>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;

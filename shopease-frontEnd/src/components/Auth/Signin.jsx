import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          email,
          password,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message || "Failed to sign in");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
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
            <span onClick={() => navigate("/registerpage")} className="form-btn">
              <strong>Sign up</strong>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signin;

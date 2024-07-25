import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/signup`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/signin");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="form">
      <h1 className="form-title">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-div">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            placeholder="Name"
            required
          />
        </div>
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
        <div className="input-div">
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input"
            placeholder="Phone"
            required
          />
        </div>
        <div className="input-div">
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-input"
            placeholder="Address"
            required
          />
        </div>
        <button type="submit" className="form-button">
          Sign Up
        </button>
        <p className="form-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/loginpage")} className="form-btn">
            <strong>Sign in</strong>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;

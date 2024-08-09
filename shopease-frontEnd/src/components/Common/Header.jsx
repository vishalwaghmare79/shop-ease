import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const toggleOpen = () => {
    const navLinks = document.querySelector(".item-link");
    navLinks.classList.toggle("show");
  };

  return (
    <nav className="navigation-bar">
      <h1 className="logo">
        <NavLink to="/">Shop<span>Ease</span></NavLink>
      </h1>
      <div className="search-box">
        <input
          className="input-box"
          type="text"
          placeholder="Search products..."
        />
        <span className="search-icon">
          <i className="ri-search-2-line"></i>
        </span>
      </div>
      <div>
        <ul className="item-link">
          <li>
            <NavLink to="/Signup">Sign Up</NavLink>/
            <NavLink to="/Signin">Sign In</NavLink>
          </li>
          <li>
            <NavLink to="/wishlist">
              <i className="ri-heart-line"></i>
              <span className="navLink-icon-text">wishlist</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart">
              <i className="ri-shopping-bag-line"></i>
              <span className="navLink-icon-text">cart</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div onClick={toggleOpen} className="toggle-btn">
        <i className="ri-menu-3-line"></i>
      </div>
    </nav>
  );
}

export default Header;

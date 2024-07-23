import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const toggleOpen = () => {
    const navLinks = document.querySelector('.item-link');
    navLinks.classList.toggle('show');
  };

  return (
    <navbar className="navigation-bar">
      <h1 className="logo">Shop<span>Ease</span></h1>
      <div className="search-box">
        <input className="input-box" type="text" placeholder="Search products..." />
        <span className="search-icon"><i className="ri-search-2-line"></i></span>
      </div>
      <div>
        <ul className="item-link">
          <li><NavLink to="/signup">Sign Up</NavLink>/<NavLink to="/signin">Sign In</NavLink></li>
          <li><NavLink to="/wishlist"><i className="ri-heart-line"></i><span className="navLink-icon-text">wishlist</span></NavLink></li>
          <li><NavLink to="/cart"><i className="ri-shopping-bag-line"></i><span className="navLink-icon-text">cart</span></NavLink></li>
        </ul>
      </div>
      <div onClick={toggleOpen} className="toggle-btn">
        <i className="ri-menu-3-line"></i>
      </div>
    </navbar>
  );
}

export default Header;

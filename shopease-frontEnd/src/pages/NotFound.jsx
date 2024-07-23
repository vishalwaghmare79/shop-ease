import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div id="not-found-page">
      <div className="notfound-container">
        <h1 className="display-1">404</h1>
        <span className="notfound-sepreter-line"></span>
        <p className="lead">Page Not Found</p>
      </div>
      <Link to="/" className="btn btn-primary">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;

import React, { useContext } from "react";
import "../../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logoutUser();
    navigate("/register");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">American Airlines CBRO</span>
        </Link>
        <div className="ml-auto">
          <Link to="/help">
            <button className="btn btn-info">Help</button>
          </Link>
          {store.isAuthenticated ? (
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          ) : (
            <>
              <Link to="/register">
                <button className="btn btn-primary">Register</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

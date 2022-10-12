import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="main-header-container">
      <div className="nav-menu">
        <ul>
          <li>
            <NavLink className="nav-link" to="/home">
              User
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/add-user">
              Enter User
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;

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
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/a">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/b">
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/c">
              Order
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/admin/add-product">
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/d">
              Admin Product
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;

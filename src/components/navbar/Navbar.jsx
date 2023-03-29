import "./navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Space, Dropdown } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const location = pathname.split("/")[2];
  const { isAuth, userData, loggedOut } = useContext(AuthContext);
  const handleLogout = () => {
    loggedOut();
    return navigate("/auth/signin");
  };
  const items = [
    {
      label: <span onClick={handleLogout}>Logout</span>,
      key: "logout",
    },
    {
      label: <span>Your order</span>,
      key: "invoice",
    },
  ];
  return (
    <div className="navbar">
      <div className="navContainer">
        <Space className="logo">
          <FontAwesomeIcon
            icon={faHome}
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
            }}
          />
          Booking Website
        </Space>
        {!isAuth ? (
          <>
            <div className="navItems">
              <button
                className={`navButton ${location === "signup" ? "active" : ""}`}
                onClick={() => navigate("/auth/signup")}
              >
                Register
              </button>
              <button
                className={`navButton ${location === "signin" ? "active" : ""}`}
                onClick={() => navigate("/auth/signin")}
              >
                Login
              </button>
            </div>
          </>
        ) : (
          <div className="user-holder">
            <Dropdown menu={{ items }}>
              <Space>
                <span>{userData.fullName}</span>
                <FontAwesomeIcon icon={faCaretDown} />
              </Space>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

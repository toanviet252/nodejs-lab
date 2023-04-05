import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import { AuthContext } from "../../../contexts/AuthContext";

const AdminHeader = () => {
  const { userData, loggedOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    loggedOut();
    return navigate("/auth/signin");
  };

  return (
    <>
      <div className="admin-header">
        <span className="logo">Admin Page</span>
        <div className="user-holder">
          <Space>
            <span>{userData.fullName}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </Space>
        </div>
      </div>
    </>
  );
};
export default AdminHeader;

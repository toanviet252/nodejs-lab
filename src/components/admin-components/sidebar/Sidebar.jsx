import { React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faUser, faHotel, faRestroom, faRoad } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const SidebarMenu = () => {
  const items = [
    getItem("Dashboard", "dashboard", <FontAwesomeIcon icon={faDashboard} />),
    getItem("Users", "users", <FontAwesomeIcon icon={faUser} />),
    getItem("Hotels", "hotels", <FontAwesomeIcon icon={faHotel} />),
    getItem("Rooms", "rooms", <FontAwesomeIcon icon={faRestroom} />),
    getItem("Transactions", "transactions", <FontAwesomeIcon icon={faRoad} />),
  ];
  const navigate = useNavigate();
  return (
    <aside className="admin-sidebar" style={{ backgroundColor: "#003580" }}>
      <Menu
        mode="inline"
        theme="light"
        items={items}
        defaultSelectedKeys={["dashboard"]}
        onClick={({ _, key }) => navigate(`/admin/${key}`)}
        style={{
          backgroundColor: "#003580",
          color: "white",
        }}
      />
      
    </aside>
  );
};

export default SidebarMenu;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faWallet, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";

export const DashboardItem = [
  {
    title: "Users",
    key: "user",
    count: 0,
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    title: "Orders",
    key: "order",
    count: 0,
    icon: <FontAwesomeIcon icon={faCartShopping} />,
  },
  {
    title: "Earnings ($)",
    key: "earning",
    count: 0,
    icon: <FontAwesomeIcon icon={faWallet} />,
  },
  {
    title: "Balance ($)",
    key: "balance",
    count: 0,
    icon: <FontAwesomeIcon icon={faMoneyCheckDollar} />,
  },
];

/* eslint-disable */
import "./dashboard.css";
import React, { useEffect, useState } from "react";
import { DashboardItem } from "../../../constants/admin";
import { getDashboarData } from "../../../apis/api";
import TransactionTable from "../transactions/transaction table/TransTable";

const Dashboard = () => {
  const [dashboardItems, setDashboardItems] = useState(DashboardItem);
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchDashboarData = async () => {
    setLoading(true);
    try {
      const res = await getDashboarData();
      const data = res.data.data;
      setTransactionData(res.data.data.lastestTransactions);
      setDashboardItems((pre) => {
        const newData = pre.map((item) => {
          return {
            ...item,
            count: data[item.key],
          };
        });
        return newData;
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboarData();
  }, []);
  // console.log(transactionData);
  return (
    <>
      <div className="dashboard-container">
        {dashboardItems.map((item) => {
          return (
            <div className="dashboard-item" key={item.key}>
              <span>{item.title}</span>
              <span>{item.count}</span>
              {item.icon}
            </div>
          );
        })}
      </div>

      <div className="table-container">
        <h3>Lastest Transaction</h3>
        <div style={{ margin: "1rem" }}>
          <TransactionTable data={transactionData} loading={loading} />
        </div>
      </div>
    </>
  );
};
export default Dashboard;

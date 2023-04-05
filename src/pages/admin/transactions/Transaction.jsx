import { useCallback, useEffect, useState } from "react";
import { getAllTransactions } from "../../../apis/api";
import TransactionTable from "./transaction table/TransTable";
import { message } from "antd";

const Transaction = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchTransData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllTransactions();
      setTransactionsData(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      message.error(err.response.data.message || err.message);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchTransData();
  }, []);
  return (
    <>
      <h3>Transaction List</h3>
      <TransactionTable data={transactionsData} loading={loading} />
    </>
  );
};
export default Transaction;

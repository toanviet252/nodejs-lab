import { useCallback, useEffect, useState } from "react";
import { getAllTransactions } from "../../../apis/api";
import TransactionTable from "./transaction table/TransTable";

const Transaction = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchTransData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllTransactions();
      console.log(res);
      setTransactionsData(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchTransData();
  }, []);
  return <TransactionTable data={transactionsData} loading={loading} />;
};
export default Transaction;

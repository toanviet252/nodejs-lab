import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../apis/api";
/* eslint-disable */
const User = () => {
  const [dataUser, setDataUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchDataUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      setDataUser(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataUsers();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, record) => <Tag color={record.isAdmin ? "green" : "blue"}>{record.isAdmin ? "Admin" : "User"}</Tag>,
    },
  ];
  return (
    <>
      <h3>Users List</h3>
      <Table dataSource={dataUser} columns={columns} rowKey="id" loading={loading} />
    </>
  );
};

export default User;

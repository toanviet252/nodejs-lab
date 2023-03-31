import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getAllBookings } from "../../apis/api";
import { Space, Table, Tag } from "antd";
import { formatTime } from "../../helpers/formatTime";
import "./style.css";

const BookingTransaction = () => {
  const { userData } = useContext(AuthContext);
  const userId = userData.id;
  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllBookings = async () => {
    setLoading(true);
    if (!userId) return;
    try {
      const res = await getAllBookings(userId);
      setDataTable(res.data.transactions);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllBookings();
  }, [userId]);
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Hotel",
      dataIndex: "hotel",
      key: "hotel",
      render: (value) => {
        return <span>{value.name}</span>;
      },
    },
    {
      title: "Rooms",
      dataIndex: "rooms",
      key: "rooms",
      render: (_, record) => {
        return (
          <Space>
            {record.rooms.map((room) => {
              return (
                <Tag key={room.id} color="#003580">
                  {room.id.title}/({room.quantity})
                </Tag>
              );
            })}
          </Space>
        );
      },
    },
    {
      title: "Date",
      key: "date",
      render: (_, record) => {
        return (
          <span>
            {formatTime(record.dateStart)} to {formatTime(record.dateEnd)}
          </span>
        );
      },
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) => {
        return <Tag color={value === "Booked" ? "green" : "blue"}>{value}</Tag>;
      },
    },
  ];
  return (
    <>
      <Navbar />
      <div className="transaction-container" style={{ minHeight: "50vh", margin: "2rem" }}>
        <h3>Your transactions:</h3>
        <Table dataSource={dataTable} columns={columns} rowKey="id" loading={loading} />
      </div>
      <Footer />
    </>
  );
};
export default BookingTransaction;

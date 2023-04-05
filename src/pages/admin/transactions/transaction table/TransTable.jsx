import { Table, Tag } from "antd";
import { formatTime } from "../../../../helpers/formatTime";

const TransactionTable = ({ data, loading }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (_, record) => {
        return <span>{record.user.fullName}</span>;
      },
    },
    {
      title: "Hotel",
      dataIndex: "hotel",
      key: "hotel",
      render: (_, record) => {
        return <span>{record.hotel.name}</span>;
      },
    },
    {
      title: "Room",
      dataIndex: "rooms",
      key: "rooms",
      render: (_, record) => {
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {record.rooms.map((room) => {
              return (
                <Tag color="#003580" key={room.id._id} style={{ textAlign: "center" }}>
                  {room.id.title}
                </Tag>
              );
            })}
          </div>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
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
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) => <Tag color={value === "Booked" ? "green" : "blue"}>{value}</Tag>,
    },
  ];
  return <Table dataSource={data} columns={columns} rowKey="id" loading={loading} />;
};
export default TransactionTable;

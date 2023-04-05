import { Button, Form, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { addRoom, deleteAPI, deleteRoom, getAllRooms, updateRoom } from "../../../apis/api";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoomForm from "./AddRoomForm/RoomForm";

const Room = () => {
  const [dataRooms, setDataRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [roomId, setRoomId] = useState(undefined);
  const [form] = Form.useForm();

  const fetchDataRooms = async () => {
    setLoading(true);
    try {
      const res = await getAllRooms();
      setDataRooms(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataRooms();
  }, []);

  const handleAddOrEditRoom = () => {
    form.validateFields().then(async (values) => {
      setConfirmLoading(true);
      try {
        if (!isEdit) {
          const res = await addRoom(values);
          await fetchDataRooms();
          message.success(res.data?.message);
          setOpen(false);
        } else {
          const res = await updateRoom(roomId, values);
          await fetchDataRooms();
          message.success(res.data?.message);
          setOpen(false);
        }
      } catch (err) {
        message.error(err.response.data.message || err.message);
      } finally {
        setConfirmLoading(false);
      }
    });
  };
  const onAddRoom = () => {
    setIsEdit(false);
    setRoomId(undefined);
    form.resetFields();
    setOpen(true);
  };
  const onEditRoom = (record) => {
    setIsEdit(true);
    setRoomId(record._id);
    form.setFieldsValue(record);
    setOpen(true);
  };

  const handleDeleteRoom = (id) => {
    deleteAPI(id, deleteRoom, fetchDataRooms);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      ellipsis: true,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Max People",
      dataIndex: "maxPeople",
      key: "maxPeople",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            <button className="action-btn">
              <FontAwesomeIcon icon={faPenToSquare} onClick={() => onEditRoom(record)} />
            </button>
            <button className="action-btn" onClick={() => handleDeleteRoom(record._id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <h3>Rooms List</h3>
      <Button type="primary" onClick={onAddRoom}>
        Add Room
      </Button>
      <RoomForm
        isEdit={isEdit}
        form={form}
        onFinish={handleAddOrEditRoom}
        open={open}
        setOpen={setOpen}
        confirmLoading={confirmLoading}
      />

      <Table dataSource={dataRooms} columns={columns} rowKey="id" loading={loading} />
    </>
  );
};

export default Room;

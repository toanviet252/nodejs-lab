import { Button, Form, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
/* eslint-disable */
import { addHotel, deleteAPI, deleteHotel, getAllAdminHotels, updateHotel } from "../../../apis/api";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HotelForm from "./AddHotelForm/HotelForm";
import "./style.css";

const Hotel = () => {
  const [dataHotels, setDataHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [hotelId, setHotelId] = useState(undefined);
  const [form] = Form.useForm();
  const fetchDataHotels = async () => {
    setLoading(true);
    try {
      const res = await getAllAdminHotels();
      setDataHotels(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataHotels();
  }, []);

  // CRUD

  const handleAddOrEditHotel = () => {
    form.validateFields().then(async (values) => {
      setConfirmLoading(true);
      const rooms = values.rooms ?? [];
      try {
        if (!isEdit) {
          const res = await addHotel({ ...values, rooms });
          if (res.status !== 201) throw new Error("Add hotel falied");
          await fetchDataHotels();
          setOpenForm(false);
          message.success(res.data.message);
        } else {
          const res = await updateHotel(hotelId, { ...values, rooms });
          await fetchDataHotels();
          setOpenForm(false);
          message.success(res.data.message);
        }
      } catch (err) {
        message.error(err.response?.data?.message || err.message);
      } finally {
        setConfirmLoading(false);
      }
    });
  };
  const onAddHotel = () => {
    setIsEdit(false);
    setHotelId(undefined);
    form.resetFields();
    setOpenForm(true);
  };
  const onEditHotel = (data) => {
    setIsEdit(true);
    const price = +data.price;
    setHotelId(data._id);
    form.setFieldsValue({ ...data, price });
    setOpenForm(true);
  };

  const handleDeleteHotel = (id) => {
    deleteAPI(id, deleteHotel, fetchDataHotels);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      // ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            <button className="action-btn">
              <FontAwesomeIcon icon={faPenToSquare} onClick={() => onEditHotel(record)} />
            </button>
            <button className="action-btn" onClick={() => handleDeleteHotel(record._id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <h3>Hotels List</h3>

      <Button type="primary" onClick={onAddHotel}>
        Add Hotel
      </Button>
      <HotelForm
        form={form}
        isEdit={isEdit}
        open={openForm}
        setOpen={setOpenForm}
        onFinish={handleAddOrEditHotel}
        confirmLoading={confirmLoading}
        hotelId={hotelId}
      />

      <Table dataSource={dataHotels} columns={columns} rowKey="id" loading={loading} />
    </>
  );
};

export default Hotel;

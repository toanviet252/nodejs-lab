import { Form, Input, Modal, Select } from "antd";
import { useCallback, useEffect, useState } from "react";
import { getAllRooms } from "../../../../apis/api";

const HotelForm = ({ isEdit, form, open, setOpen, onFinish, confirmLoading, hotelId }) => {
  const options = [
    {
      label: "yes",
      value: true,
    },
    {
      label: "no",
      value: false,
    },
  ];
  const [roomOptions, setRoomOptions] = useState([]);
  const fetchRoomsData = useCallback(async () => {
    try {
      const res = await getAllRooms({ hotelId });
      // console.log(res);
      const data = res.data.data.map((room) => {
        return {
          label: room.title,
          value: room._id,
        };
      });
      setRoomOptions(data);
    } catch (err) {
      console.log(err);
    }
  }, [hotelId]);
  useEffect(() => {
    if (open) {
      fetchRoomsData();
    }
  }, [open]);
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      onOk={onFinish}
      title={isEdit ? "Edit hotel" : "Add Hotel"}
      className="hotel-modal-container"
      confirmLoading={confirmLoading}
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <div className="hotel-form-container">
          <div className="left-form-container">
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="City" name="city" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Distance from City Center (km)" name="distance" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Description" name="desc" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Images" name="photos" rules={[{ required: true }]}>
              <Select mode="tags" />
            </Form.Item>
          </div>

          <div className="right-form-container">
            <Form.Item label="Type" name="type" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Cheapest Price ($)" name="cheapestPrice" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Featured" name="featured" rules={[{ required: true }]}>
              <Select options={options} />
            </Form.Item>
          </div>
        </div>

        {isEdit && (
          <Form.Item name="rooms" label="Rooms">
            <Select mode="multiple" options={roomOptions} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
export default HotelForm;

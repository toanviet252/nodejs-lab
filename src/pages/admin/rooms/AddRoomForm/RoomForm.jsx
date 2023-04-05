import { Form, Input, Modal, Select } from "antd";
import { useCallback, useEffect, useState } from "react";
import { getAllAdminHotels } from "../../../../apis/api";

const RoomForm = ({ isEdit, form, open, setOpen, onFinish, confirmLoading }) => {
  const [hotelOptions, setHotelOptions] = useState([]);

  const fetchHotelsData = useCallback(async () => {
    try {
      const res = await getAllAdminHotels();
      const data = res.data.data.map((hotel) => {
        return {
          label: hotel.name,
          value: hotel._id,
        };
      });
      setHotelOptions(data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    if (open) {
      fetchHotelsData();
    }
  }, [open]);
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      onOk={onFinish}
      title={isEdit ? "Edit Room" : "Add Room"}
      className="hotel-modal-container"
      confirmLoading={confirmLoading}
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <div className="hotel-form-container">
          <div className="left-form-container">
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Price" name="price" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </div>

          <div className="right-form-container">
            <Form.Item label="Description" name="desc" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Max People" name="maxPeople" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </div>
        </div>

        <Form.Item name="hotel" label="Hotels" rules={[{ required: true }]}>
          <Select options={hotelOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default RoomForm;

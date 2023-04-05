import { DateRange } from "react-date-range";
import { useState } from "react";
import { Button, Checkbox, Form, Input, message, Select } from "antd";
import "./booking.css";
import CheckboxRoom from "./checbox/checkbox";
import { useMemo } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { createBooking } from "../../apis/api";
import { useNavigate } from "react-router-dom";

const Booking = ({ hotelData }) => {
  const { userData } = useContext(AuthContext);
  const userId = userData.id;
  const navigate = useNavigate();
  const aDay = 24 * 60 * 60 * 1000;
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [form] = Form.useForm();

  // Calulate room price
  const [rooms, setRooms] = useState([]);
  const [rentDay, setRenDay] = useState(1);

  const price = useMemo(() => {
    const roomPrice = rooms.map((room) => room.price * room.quantity).reduce((acc, cur) => acc + cur, 0);
    return rentDay * roomPrice;
  }, [rooms, rentDay]);

  const handleCheckboxChange = (checkedRooms) => {
    setRooms((pre) =>
      checkedRooms.map((room) => {
        return {
          ...room,
          quantity: pre.find(({ _id }) => _id === room._id)?.quantity || 0,
        };
      })
    );
  };

  const handleQuantityChange = (roomId, event) => {
    const updatedRooms = [...rooms];
    const roomIndex = updatedRooms.findIndex((room) => room._id === roomId);
    if (roomIndex !== -1) {
      updatedRooms[roomIndex].quantity = +event.target.value;
      setRooms(updatedRooms);
    }
  };

  const handleSubmitForm = () => {
    form.validateFields().then(async (values) => {
      console.log(userId);
      try {
        const res = await createBooking({ ...values, hotel: hotelData._id, rooms, user: userId, price });
        if (res.status !== 200) throw new Error("Booked fail");
        message.success("You have successfully booked your hotels");
        return navigate("/transactions");
      } catch (err) {
        console.log(err);
        message.error(err.response.data.message || err.message);
      }
    });
  };
  return (
    <div className="bookingWrapper">
      <div className="date-container">
        <span className="booking-title">Dates</span>
        <Form form={form}>
          <Form.Item name="dateOrder" getValueFromEvent={(e) => e.selection} rules={[{ required: true }]}>
            <DateRange
              minDate={new Date()}
              onChange={(item) => {
                setDate([item.selection]);
                setRenDay((item.selection.endDate.getTime() - item.selection.startDate.getTime()) / aDay + 1);
              }}
              ranges={date}
            />
          </Form.Item>
        </Form>
      </div>
      <div className="form-container" style={{ width: "60%" }}>
        <span className="booking-title">Reserve Info</span>
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item label="Your Fullname" name="fullname" rules={[{ required: true }]}>
            <Input placeholder="Fullname" />
          </Form.Item>
          <Form.Item label="Your Email" name="email" rules={[{ required: true }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Your Phone Number" name="phoneNumber" rules={[{ required: true }]}>
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item label="Your Identity Card Number" name="identityCardNumber" rules={[{ required: true }]}>
            <Input placeholder="Identity Card Number" />
          </Form.Item>
        </Form>
      </div>

      <div className="room-select-container" style={{ width: "100%" }}>
        <span className="booking-title">Select room</span>
        <div className="room-container">
          <Form form={form} style={{ width: "100%" }}>
            <Form.Item name="rooms" rules={[{ required: true }]}>
              <Checkbox.Group
                onChange={(rooms) => {
                  handleCheckboxChange(rooms);
                }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                {hotelData.rooms.length > 0 &&
                  hotelData.rooms.map((room) => {
                    return (
                      <CheckboxRoom
                        room={room}
                        handleQuantityChange={handleQuantityChange}
                        date={date}
                        key={room._id}
                      />
                    );
                  })}
              </Checkbox.Group>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="price-payment">
        <span className="booking-title">Total Bill: {price} $</span>
        <Form form={form}>
          <Form.Item name="paymentMethod" rules={[{ required: true }]}>
            <Select
              options={[
                {
                  label: "Credit Card",
                  value: "creditCard",
                },
                {
                  label: "Cash",
                  value: "cash",
                },
              ]}
              style={{ width: "200px" }}
              placeholder={<span style={{ color: "black" }}>Select Payment method</span>}
            />
          </Form.Item>
        </Form>
        <Button type="primary" htmlType="submit" onClick={handleSubmitForm}>
          Resever Now
        </Button>
      </div>
    </div>
  );
};
export default Booking;

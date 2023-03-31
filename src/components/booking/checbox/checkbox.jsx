import { useState } from "react";
import { Input, Checkbox } from "antd";
import { useMemo } from "react";

const CheckboxRoom = ({ room, handleQuantityChange, date }) => {
  const [checked, setChecked] = useState(false);
  const [quantityInput, setQuantityInput] = useState(0);
  useMemo(() => {
    if (!checked) {
      setQuantityInput(0);
    }
  }, [checked]);
  return (
    <Checkbox value={room} key={room._id} style={{ width: "45%" }} onChange={(e) => setChecked(e.target.checked)}>
      <div className="double-room">
        <span className="room-title">{room.title}</span>
        <p>
          Pay nothing until{" "}
          <em>
            <strong>{date[0].startDate.toDateString()}</strong>
          </em>
        </p>
        <p>
          Max people: <strong>{room.maxPeople}</strong>
        </p>
        <p>
          Price: <strong>{room.price} $</strong>
        </p>
      </div>

      <Input
        type="number"
        min={0}
        placeholder="Quantity"
        name={`${room._id}-quantity`}
        onChange={(e) => {
          handleQuantityChange(room._id, e);
          setQuantityInput(e.target.value);
        }}
        disabled={!checked}
        value={quantityInput}
      />
    </Checkbox>
  );
};
export default CheckboxRoom;

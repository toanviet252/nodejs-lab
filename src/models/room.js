import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roomNumbers: [
    {
      type: Schema.Types.UUID,
    },
  ],
});
export default mongoose.model("Room", roomSchema);

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
  dateStart: {
    type: Schema.Types.Date,
    required: true,
  },
  dateEnd: {
    type: Schema.Types.Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Transaction", transactionSchema);

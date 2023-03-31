import mongoose from "mongoose";
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
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
        id: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Room",
        },
        quantity: {
          type: Number,
          required: true,
        },
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
    phoneNumber: {
      type: String,
      required: true,
    },
    identityCardNumber: {
      type: String,
      reuquired: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Transaction", transactionSchema);

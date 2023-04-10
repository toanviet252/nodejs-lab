import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  totalPrice: {
    type: Number,
    required: true,
  },
  userOrder: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  status: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Order", OrderSchema);

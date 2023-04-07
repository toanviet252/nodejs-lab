import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    photos: [],
    name: {
      type: String,
      required: true,
    },
    long_desc: {
      type: String,
      required: true,
    },
    short_desc: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Product", ProductSchema);

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    photos: [],
    desc: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    featured: {
      type: String,
    },
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    cheapestPrice: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Hotel", hotelSchema);
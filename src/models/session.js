import mongoose from "mongoose";
import { Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    expires: {
      type: Date,
      required: true,
    },
    _id: {
      type: String,
      required: true,
    },
    session: {
      cookie: {
        originalMaxAge: {
          type: Number,
          required: true,
        },
        expires: {
          type: Date,
          required: true,
        },
        secure: {
          type: Object,
          default: null,
        },
        httpOnly: {
          type: Boolean,
          default: true,
        },
        domain: {
          type: String,
          default: null,
        },
        path: {
          type: String,
          default: "/",
        },
        sameSite: {
          type: String,
          default: null,
        },
      },
      isLoggedIn: {
        type: Boolean,
        default: false,
      },
      user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      chatroom: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Chatroom",
      },
    },
  },
  {
    timestamps: true,
    collection: "session",
  }
);

export default mongoose.model("Session", sessionSchema);

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatroomSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
      {
        message: {
          type: String,
          required: true,
        },
        sender: {
          role: {
            type: String,
            enum: ["user", "admin", "moderator"],
            required: true,
          },
          _id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
          },
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("chatroom", chatroomSchema);

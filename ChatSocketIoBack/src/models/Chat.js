const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    members: Array,
    isChatRoom: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);
const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;

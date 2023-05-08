const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  { chatId: String, senderId: String, text: String },
  { versionKey: false }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;

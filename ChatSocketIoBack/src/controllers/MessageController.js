const Message = require("../models/Message");
const Chat = require("../models/Chat");
//create message
const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const chat = await Chat.findById(chatId);
  const chatMembers = chat.members;
  const isSenderIn = chatMembers.filter((c) => c === senderId);
  if (!isSenderIn.length)
    return res
      .status(400)
      .send("error, is not the correct sender in this conversation");
  const message = new Message({ chatId, senderId, text });
  try {
    const response = await message.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//get Message
const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  try {
    await Message.findByIdAndDelete(messageId);
    res.status(200).send("The message has been deleted.");
  } catch (error) {}
};

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
};

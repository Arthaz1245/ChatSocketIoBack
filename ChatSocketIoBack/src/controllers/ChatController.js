const Chat = require("../models/Chat");
const Message = require("../models/Message");
//createChat
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (chat) return res.status(200).json(chat);
    const newChat = new Chat({
      members: [firstId, secondId],
    });
    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//findUserChats
const findUserChats = async (req, res) => {
  const { userId } = req.params;
  try {
    const chats = await Chat.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//findChats
const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const deleteChat = async (req, res) => {
  const { chatId } = req.params;
  try {
    // Delete messages associated with the chatId
    await Message.deleteMany({ chatId });
    // Delete the chat
    await Chat.findByIdAndDelete(chatId);
    res.status(200).send("Chat and associated messages deleted successfully.");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  createChat,
  findUserChats,
  findChat,
  deleteChat,
};

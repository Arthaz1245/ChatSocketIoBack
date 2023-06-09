const Message = require("../models/Message");
const { uploadImage, deleteImage } = require("../utils/Cloudinary");

const fs = require("fs-extra");
const createMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;

    const message = new Message({
      chatId,
      senderId,
      text,
    });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      message.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.image.tempFilePath);
    }

    const response = await message.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

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
    const message = await Message.findByIdAndDelete(messageId);

    if (Message.image?.public_id) {
      await deleteImage(message.image?.public_id);
    }
    res.status(200).json("The message has been deleted.");
  } catch (error) {}
};

module.exports = {
  createMessage,
  getMessages,
  deleteMessage,
};

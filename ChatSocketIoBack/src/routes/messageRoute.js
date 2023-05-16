const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/MessageController");
router.post("/", createMessage);
router.delete("/:messageId", deleteMessage);
router.get("/:chatId", getMessages);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createChat,
  findUserChats,
  findChat,
  deleteChat,
} = require("../controllers/ChatController");
router.post("/", createChat);
router.delete("/:chatId", deleteChat);
router.get("/:userId", findUserChats);
router.get("/find/:firstId/:secondId", findChat);
module.exports = router;

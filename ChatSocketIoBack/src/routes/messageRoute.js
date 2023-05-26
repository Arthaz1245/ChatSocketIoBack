const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const {
  createMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/MessageController");

router.post(
  "/",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  createMessage
);
router.delete("/:messageId", deleteMessage);
router.get("/:chatId", getMessages);

module.exports = router;

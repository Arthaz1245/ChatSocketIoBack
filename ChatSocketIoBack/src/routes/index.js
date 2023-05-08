const express = require("express");
const router = express.Router();
const chats = require("./chatRoute");
const users = require("./userRoute");
const messages = require("./messageRoute");
router.use("/users", users);
router.use("/chats", chats);
router.use("/messages", messages);
module.exports = router;

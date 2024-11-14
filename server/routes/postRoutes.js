const express = require("express");
const postController = require("../controllers/postController.js")

const postRouter = express.Router();
postRouter.post("/", () => postController.getUserLikes(1));

module.exports = postRouter;

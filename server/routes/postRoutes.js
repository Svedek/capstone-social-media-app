const express = require("express");
const registerController = require("../controllers/postController.js")

const registerRouter = express.Router();
registerRouter.post("/", registerController.createUser);

module.exports = registerRouter;
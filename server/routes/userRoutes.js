const express = require("express");
const userController = require("../controllers/userController.js")

const userRouter = express.Router();
userRouter.get("/getUserById", userController.getUserById);

module.exports = userRouter;
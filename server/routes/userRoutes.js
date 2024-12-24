const express = require("express");
const userController = require("../controllers/userController.js")

const userRouter = express.Router();
userRouter.post("/getUserById", userController.getUserById);
userRouter.post("/getUserByEmail", userController.getUserByEmail);

module.exports = userRouter;
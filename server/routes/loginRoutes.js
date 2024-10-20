const express = require("express");
const loginController = require("../controllers/loginController.js")

const loginRouter = express.Router();
loginRouter.post("/", loginController.authenticateUser);

module.exports = loginRouter;
const express = require("express");
const profileController = require("../controllers/editProfileController.js");

const profileRouter = express.Router();
profileRouter.get("/", profileController.getUserInfo);
profileRouter.post("/edit", profileController.updateUser);

module.exports = profileRouter;
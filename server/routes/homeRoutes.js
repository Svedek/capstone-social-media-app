const express = require("express");

const homeRouter = express.Router();
homeRouter.get("/", (req, res) => {
    res.send({userID: req.session.userID});
});

module.exports = homeRouter;
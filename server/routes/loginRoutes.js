const express = require("express");
const passport = require("passport");
const { getUserByLoginId } = require("../database/database");

const loginRouter = express.Router();
const logoutRouter = express.Router();

loginRouter.post("/", (req, res, next) => {
    passport.authenticate("local", async (err, login_info) => {
        if (login_info) {
            let user = await getUserByLoginId(login_info.id);
            user = user[0];
            req.logIn(user, () => {
                return res.json({ auth: true });
            });
        }
        else {
            return res.json({ auth: false });
        }
    })(req, res, next);
});

logoutRouter.post("/", (req, res) => {
    req.logout(() => {
        return res.json();
    });
});

module.exports = { loginRouter, logoutRouter };
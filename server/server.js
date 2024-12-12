const express = require("express");
const cors = require("cors");
const { loginRouter, logoutRouter } = require("./routes/loginRoutes.js");
const registerRouter = require("./routes/registerRoutes.js");
const postRouter = require("./routes/postRoutes.js");
const homeRouter = require("./routes/homeRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "secret",
    resave: false,
    saveUnintialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));
require("./authenticate/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/register", registerRouter);
app.use("/post", postRouter);
app.use("/home", homeRouter);
app.use("/user", userRouter);
app.use(express.static("build"));
app.use(cookieParser());

app.get("/session", (req, res) => {
    if (req.isAuthenticated()) {
        const user = {
            user_id: req.user.id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            major: req.user.major,
            bio: req.user.bio,
            join_date: req.user.join_date,
        };
        return res.json({ auth: true, user: user });
    }
    else {
        return res.json({ auth: false, user: null });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server started"));

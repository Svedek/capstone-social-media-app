const express = require("express");
const cors = require("cors");
const loginRouter = require("./routes/loginRoutes.js");
const registerRouter = require("./routes/registerRoutes.js");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
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
        maxAge: 1000000
    }
}));
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use(express.static("build"));
app.use(cookieParser());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server started"));

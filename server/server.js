const express = require("express");
const cors = require("cors");
const loginRouter = require("./routes/loginRoutes.js");
const registerRouter = require("./routes/registerRoutes.js");
const app = express();

const db = require("./database/dabase.js");
console.log(getLoginInfo("fake@email.com"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use(express.static("build"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server started"));

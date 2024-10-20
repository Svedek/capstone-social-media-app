const db = require("../database/database.js");

const authenticateUser = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    response = await db.getLoginInfo(email);
    user = response[0];
    if (user.password != pass) {
        res.send({auth: false});
    }
    else {
        res.send({auth: true});
    }
}

module.exports = { authenticateUser };
const db = require("../database/database.js");

const authenticateUser = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    response = await db.getLoginInfo(email);
    login = response[0];
    if (login.password != pass) {
        res.send({auth: false});
    }
    else {
        const user = await db.getUser(email);
        const userID = user[0].id;
        req.session.userID = userID;
        console.log(req.session.userID);
        res.send({auth: true, userID: userID});
    }
}

module.exports = { authenticateUser };
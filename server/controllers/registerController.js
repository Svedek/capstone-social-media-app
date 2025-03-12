const db = require("../database/database.js");
const { generatePassword } = require("../authenticate/password.js");

const createUser = async (req, res) => {
    const major = req.body.major;
    const email = req.body.email;
    const pass = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const joinDate = new Date();
    let errorMessage = "";
    let created = false;
    if ((await db.getLoginInfo(email)).length > 0) {
        errorMessage = "email already exists";
    }
    else if (email.split("@")[1] != "uwm.edu") {
        errorMessage = "must use a uwm email address";
    }
    else {
        const { salt, hash } = generatePassword(pass);
        const loginID = await db.addLoginInfo(email, hash, salt);
        const userID = await db.addUser(loginID, major, firstName, lastName, joinDate);
        created = true;
    }
    res.send({created: created, errorMessage: errorMessage});
}

module.exports = { createUser };
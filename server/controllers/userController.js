const db = require("../database/database.js");

const getUserById = (req, res) => {
    const id = req.body.userId;
    const rows = db.getUserById(id);
    const user = rows[0];
    return user;
};

module.exports = { getUserById };
const db = require("../database/database.js");

const getUserById = async (req, res) => {
    const id = req.body.userId;
    const rows = await db.getUserById(id);
    const user = rows[0];
    let result = null;
    let errorMessage = '';

    if (user) {
        result = user;
    } else {
        errorMessage = 'User not found';
    }
    
    res.send({result: user, errorMessage: errorMessage});
};

const getUserByEmail = async (req, res) => {
    const email = req.body.email;
    const rows = await db.getUserByEmail(email);
    const user = rows[0];
    let result = null;
    let errorMessage = '';

    if (user) {
        result = user;
    } else {
        errorMessage = `User not found with email: ${email}`;
    }
    
    res.send({result: user, errorMessage: errorMessage});
};

module.exports = { getUserById, getUserByEmail };
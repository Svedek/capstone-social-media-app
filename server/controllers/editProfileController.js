const db = require("../database/database.js");

const updateUser = async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const major = req.body.major;
    const bio = req.body.bio;
    const userId = req.body.userId;
    db.updateUserDetails(firstName, lastName, major, bio, userId);
};

// const getUserInfo = async (req, res) => {
//     const userId = req.body.userId;
//     // get firstName
//     // get lastName
//     // get email
//     // get major
//     // get bio
//     // get joinDate
// };

module.exports = { updateUser };
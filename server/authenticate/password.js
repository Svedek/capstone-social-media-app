const crypto = require("crypto");

const generatePassword = (password) => {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

    return { salt: salt, hash: hash };
};

const validatePassword = (password, hash, salt) => {
    const verify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return verify == hash;
}

module.exports = { generatePassword, validatePassword };
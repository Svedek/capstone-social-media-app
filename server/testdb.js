const db = require("./database/database.js");
const pw = require("./authenticate/password.js");

const password = "tostada";
const { salt, hash } = pw.generatePassword(password);

db.getLoginInfo("user@uwm.edu").then(user => {
    // console.log(user[0]);
    const valid = pw.validatePassword("pass", user[0].hash, user[0].salt);
    console.log(valid);
});

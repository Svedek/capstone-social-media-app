const db = require("./database.js");

db.addLoginInfo("test@uwm.edu", "pass").then(res => {
    // console.log(res);
    db.addUser("test", "cs", res);
});
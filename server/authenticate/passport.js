const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../database/database.js");
const { validatePassword } = require("./password.js");

const customFields = {
    usernameField: "email",
    passwordField: "password"
};

passport.use(new LocalStrategy(customFields, async (username, password, done) => {
    const data = await db.getLoginInfo(username);
    const user = data[0];
    if (!user) {
        console.log("invalid");
        return done(null, false);
    }
    const valid = validatePassword(password, user.hash, user.salt);
    if (!valid) {
        console.log("invalid");
        return done(null, false);
    }
    console.log("valid");
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser(async (userId, done) => {
    const rows = await db.getUserById(userId);
    const user = rows[0];
    done(null, user);
});
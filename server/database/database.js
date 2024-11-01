const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
}).promise();

async function getLoginInfo(email) {
    const query = `SELECT * FROM login_info WHERE email = ?`;
    const [rows] = await pool.query(query, [email]);
    return rows;
}

async function getUser(email) {
    const loginInfo = await getLoginInfo(email);
    if (loginInfo.length < 1) {
        return [];
    }
    else {
        const query = `SELECT * FROM user WHERE login_info = ?`;
        const [rows] = await pool.query(query, [loginInfo[0].id]);
        return rows;
    }
}

async function addLoginInfo(email, password) {
    const query = `INSERT INTO login_info (email, password) VALUES (?, ?)`;
    await pool.query(query, [email, password]);
    const login_info = await getLoginInfo(email);
    return login_info[0].id;
}

async function addUser(email, major, loginID) {
    const query = `INSERT INTO user (major, login_info) VALUES (?, ?)`;
    await pool.query(query, [major, loginID]);
    const user = await getUser(email);
    return user[0].id;
}

module.exports = { getLoginInfo, getUser, addLoginInfo, addUser };
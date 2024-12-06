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

async function getLoginInfoById(id) {
    const query = `SELECT * FROM login_info WHERE id = ?`;
    const [rows] = await pool.query(query, [id]);
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

async function getUserById(id) {
    const query = `SELECT * FROM user WHERE id = ?`;
    const [rows] = await pool.query(query, [id]);
    return rows;
}

async function getUserByLoginId(id) {
    const query = `SELECT * FROM user WHERE login_info = ?`;
    const [rows] = await pool.query(query, [id]);
    return rows;
}

async function addLoginInfo(email, hash, salt) {
    const query = `INSERT INTO login_info (email, hash, salt) VALUES (?, ?, ?)`;
    const res = await pool.query(query, [email, hash, salt]);
    return res[0].insertId;
}

async function addUser(major, firstName, lastName, loginID, joinDate) {
    const query = `INSERT INTO user (major, first_name, last_name, login_info, join_date) VALUES (?, ?, ?, ?, ?)`;
    const res = await pool.query(query, [major, firstName, lastName, loginID, joinDate]);
    return res[0].insertId;
}

async function updateUserDetails(firstName, lastName, major, bio, userId) {
    const query = `UPDATE user SET first_name = ?, last_name = ?, major = ?, bio = ? WHERE id = ?`;
    const res = await pool.query(query, [firstName, lastName, major, bio, userId]);
    console.log(res[0]);
}


module.exports = { getLoginInfo,
                   getLoginInfoById, 
                   getUser, 
                   getUserById, 
                   getUserByLoginId, 
                   addLoginInfo, 
                   addUser,
                   updateUserDetails };
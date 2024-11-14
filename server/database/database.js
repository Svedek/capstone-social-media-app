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
    const [rows] = await pool.query(query, id);
    return rows;
}

async function getUserByLoginId(id) {
    const query = `SELECT * FROM user WHERE login_info = ?`;
    const [rows] = await pool.query(query, id);
    return rows;
}

async function addLoginInfo(email, hash, salt) {
    const query = `INSERT INTO login_info (email, hash, salt) VALUES (?, ?, ?)`;
    const res = await pool.query(query, [email, hash, salt]);
    return res[0].insertId;
}

async function addUser(major, loginID) {
    const query = `INSERT INTO user (major, login_info) VALUES (?, ?)`;
    const res = await pool.query(query, [major, loginID]);
    return res[0].insertId;
}

async function editPassword(login_id, hash, salt) {
    const query = `UPDATE login_info SET hash = ?, salt = ? WHERE id = ?`;
    const res = await pool.query(query, [hash, salt, login_id]);
    console.log(res[0]);
}

// async function editmajor(user_id) {
    
// }

// async function editBio(user_id) {
    
// }

module.exports = { getLoginInfo,
                   getLoginInfoById, 
                   getUser, 
                   getUserById, 
                   getUserByLoginId, 
                   addLoginInfo, 
                   addUser,
                   editPassword };
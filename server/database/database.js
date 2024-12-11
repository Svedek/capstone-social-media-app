const mysql = require('mysql2');
require('dotenv').config();

// Checks to see if a database interaction is legal is expected to be handled by the caller

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
}).promise();

// Login Info
async function getLoginInfo(email) {
    const query = `SELECT * FROM login_info WHERE email = ?`;
    const [rows] = await pool.query(query, [email]);
    return rows;
}

async function getLoginInfoById(id) {
    const query = `SELECT * FROM login_info WHERE login_info_id = ?`;
    const [rows] = await pool.query(query, [id]);
    return rows;
}

async function addLoginInfo(email, hash, salt) {
    const query = `INSERT INTO login_info (email, hash, salt) VALUES (?, ?, ?)`;
    const res = await pool.query(query, [email, hash, salt]);
    return res[0].insertId;
}

async function editPassword(login_id, hash, salt) {
    const query = `UPDATE login_info SET hash = ?, salt = ? WHERE login_info_id = ?`;
    const res = await pool.query(query, [hash, salt, login_id]);
    console.log(res[0]);
}

// User

async function getUser(email) {
    const loginInfo = await getLoginInfo(email);
    if (loginInfo.length < 1) {
        return [];
    }
    else {
        const rows = getUserByLoginId(id);
        return rows;
    }
}

async function getUserByLoginId(id) {
    const query = `SELECT * FROM user WHERE user_login_info_id = ?`;
    const [rows] = await pool.query(query, [id]);
    return rows;
}

async function getUserById(id) {  // Primarily for controllers
    const query = `SELECT * FROM user WHERE user_id = ?`;
    const [rows] = await pool.query(query, [id]);
    return rows;
}

async function addUser(loginID, major, firstName, lastName, joinDate) {
    const query = `INSERT INTO user (user_login_info_id, major, first_name, last_name, join_date) VALUES (?, ?, ?, ?, ?)`;
    const res = await pool.query(query, [loginID, major, firstName, lastName, joinDate]);
    return res[0].insertId;
}

// Post:
async function addEventInfo(title, location, start_time) {
    const query = `INSERT INTO event_info (title, location, start_time) VALUES (?, ?, ?)`;
    const [rows] = await pool.query(query, [title, location, start_time]);
    return rows.insertId;
}

async function addPost(owner_user_id, parent_post_id, event_info_id, text, time_posted) {
    // Either or both of parent_post_id and event_info_id must be null
    const query = `INSERT INTO post (post_owner_user_id, post_parent_post_id, post_event_info_id, text, time_posted) VALUES (?, ?, ?, ?, ?)`;
    const [rows] = await pool.query(query, [owner_user_id, parent_post_id, event_info_id, text, time_posted]);
    return rows.insertId;
}

async function getPostFomID(post_id) {
    const query = `SELECT * FROM post WHERE post_id=?`;
    const [rows] = await pool.query(query, [post_id]);
    return rows;
}

async function getPostIDFromEventInfo(event_info_id) {
    const query = `SELECT * FROM post WHERE post_event_info_id=?`;
    const [rows] = await pool.query(query, [event_info_id]);
    return rows;
}

async function getPostChildren(post_id) {
    const query = `SELECT * FROM post WHERE post_parent_post_id=?`;
    const [rows] = await pool.query(query, [post_id]);
    return rows;
}

async function getPostChildrenCount(post_id) {
    const query = `SELECT count(post_id) as cnt FROM post WHERE post_parent_post_id=?`;
    const [rows] = await pool.query(query, [post_id]);
    return rows[0].cnt;
}

async function getNextPosts(before, num_posts, filters) {
    filters;  // filters NOT YET IMPLEMENTED  (this line is to not give warnings when running server)
    const query = `SELECT * FROM post  WHERE time_posted < ? AND post_parent_post_id is null ORDER BY time_posted DESC LIMIT ?;`;
    const [rows] = await pool.query(query, [before, num_posts]);
    return rows;
}

async function isPostEvent(post_id) {
    const query = `SELECT * FROM post WHERE post_id=? AND post_event_info_id IS NOT null`;
    const [rows] = await pool.query(query, [post_id]);
    return rows.length > 0;
}

// Post Like
async function addPostLike(user_id, post_id) {
    const query = `INSERT INTO post_like (post_like_user_id, post_like_post_id) VALUES (?, ?)`;
    const [rows] = await pool.query(query, [user_id, post_id]);
    return rows.insertId;
}

async function removePostLike(user_id, post_id) {
    const query = `DELETE FROM post_like WHERE post_like_user_id=? AND post_like_post_id=?`;
    const [rows] = await pool.query(query, [user_id, post_id]);
    return rows.affectedRows;
}

async function isPostLiked(user_id, post_id) {
    const query = `SELECT * FROM post_like WHERE post_like_user_id=? AND post_like_post_id=?`;
    const [rows] = await pool.query(query, [user_id, post_id]);
    return rows.length > 0;
}

async function getUserLikes(user_id) {
    const query = `SELECT * FROM post_like WHERE post_like_user_id=?`;
    const [rows] = await pool.query(query, [user_id]);
    return rows;
}

async function getPostLikes(post_id) {
    const query = `SELECT * FROM post_like WHERE post_like_post_id=?`;
    const [rows] = await pool.query(query, [post_id]);
    return rows;
}

async function getPostLikesCount(post_id) {
    const query = `SELECT count(post_like_id) as cnt FROM post_like WHERE post_like_post_id=?`;
    const [rows] = await pool.query(query, [post_id]);
    return rows[0].cnt;
}

// Event RSVP
async function addEventRSVP(user_id, event_info_id) {
    const query = `INSERT INTO event_rsvp (event_rsvp_user_id, event_rsvp_event_info_id) VALUES (?, ?)`;
    const [rows] = await pool.query(query, [user_id, event_info_id]);
    return rows.insertId;
}

async function removeEventRSVP(user_id, event_info_id) {
    const query = `DELETE FROM event_rsvp WHERE event_rsvp_user_id=? AND event_rsvp_event_info_id=?`;
    const [rows] = await pool.query(query, [user_id, event_info_id]);
    return rows.affectedRows;
}

async function isEventRSVPed(user_id, event_info_id) {
    const query = `SELECT * FROM event_rsvp WHERE event_rsvp_user_id=? AND event_rsvp_event_info_id=?`;
    const [rows] = await pool.query(query, [user_id, event_info_id]);
    return rows.length > 0;
}

async function getUserRSVPs(user_id) {
    const query = `SELECT * FROM event_rsvp WHERE event_rsvp_user_id=?`;
    const [rows] = await pool.query(query, [user_id]);
    return rows;
}

async function getEventRSVPs(event_info_id) {
    const query = `SELECT * FROM event_rsvp WHERE event_rsvp_event_info_id=?`;
    const [rows] = await pool.query(query, [event_info_id]);
    return rows;
}

async function getEventRSVPCount(event_info_id) {
    const query = `SELECT count(event_rsvp_id) as cnt FROM event_rsvp WHERE event_rsvp_event_info_id=?`;
    const [rows] = await pool.query(query, [event_info_id]);
    return rows[0].cnt;
}

module.exports = {
    getLoginInfo, addLoginInfo, getLoginInfoById, editPassword,
    getUser, addUser, getUserById, getUserByLoginId,
    addPost, addEventInfo,
    getPostFomID, getPostIDFromEventInfo, getPostChildren, getPostChildrenCount, getNextPosts, isPostEvent,
    addPostLike, removePostLike, isPostLiked, getUserLikes, getPostLikes, getPostLikesCount,
    addEventRSVP, removeEventRSVP, isEventRSVPed, getUserRSVPs, getEventRSVPs, getEventRSVPCount
};

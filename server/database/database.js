const mysql = require('mysql2');
require('dotenv').config();

// Checks to see if a database interaction is legal is expected to be handled by the caller

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

async function getUser(username) {
    const query = `SELECT * FROM user WHERE username = ?`;
    const [rows] = await pool.query(query, [username]);
    return rows;
}

async function addLoginInfo(email, password) {
    const query = `INSERT INTO login_info (email, password) VALUES (?, ?)`;
    const [rows] = await pool.query(query, [email, password]);
    return rows.insertId;
}

async function addUser(username, major, loginID) {
    const query = `INSERT INTO user (username, major, user_login_info_id) VALUES (?, ?, ?)`;
    const [rows] = await pool.query(query, [username, major, loginID]);
    return rows.insertId;
}

async function addPost(owner, parent_post, text, is_event, time_posted) {
    const query = `INSERT INTO post (post_owner_user_id, post_parent_post_id, text, is_event, time_posted) VALUES (?, ?, ?, ?, ?)`;
    const [rows] = await pool.query(query, [owner, parent_post, text, is_event, time_posted]);
    return rows.insertId;
}

async function getNextPosts(before, num_posts, filters) {
    filters;  // filters NOT YET IMPLEMENTED  (this line is to not give warnings when running server)
    const query = `
        SELECT post.post_id, post.text, post.is_event, post.time_posted, user.username
        FROM post
        INNER JOIN user ON post.post_owner_user_id=user.user_id
        WHERE time_posted <= ?
        ORDER BY time_posted
        DESC LIMIT ?;`;
    const [rows] = await pool.query(query, [before, num_posts]);
    return rows;
}

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

async function addEventRSVP(user_id, event_id) {
    const query = `INSERT INTO event_rsvp (event_rsvp_user_id, event_rsvp_post_id) VALUES (?, ?)`;
    const [rows] = await pool.query(query, [user_id, event_id]);
    return rows.insertId;
}

async function removeEventRSVP(user_id, event_id) {
    const query = `DELETE FROM event_rsvp WHERE event_rsvp_user_id=? AND event_rsvp_post_id=?`;
    const [rows] = await pool.query(query, [user_id, event_id]);
    return rows.affectedRows;
}

async function isEventRSVPed(user_id, event_id) {
    const query = `SELECT * FROM event_rsvp WHERE event_rsvp_user_id=? AND event_rsvp_post_id=?`;
    const [rows] = await pool.query(query, [user_id, event_id]);
    return rows.length > 0;
}

async function getUserRSVPs(user_id) {
    const query = `SELECT * FROM event_rsvp WHERE event_rsvp_user_id=?`;
    const [rows] = await pool.query(query, [user_id]);
    return rows;
}

async function getEventRSVPs(event_id) {
    const query = `SELECT * FROM event_rsvp WHERE event_rsvp_post_id=?`;
    const [rows] = await pool.query(query, [event_id]);
    return rows;
}

async function getEventRSVPCount(event_id) {
    const query = `SELECT count(event_rsvp_id) as cnt FROM event_rsvp WHERE event_rsvp_post_id=?`;
    const [rows] = await pool.query(query, [event_id]);
    return rows[0].cnt;
}

module.exports = { 
    getLoginInfo, addLoginInfo,
    getUser, addUser,
    addPost, getNextPosts,
    addPostLike, removePostLike, isPostLiked, getUserLikes, getPostLikes, getPostLikesCount, 
    addEventRSVP, removeEventRSVP, isEventRSVPed, getUserRSVPs, getEventRSVPs, getEventRSVPCount
};











async function testCreatePost() {
    const date = new Date();
    console.log(`login_info id: ${login_info}`);
    console.log(`Time of post creation: ${date}`);

    var login_info = await addLoginInfo("demo@uwm.edu", "pass");
    console.log(`login_info id: ${login_info}`);

    var user = await addUser("MyUser", "Math", login_info);
    console.log(`user id: ${user}`);

    var res = await addPost(user, null, "This is my post", true, date);
    console.log(`post id: ${res}`);

    var posts = await getNextPosts(date, 5, null);
    console.log(posts);
}

async function testLikePost(user_id, post_id) {
    console.log('Test Like Post:');
    console.log(`Like count = 0: ${await getPostLikesCount(post_id)}`);
    console.log(`Does user like post = false: ${await isPostLiked(user_id, post_id)}`);
    console.log('');
    console.log(`Post like added with id: ${await addPostLike(user_id, post_id)}`);
    console.log(`Like count = 1: ${await getPostLikesCount(post_id)}`);
    console.log(`Does user like post = true: ${await isPostLiked(user_id, post_id)}`);
}

async function testUnlikePost(user_id, post_id) {
    console.log('Test Unlike Post:');
    console.log(`Like count = 1: ${await getPostLikesCount(post_id)}`);
    console.log(`Does user like post = true: ${await isPostLiked(user_id, post_id)}`);
    console.log('');
    console.log(`Number of post likes removed 1: ${await removePostLike(user_id, post_id)}`);
    console.log(`Like count = 0: ${await getPostLikesCount(post_id)}`);
    console.log(`Does user like post = false: ${await isPostLiked(user_id, post_id)}`);
}

async function testRSVPEvent(user_id, post_id) {
    console.log('Test RSVP event:');
    console.log(`RSVP count = 0: ${await getEventRSVPCount(post_id)}`);
    console.log(`Is user RSVPed to event = false: ${await isEventRSVPed(user_id, post_id)}`);
    console.log('');
    console.log(`Post RSVP added with id: ${await addEventRSVP(user_id, post_id)}`);
    console.log(`RSVP count = 1: ${await getEventRSVPCount(post_id)}`);
    console.log(`Is user RSVPed to event = true: ${await isEventRSVPed(user_id, post_id)}`);
}

async function testUnRSVPEvent(user_id, post_id) {
    console.log('Test unRSVP event:');
    console.log(`RSVP count = 1: ${await getEventRSVPCount(post_id)}`);
    console.log(`Is user RSVPed to event = true: ${await isEventRSVPed(user_id, post_id)}`);
    console.log('');
    console.log(`Number of post RSVPs removed 1: ${await removeEventRSVP(user_id, post_id)}`);
    console.log(`RSVP count = 0: ${await getEventRSVPCount(post_id)}`);
    console.log(`Is user RSVPed to event = false: ${await isEventRSVPed(user_id, post_id)}`);
}

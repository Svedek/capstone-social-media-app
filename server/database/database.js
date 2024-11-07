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
    const cols = await pool.query(query, [email, password]);
    return cols[0].insertId;
}

async function addUser(username, major, loginID) {
    const query = `INSERT INTO user (username, major, user_login_info_id) VALUES (?, ?, ?)`;
    const cols = await pool.query(query, [username, major, loginID]);
    return cols[0].insertId;
}

async function addPost(owner, parent_post, text, is_event, time_posted) {
    const query = `INSERT INTO post (post_owner_user_id, post_parent_post_id, text, is_event, time_posted) VALUES (?, ?, ?, ?, ?)`;
    const cols = await pool.query(query, [owner, parent_post, text, is_event, time_posted]);
    return cols[0].insertId;
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
    const cols = await pool.query(query, [before, num_posts]);
    return cols;
}

async function likePost(user_id, post_id) {
    
}

async function unlikePost(user_id, post_id) {
    
}

async function isPostLiked(user_id, post_id) {

}

module.exports = { 
    getLoginInfo, addLoginInfo,
    getUser, addUser,
    addPost, getNextPosts,
    likePost, unlikePost, isPostLiked
};



async function printAsync() {
    const date_old = new Date("2024-11-07T19:19:13.526Z");
    console.log(date_old);
    const date = new Date();
    console.log(date);

    // const login_info = await addLoginInfo("abcdefcvbasdf@uwm.edu", "pw23sdaf");
    // console.log(login_info);

    // const user = await addUser("sabadasf", "MAFF", login_info);
    // console.log(user);

    // const res = await addPost(user, null, "asdg42f3", false, date);
    // console.log(res);

    const posts = await getNextPosts(date_old, 5, null);
    console.log(posts);
  }
printAsync();

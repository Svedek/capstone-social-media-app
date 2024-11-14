const db = require("../database/database.js");

const addPost = async (req, res) => {
  const owner_user = req.body.owner_user;
  const parent_post = req.body.parent_post;
  const text = req.body.text;
  const is_event = req.body.is_event;
  const time_posted = new Date();
  let errorMessage = "";
  let created = false;
  response = await db.db.addPost(owner_user, parent_post, text, is_event, time_posted);
  user = response[0];
  if (db.getUser(username).length > 0) {
    errorMessage = "username already exists";
  }
  else if (db.getLoginInfo(email).length > 0) {
      errorMessage = "email already exists";
  }
  else if (email.split("@")[1] != "uwm.edu") {
      errorMessage = "must use a uwm email address";
  }
  else {
    const loginID = await db.addLoginInfo(email, pass);
    const userID = await db.addPost(owner_user, parent_post, text, is_event, time_posted);
    created = true;
  }
  res.send({created: created, errorMessage: errorMessage});
  
}
const getNextPosts = async (req, res) => {
  db.getNextPosts(before, num_posts, filters)
}

const addPostLike = async (req, res) => {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  let errorMessage = "";
  let created = false;
  response = await db.db.addPost(owner_user, parent_post, text, is_event, time_posted);
  user = response[0];
  if (db.isPostLiked(user_id, post_id)) {
    errorMessage = "Post already liked by this user!";
  }
  else {
    const likeID = await db.addPostLike(user_id, post_id);
    created = true;
  }
  res.send({created: created, errorMessage: errorMessage});
}
const removePostLike = async (req, res) => {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  let errorMessage = "";
  let created = false;
  response = await db.db.addPost(owner_user, parent_post, text, is_event, time_posted);
  user = response[0];
  if (db.isPostLiked(user_id, post_id)) {
    errorMessage = "Post is not liked by this user!";
  }
  else {
    const likeID = await db.addPostLike(user_id, post_id);
    created = true;
  }
  res.send({created: created, errorMessage: errorMessage});
  db.removePostLike(user_id, post_id)
}
const isPostLiked = async (req, res) => {
  db.isPostLiked(user_id, post_id)
}
const getUserLikes = async (req, res) => {
  db.getUserLikes(user_id)
}
const getPostLikes = async (req, res) => {
  db.getPostLikes(post_id)
}
const getPostLikesCount = async (req, res) => {
  db.getPostLikesCount(post_id)
}

const addEventRSVP = async (req, res) => {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  let errorMessage = "";
  let created = false;
  response = await db.db.addPost(owner_user, parent_post, text, is_event, time_posted);
  user = response[0];
  if (db.isPostLiked(user_id, post_id)) {
    errorMessage = "Post already liked by this user!";
  }
  else {
    const likeID = await db.addPostLike(user_id, post_id);
    created = true;
  }
  res.send({created: created, errorMessage: errorMessage});
  db.addEventRSVP(user_id, event_id)
}
const removeEventRSVP = async (req, res) => {
  db.removeEventRSVP(user_id, event_id)
}
const isEventRSVPed = async (req, res) => {
  db.isEventRSVPed(user_id, event_id)
}
const getUserRSVPs = async (req, res) => {
  db.getUserRSVPs(user_id)
}
const getEventRSVPs = async (req, res) => {
  db.getEventRSVPs(event_id)
}
const getEventRSVPCount = async (req, res) => {
  db.getEventRSVPCount(event_id)
}


module.exports = { 
  addPost, getNextPosts,
  addPostLike, removePostLike, isPostLiked, getUserLikes, getPostLikes, getPostLikesCount, 
  addEventRSVP, removeEventRSVP, isEventRSVPed, getUserRSVPs, getEventRSVPs, getEventRSVPCount
};

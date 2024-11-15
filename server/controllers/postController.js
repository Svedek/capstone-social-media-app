const db = require("../database/database.js");

// Post
const addPost = async (req, res) => {
  const owner_user = req.body.owner_user;
  const parent_post = req.body.parent_post;
  const text = req.body.text;
  const is_event = req.body.is_event;
  const time_posted = new Date();
  let errorMessage = "";
  let result = false;
  const users = await db.getUserByID(owner_user);
  if (users.length < 1) {
      errorMessage = "Owner user not found!";
  }
  else if (is_event && parent_post != null) {
      errorMessage = "Event cannot have a parent post!";
  }
  else if (text.length <= 0) {
      errorMessage = "Cannot create empty post!";
  }
  else {
    const postID = await db.addPost(owner_user, parent_post, text, is_event, time_posted);
    result = true;
  }
  res.send({result: result, errorMessage: errorMessage});
  
}

const getNextPosts = async (req, res) => {
  const before = req.body.before;
  const num_posts = req.body.num_posts;
  const filters = req.body.filters;
  let errorMessage = "";
  let result = {};
  if (num_posts <= 0) {
      errorMessage = `Invalid number of posts to get: ${num_posts}`;
  }
  else {
    result = await db.getNextPosts(before, num_posts, filters);
  }
  res.send({result: result, errorMessage: errorMessage});
  
}

// Post Like
const addPostLike = async (req, res) => {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  let errorMessage = "";
  let result = false;
  const isLiked = await db.isPostLiked(user_id, post_id);
  if (isLiked) {
    errorMessage = "Post already liked by this user!";
  }
  else {
    const likeID = await db.addPostLike(user_id, post_id);
    result = true;
  }
  res.send({result: result, errorMessage: errorMessage});
}

const removePostLike = async (req, res) => {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  let errorMessage = "";
  let result = false;
  const isLiked = await db.isPostLiked(user_id, post_id);
  if (!isLiked) {
    errorMessage = "Post is not liked by this user!";
  }
  else {
    const rowsRemoved = await db.removePostLike(user_id, post_id);
    result = rowsRemoved > 0;  // Should always be true if this else is entered
  }
  res.send({result: result, errorMessage: errorMessage});
}

const isPostLiked = async (req, res) => {
  const user_id = req.body.user_id;
  const post_id = req.body.post_id;
  let errorMessage = "";
  let result = await db.isPostLiked(user_id, post_id);
  res.send({result: result, errorMessage: errorMessage});
}

const getUserLikes = async (req, res) => {
  const user_id = req.body.user_id;
  let errorMessage = "";
  let result = await db.getUserLikes(user_id);
  res.send({result: result, errorMessage: errorMessage});
}

const getPostLikes = async (req, res) => {
  const post_id = req.body.post_id;
  let errorMessage = "";
  let result = await db.getPostLikes(post_id);
  res.send({result: result, errorMessage: errorMessage});
}

const getPostLikesCount = async (req, res) => {
  const post_id = req.body.post_id;
  let errorMessage = "";
  let result = await db.getPostLikesCount(post_id);
  res.send({result: result, errorMessage: errorMessage});
}

// Event RSVP
const addEventRSVP = async (req, res) => {
  const user_id = req.body.user_id;
  const event_id = req.body.event_id;
  let errorMessage = "";
  let result = false;
  const isRsvped = await db.isEventRSVPed(user_id, event_id);
  if (isRsvped) {
    errorMessage = "Event already RSVPed by this user!";
  }
  else {
    const rsvpID = await db.addEventRSVP(user_id, event_id);
    result = true;
  }
  res.send({result: result, errorMessage: errorMessage});
}

const removeEventRSVP = async (req, res) => {
  const user_id = req.body.user_id;
  const event_id = req.body.event_id;
  let errorMessage = "";
  let result = false;
  const isRsvped = await db.isEventRSVPed(user_id, event_id);
  if (!isRsvped) {
    errorMessage = "Event is not RSVPed by this user!";
  }
  else {
    const rowsRemoved = await db.removeEventRSVP(user_id, event_id);
    result = rowsRemoved > 0;  // Should always be true if this else is entered
  }
  res.send({result: result, errorMessage: errorMessage});
}

const isEventRSVPed = async (req, res) => {
  const user_id = req.body.user_id;
  const event_id = req.body.event_id;
  let errorMessage = "";
  let result = await db.isEventRSVPed(user_id, event_id)
  res.send({result: result, errorMessage: errorMessage});
}

const getUserRSVPs = async (req, res) => {
  const user_id = req.body.user_id;
  let errorMessage = "";
  let result = await db.getUserRSVPs(user_id);
  res.send({result: result, errorMessage: errorMessage});
}

const getEventRSVPs = async (req, res) => {
  const event_id = req.body.event_id;
  let errorMessage = "";
  let result = await db.getEventRSVPs(event_id);
  res.send({result: result, errorMessage: errorMessage});
}

const getEventRSVPCount = async (req, res) => {
  const event_id = req.body.event_id;
  let errorMessage = "";
  let result = await db.getEventRSVPCount(event_id);
  res.send({result: result, errorMessage: errorMessage});
}

module.exports = { 
  addPost, getNextPosts,
  addPostLike, removePostLike, isPostLiked, getUserLikes, getPostLikes, getPostLikesCount, 
  addEventRSVP, removeEventRSVP, isEventRSVPed, getUserRSVPs, getEventRSVPs, getEventRSVPCount
};

const db = require("../database/database.js");

// Post
const addEventInfo = async (req, res) => {
  const title = req.body.title;
  const location = req.body.location;
  const start_time = req.body.start_time;
  let errorMessage = "";
  let result = false;
  if (title.length < 1) {
    errorMessage = "Event must have a title!";
  } else {
    const postID = await db.addEventInfo(title, location, start_time);
    result = postID;
  }

  res.send({result: result, errorMessage: errorMessage});
}

const addPost = async (req, res) => {
  const owner_user = req.body.owner_user;
  const parent_post = req.body.parent_post;
  const event_info = req.body.event_info;
  const text = req.body.text;
  const time_posted = new Date();
  let errorMessage = "";
  let result = false;
  const users = await db.getUserById(owner_user);
  if (users.length < 1) {
      errorMessage = "Owner user not found!";
  }
  else if (event_info !== null && parent_post !== null) {
      errorMessage = "Event cannot have a parent post!";
  }
  else if (text.length <= 0) {
      errorMessage = "Cannot create empty post!";
  }
  else {
    const postID = await db.addPost(owner_user, parent_post, event_info, text, time_posted);
    result = postID;
  }

  res.send({result: result, errorMessage: errorMessage});
}

const getPostFomID = async (req, res) => {
  const post_id = req.body.post_id;
  let errorMessage = "";
  let result = {};
  result = await db.getPostFomID(post_id);
  
  res.send({result: result, errorMessage: errorMessage});
}

const getPostIDFromEventInfo = async (req, res) => {
  const event_info_id = req.body.event_info_id;
  let errorMessage = "";
  let result = {};
  result = await db.getPostIDFromEventInfo(event_info_id);
  
  res.send({result: result, errorMessage: errorMessage});
}

const getPostChildren = async (req, res) => {
  const post_id = req.body.post_id;
  let errorMessage = "";
  let result = {};
  result = await db.getPostChildren(post_id);
  
  res.send({result: result, errorMessage: errorMessage});
}

const getPostChildrenCount = async (req, res) => {
  const post_id = req.body.post_id;
  let errorMessage = "";
  let result = {};
  result = await db.getPostChildrenCount(post_id);
  
  res.send({result: result, errorMessage: errorMessage});
}

const getNextPosts = async (req, res) => {
  const posts_before_id = req.body.posts_before_id;
  const num_posts = req.body.num_posts;
  const filters = req.body.filters;
  let errorMessage = "";
  let result = {};
  if (num_posts <= 0) {
      errorMessage = `Invalid number of posts to get: ${num_posts}`;
  }
  else {
    result = await db.getNextPosts(posts_before_id, num_posts, filters);
  }

  res.send({result: result, errorMessage: errorMessage});
}

const isPostEvent = async (req, res) => {  // TODO
  const post_id = req.body.post_id;
  let errorMessage = "";
  let result = await db.isPostEvent(user_id, post_id);
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
    result = likeID;
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
const addEventRSVP = async (req, res) => {  // TODO
  const user_id = req.body.user_id;
  const event_info_id = req.body.event_info_id;
  let errorMessage = "";
  let result = false;
  const isRsvped = await db.isEventRSVPed(user_id, event_info_id);
  if (isRsvped) {
    errorMessage = "Event already RSVPed by this user!";
  }
  else {
    const rsvpID = await db.addEventRSVP(user_id, event_info_id);
    result = rsvpID;
  }
  res.send({result: result, errorMessage: errorMessage});
}

const removeEventRSVP = async (req, res) => {
  const user_id = req.body.user_id;
  const event_info_id = req.body.event_info_id;
  let errorMessage = "";
  let result = false;
  const isRsvped = await db.isEventRSVPed(user_id, event_info_id);
  if (!isRsvped) {
    errorMessage = "Event is not RSVPed by this user!";
  }
  else {
    const rowsRemoved = await db.removeEventRSVP(user_id, event_info_id);
    result = rowsRemoved > 0;  // Should always be true if this else is entered
  }
  res.send({result: result, errorMessage: errorMessage});
}

const isEventRSVPed = async (req, res) => {
  const user_id = req.body.user_id;
  const event_info_id = req.body.event_info_id;
  let errorMessage = "";
  let result = await db.isEventRSVPed(user_id, event_info_id)
  res.send({result: result, errorMessage: errorMessage});
}

const getUserRSVPs = async (req, res) => {
  const user_id = req.body.user_id;
  let errorMessage = "";
  let result = await db.getUserRSVPs(user_id);
  res.send({result: result, errorMessage: errorMessage});
}

const getEventRSVPs = async (req, res) => {
  const event_info_id = req.body.event_info_id;
  let errorMessage = "";
  let result = await db.getEventRSVPs(event_info_id);
  res.send({result: result, errorMessage: errorMessage});
}

const getEventRSVPCount = async (req, res) => {
  const event_info_id = req.body.event_info_id;
  let errorMessage = "";
  let result = await db.getEventRSVPCount(event_info_id);
  res.send({result: result, errorMessage: errorMessage});
}

module.exports = { 
  addPost, addEventInfo,
  getPostFomID, getPostIDFromEventInfo, getPostChildren, getPostChildrenCount, getNextPosts, isPostEvent,
  addPostLike, removePostLike, isPostLiked, getUserLikes, getPostLikes, getPostLikesCount, 
  addEventRSVP, removeEventRSVP, isEventRSVPed, getUserRSVPs, getEventRSVPs, getEventRSVPCount
};

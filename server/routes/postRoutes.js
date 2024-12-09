const express = require("express");
const postController = require("../controllers/postController.js")

const postRouter = express.Router();

postRouter.post("/addEventInfo", postController.addEventInfo);  // title, location, start_time
postRouter.post("/addPost", postController.addPost);  // owner_user, parent_post, event_info, text, time_posted
postRouter.post("/getPostFomID", postController.getPostFomID);  // post_id
postRouter.post("/getPostIDFromEventInfo", postController.getPostIDFromEventInfo);  // event_info_id
postRouter.post("/getPostChildren", postController.getPostChildren);  // post_id
postRouter.post("/getPostChildrenCount", postController.getPostChildrenCount);  // post_id
postRouter.post("/getNextPosts", postController.getNextPosts);  // before, num_posts, filters
postRouter.post("/isPostEvent", postController.isPostEvent);  // post_id

postRouter.post("/addPostLike", postController.addPostLike);  // user_id, post_id
postRouter.post("/removePostLike", postController.removePostLike);  // user_id, post_id
postRouter.post("/isPostLiked", postController.isPostLiked);  // user_id, post_id
postRouter.post("/getUserLikes", postController.getUserLikes);  // user_id
postRouter.post("/getPostLikes", postController.getPostLikes);  // post_id
postRouter.post("/getPostLikesCount", postController.getPostLikesCount);  // post_id

postRouter.post("/addEventRSVP", postController.addEventRSVP);  // user_id, event_info_id
postRouter.post("/removeEventRSVP", postController.removeEventRSVP);  // user_id, event_info_id
postRouter.post("/isEventRSVPed", postController.isEventRSVPed);  // user_id, event_info_id
postRouter.post("/getUserRSVPs", postController.getUserRSVPs);  // user_id
postRouter.post("/getEventRSVPs", postController.getEventRSVPs);  // event_info_id
postRouter.post("/getEventRSVPCount", postController.getEventRSVPCount);  // event_info_id

module.exports = postRouter;

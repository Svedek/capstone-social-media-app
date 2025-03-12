import React, { useState, useEffect, useRef } from 'react';
import { do_api_request } from '../APIHandler.jsx'
import './HomePage.css';
import { CalendarDays } from 'lucide-react';
import { ReactionButton, Button } from './reaction_button.jsx';


export const PostItem = (props) => {
  
  const {post, user_id, handle_open_comments} = props.props;
  const is_event = post.post_event_info_id !== null;

  const [author, set_author] = useState("Loading...");  // Needed for initial setting
  const [liked, set_liked] = useState(false);
  const [like_count, set_like_count] = useState(0);
  const [comment_count, set_comment_count] = useState(0);
  const [rsvped, set_rsvped] = useState(false);
  const [rsvp_count, set_rsvp_count] = useState(0);

  const processing_like = useRef(false);
  const processing_rsvp = useRef(false);


  // Fetch author details
  useEffect(() => {
    async function fetchAuthor() {
      const resp = await do_api_request(`./user/getUserById`, { userId: post.post_owner_user_id }, "POST");
      console.log(`${resp.result.first_name} ${resp.result.last_name}` || "Unknown Author");
      set_author(`${resp.result.first_name} ${resp.result.last_name}` || "Unknown Author");
    }
    fetchAuthor();
  }, []);

   // Fetch post metadata
   useEffect(() => {
    async function fetchData() {
      const [likedResp, likeCountResp, commentCountResp] = await Promise.all([
        do_api_request(`./post/isPostLiked`, { user_id, post_id: post.post_id }, "POST"),
        do_api_request(`./post/getPostLikesCount`, { post_id: post.post_id }, "POST"),
        do_api_request(`./post/getPostChildrenCount`, { post_id: post.post_id }, "POST"),
      ]);
      if (likedResp.errorMessage) {
        console.error(`ERROR: liked initialization on post ${post.post_id} : ${likedResp.errorMessage}`);
      } else {
        set_liked(likedResp.result);
      }

      if (likeCountResp.errorMessage) {
        console.error(`ERROR: like count initialization on post ${post.post_id} : ${likeCountResp.errorMessage}`);
      } else {
        set_like_count(likeCountResp.result);
      }

      if (commentCountResp.errorMessage) {
        console.error(`ERROR: comment count initialization on post ${post.post_id} : ${commentCountResp.errorMessage}`);
      } else {
        set_comment_count(commentCountResp.result);
      }
    }
    fetchData();
  }, []);

  // Fetch event-specific metadata
  useEffect(() => {
    if (is_event) {
      async function fetchEventData() {
        const [rsvpedResp, rsvpCountResp] = await Promise.all([
          do_api_request(`./post/isEventRSVPed`, { user_id, event_info_id: post.post_event_info_id }, "POST"),
          do_api_request(`./post/getEventRSVPCount`, { event_info_id: post.post_event_info_id }, "POST"),
        ]);
        if (rsvpedResp.errorMessage) {
          console.error(`ERROR: RSVPed initialization on post ${post.post_id} : ${rsvpedResp.errorMessage}`);
        } else {
          set_rsvped(rsvpedResp.result);
        }
  
        if (rsvpCountResp.errorMessage) {
          console.error(`ERROR: RSVP count initialization on post ${post.post_id} : ${rsvpCountResp.errorMessage}`);
        } else {
          set_rsvp_count(rsvpCountResp.result);
        }
      }
      fetchEventData();
    }
  }, []);

  const handle_like_press = async () => {
    if (processing_like.current) return;
    processing_like.current = true;

    const endpoint = liked ? "./post/removePostLike" : "./post/addPostLike";
    const resp = await do_api_request(endpoint, { user_id, post_id: post.post_id }, "POST");

    if (!resp.errorMessage) {
      const newLiked = await do_api_request(`./post/isPostLiked`, { user_id, post_id: post.post_id }, "POST");
      const newLikeCount = await do_api_request(`./post/getPostLikesCount`, { post_id: post.post_id }, "POST");
      set_liked(newLiked.result);
      set_like_count(newLikeCount.result);
    } else {
      console.error(`ERROR: handle_like_press on post ${post.post_id} : ${resp.errorMessage}`);
    }

    processing_like.current = false;
  };

  const handle_rsvp_press = async () => {
    if (processing_rsvp.current) return;
    processing_rsvp.current = true;

    const endpoint = rsvped ? "./post/removeEventRSVP" : "./post/addEventRSVP";
    const resp = await do_api_request(endpoint, { user_id, event_info_id: post.post_event_info_id }, "POST");

    if (!resp.errorMessage) {
      const newRSVPed = await do_api_request(`./post/isEventRSVPed`, { user_id, event_info_id: post.post_event_info_id }, "POST");
      const newRSVPCount = await do_api_request(`./post/getEventRSVPCount`, { event_info_id: post.post_event_info_id }, "POST");
      set_rsvped(newRSVPed.result);
      set_rsvp_count(newRSVPCount.result);
    } else {
      console.error(`ERROR: handle_rsvp_press on post ${post.post_id} : ${resp.errorMessage}`);
    }

    processing_rsvp.current = false;
  };

  const handle_comment_press = async () => {
    handle_open_comments(post);
  };

  return (
    <div key={post.post_id} className={`post ${post.type === 'event' ? 'post-event' : ''}`}>
      <div className="post-content-container">
        <div className="post-author">
          {is_event && <CalendarDays size={16} className="event-icon" />}
          <b>{author}</b>
        </div>
        <div className="post-content"><p class="post-text">{post.text}</p></div>
      </div>
      <div className="post-actions-container">
        { is_event ? (
          <>
            <ReactionButton props={{post_id: post.post_id, icon: Button.RSVP, active: rsvped, handle_func: handle_rsvp_press, num: rsvp_count}}/>
            <ReactionButton props={{post_id: post.post_id, icon: Button.COMMENT, handle_func: handle_comment_press, num: comment_count}}/>
            <ReactionButton props={{post_id: post.post_id, icon: Button.LIKE, active: liked, handle_func: handle_like_press, num: like_count}}/>
          </>
        ) : (
          <>
            <ReactionButton props={{post_id: post.post_id, icon: Button.COMMENT, handle_func: handle_comment_press, num: comment_count}}/>
            <ReactionButton props={{post_id: post.post_id, icon: Button.LIKE, active: liked, handle_func: handle_like_press, num: like_count}}/>
          </>
        )}
      </div>
    </div>
  );
};

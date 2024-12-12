import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { do_api_request } from '../APIHandler.jsx'
import { CommentItem } from './commentItem.jsx'


const maxCharacters = 300;


///reply overlay
export const CommentOverlay = ({ post, userId, hideOverlay }) => {
  const [commentPosts, setCommentPosts] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);  // I know this is bad, but it will work

  // Fetch author details
  useEffect(() => {
    async function fetchCommentPosts() {
      const resp = await do_api_request(`./post/getPostChildren`, { post_id: post.post_id }, "POST");
      console.log(resp);
      console.log(`${post.post_id}`);
      setCommentPosts(resp.result);
    }
    fetchCommentPosts();
  }, [flag]);

  const handleSubmitComment = async () => {
    if (loading) return;
    setLoading(true);
    
    if (commentText.trim()) {
      const resp = await do_api_request(`./post/addPost`, {owner_user: userId, parent_post: post.post_id, event_info: null, text: commentText.trim()}, "POST");

      if (resp.errorMessage) {
        setErr(resp.errorMessage)
      } else {
        setCommentText('');
      }
    } else {
      setErr("Textbox must contain some text.")
    }
    
    setFlag(!flag);  // Update commnets displayed

    setLoading(false);
  };

  const closeOverlay = () => {
    if (loading) return;
    setCommentPosts([]);
    setCommentText('');
    setErr('');
    hideOverlay();
  }
  
  const handleTextChange = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <div className="comment-overlay">
      <div className="comment-overlay-content">
        <button className="close-button" onClick={closeOverlay}>
          &times;
        </button>
        {err && <p className="error-message">{err}</p>}
        <h3>Comments for:</h3>
        <p>{post.text}</p>
        <div className="comments-section">
          {commentPosts.map((childPost) => (
              <CommentItem key={childPost.post_id} post={childPost} />
          ))}
        </div>
        <textarea
          placeholder="Write a reply..."
          rows="3"
          className="reply-textarea"
          maxLength={maxCharacters}
          value={commentText}
          onChange={handleTextChange}
        ></textarea>
        <button className="submit-reply-button" onClick={handleSubmitComment}>Reply</button>
      </div>
    </div>
  );
};
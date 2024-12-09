import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';


///reply overlay
export const CommentOverlay = ({ post, closeOverlay }) => {
  
  const handleAddComment = (postId, comment) => {
    // DO
  };

  return (
    <div className="comment-overlay">
      <div className="comment-overlay-content">
        <button className="close-button" onClick={closeOverlay}>
          &times;
        </button>
        <h3>Comments for "{post.content}"</h3>
        <div className="comments-section">
          {post.comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <div className="comment-author">{comment.author}</div>
              <div className="comment-text">{comment.text}</div>
            </div>
          ))}
        </div>
        <textarea
          placeholder="Write a reply..."
          rows="3"
          className="reply-textarea"
        ></textarea>
        <button className="submit-reply-button">Reply</button>
      </div>
    </div>
  );
};
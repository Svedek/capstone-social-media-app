import React, { useState, useEffect } from 'react';
import { do_api_request } from '../APIHandler.jsx'
import './HomePage.css';


export const CommentItem = ({post}) => {
  const [author, set_author] = useState("Loading...");

  // Fetch author details
  useEffect(() => {
    async function fetchAuthor() {
      const resp = await do_api_request(`./user/getUserById`, { userId: post.post_owner_user_id }, "POST");
      set_author(`${resp.result.first_name} ${resp.result.last_name}` || "Unknown Author");
    }
    fetchAuthor();
  }, []);

  return (
    <div key={post.post_id} className="comment-item">
      <div className="comment-author">{author}</div>
      <div className="comment-text">{post.text}</div>
    </div>
  );
};

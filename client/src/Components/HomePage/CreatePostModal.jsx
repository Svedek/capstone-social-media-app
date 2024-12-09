import React, { useState } from 'react';
import './HomePage.css';

export const CreatePostModal = ({ toggleModal }) => {
  const maxCharacters = 300;
  const [postContent, setPostContent] = useState("");
  
  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };
  
  const handleSubmitPost = () => {
    if (postContent.trim()) {
      // DO SUBMIT
      setPostContent("");
      toggleModal();
    }
  };



  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={toggleModal}>&times;</span>
        <h3>Create a New Post</h3>
        <textarea
          placeholder="What's on your mind?"
          rows="4"
          maxLength={maxCharacters}
          value={postContent}
          onChange={handlePostChange}
        ></textarea>
        <div className="character-count">
          {maxCharacters - postContent.length} characters remaining
        </div>

        <button
          className="submit-post"
          disabled={postContent.length === 0}
          onClick={handleSubmitPost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

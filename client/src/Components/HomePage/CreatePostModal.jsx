import React from 'react';
import './HomePage.css';

export const CreatePostModal = ({ 
  postContent, 
  handlePostChange, 
  postImage, 
  handleImageChange, 
  handleSubmitPost, 
  toggleModal, 
  maxCharacters 
}) => {
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

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {postImage && (
          <div className="image-preview">
            <img src={postImage} alt="Preview" />
          </div>
        )}

        <button
          className="submit-post"
          disabled={postContent.length === 0 && !postImage}
          onClick={handleSubmitPost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

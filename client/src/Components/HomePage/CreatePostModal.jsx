import React, { useState } from 'react';
import { do_api_request } from '../APIHandler.jsx'
import './HomePage.css';

export const CreatePostModal = ({ hideModal, user_id }) => {
  const maxCharacters = 300;
  const [postContent, setPostContent] = useState("");
  const [err, setErr] = useState("");


  const [loading, setLoading] = useState(false);
  
  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };
  
  const handleSubmitPost = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    if (postContent.trim()) {
      const resp = await do_api_request(`./post/addPost`, {owner_user: user_id, parent_post: null, event_info: null, text: postContent}, "POST");

      if (resp.errorMessage) {
        setErr(resp.errorMessage)
      } else {
        closeModal(true);
      }
    } else {
      setErr("Textbox must contain some text.")
    }
    setLoading(false);
  };

  const closeModal = (postCreated) => {
    if (loading) return;
    setPostContent("");
    setErr("");
    hideModal(postCreated);
  };
  
  const onExit = () => closeModal(false);


  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onExit}>&times;</span>
        {err && <p className="error-message">{err}</p>}
        <form onSubmit={handleSubmitPost}>
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

          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

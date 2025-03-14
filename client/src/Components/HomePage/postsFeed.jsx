import React, { useState, useEffect, useRef } from 'react';
import { do_api_request } from '../APIHandler.jsx'
import './HomePage.css';

import { CommentOverlay } from "./commentOverlay.jsx"
import { CreatePostModal } from "./CreatePostModal.jsx" 
import { PostItem } from "./post_item.jsx" 


export const PostsFeed = (props) => {
  const {user_id} = props.props;

  const last_rendered_post = useRef(2000000000);
  
  const posts_to_load = 8;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);

  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef(null);
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = (postCreated) => {
    if (postCreated) {
      window.location.reload();  // Refresh page so that you can see your created post
    } else {
      setIsModalOpen(false);
    }
  };
  
  const handleOpenComments = (post) => {
    setActivePost(post);
  };

  async function loadMorePosts() {
    if (loading) return;
    setLoading(true);

    const resp = await do_api_request(`./post/getNextPosts`, {posts_before_id: last_rendered_post.current, num_posts: posts_to_load, filters: ''}, "POST");

        if (!resp || !Array.isArray(resp.result)) {
          console.error("Unexpected API response format:", resp);
          setLoading(false);
          return;
        }

    if (resp.errorMessage) {
      console.log("postsFeed.jsx - loadMorePosts: " + resp.errorMessage);
    } else {
      const new_posts = resp.result;
      if (new_posts.length > 0) {
        setDisplayedPosts((prev) => [...prev, ...new_posts]);

        setHasMore(new_posts.length >= posts_to_load);
        last_rendered_post.current = new_posts[new_posts.length-1].post_id;
      } else {
        setHasMore(false);
      }
    }

    setLoading(false);
  };

  const handleScroll = () => {
    if (!scrollRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadMorePosts();
    }
  };

  useEffect(() => {
    loadMorePosts();
  }, []);

  return (
    <div className="posts-container">
      <h2>Your feed</h2> 
      <button className="create-post" onClick={showModal}>
        Create Post
      </button>
      <div className="posts-scroll-area" ref={scrollRef} onScroll={handleScroll}>
        {console.log(displayedPosts)}
        {
        displayedPosts.map((post) => (
          <PostItem key={post.post_id} props={{post: post, user_id: user_id, handle_open_comments: handleOpenComments}} />
        ))}
        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading more posts...</p>
          </div>
        )}
        {!hasMore && displayedPosts.length > 0 && (
          <div className="no-more-posts">
            <p>No more posts to load</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <CreatePostModal hideModal={hideModal} user_id={user_id} />
      )}

      {activePost && (
        <CommentOverlay
          post={activePost}
          userId={user_id}
          hideOverlay={() => setActivePost(false)} // This is the function to close the overlay
        />
      )}
    </div>
  );
};
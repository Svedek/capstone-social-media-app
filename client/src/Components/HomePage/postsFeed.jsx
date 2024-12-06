import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import { User, CalendarDays, Heart, Users, MailOpen, MessageSquareMore } from 'lucide-react';


export const PostsFeed = ({ posts, handleLikeToggle, toggleModal, handleOpenComments, handleRSVP }) => {
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef(null);
  const postsPerPage = 8;

  useEffect(() => {
    setDisplayedPosts(posts.slice(0, postsPerPage));
    setHasMore(posts.length > postsPerPage);
  }, [posts]);

  const handleScroll = () => {
    if (!scrollRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadMorePosts();
    }
  };

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = page * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const newPosts = posts.slice(startIndex, endIndex);

      if (newPosts.length > 0) {
        setDisplayedPosts(prev => [...prev, ...newPosts]);
        setPage(nextPage);
        setHasMore(endIndex < posts.length);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    }, 500);
  };
  const renderPostTypeIcon = (postType) => {
    switch (postType) {
      case 'user':
        return <User size={16} className="post-type-icon user-post-icon" />;
      case 'event':
        return <CalendarDays size={16} className="post-type-icon event-post-icon" />;
      case 'community':
        return <Users size={16} className="post-type-icon community-post-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="posts-container">
      <h2>Your feed</h2>
      <button className="create-post" onClick={toggleModal}>
        Create Post
      </button>
      <div className="posts-scroll-area" ref={scrollRef} onScroll={handleScroll}>
        {displayedPosts.map((post) => (
          <div key={post.id} className={`post ${post.type === 'event' ? 'post-event' : ''}`}>
            <div className="post-content-container">
              <div className="post-author">
                {post.type === 'event' && <CalendarDays size={16} className="event-icon" />}
                {post.author}
              </div>
              <div className="post-content">{post.content}</div>
              {post.image && <img src={post.image} alt="Post" className="post-image" />}
            </div>

            <div className="post-actions-container">
  {post.type === 'event' ? (
    <>
      <div className="action-item">
        <MailOpen
          size={24}
          className={`action-icon ${post.rsvpStatus === 'going' ? 'rsvp-going' : ''}`}
          onClick={() => handleRSVP(post.id)}
        />
        <span className="action-counter">{post.rsvpCount || 0}</span>
      </div>
      <div className="action-item">
        <MessageSquareMore size={24} className="action-icon" onClick={() => handleOpenComments(post.id)} />
        <span className="action-counter">{post.comments.length}</span>
      </div>
      <div className="action-item">
        <Heart
          size={24}
          className={`action-icon ${post.liked ? 'liked' : ''}`}
          onClick={() => handleLikeToggle(post.id)}
        />
        <span className="action-counter">{post.likes}</span>
      </div>
    </>
  ) : (
    <>
      <div className="action-item">
        <MessageSquareMore size={24} className="action-icon" onClick={() => handleOpenComments(post.id)} />
        <span className="action-counter">{post.comments.length}</span>
      </div>
      <div className="action-item">
        <Heart
          size={24}
          className={`action-icon ${post.liked ? 'liked' : ''}`}
          onClick={() => handleLikeToggle(post.id)}
        />
        <span className="action-counter">{post.likes}</span>
      </div>
    </>
  )}
</div>
          </div>
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
    </div>
  );
};
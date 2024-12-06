import React, { useState, useEffect, useRef } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import './HomePage.css';
import { Home, User, MessageSquare, CalendarDays, Tickets, Heart,LogOut,Users,MailOpen, MessageSquareMore } from 'lucide-react';

const Taskbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here
    sessionStorage.clear(); // Example of clearing session data

    // Redirect to login page and replace history to prevent back navigation
    navigate('/', { replace: true });
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/home">Home</Link><Home size={24} /></li>
        <li><Link to="/calender">Calendar</Link><CalendarDays size={24} /></li>
        <li><Link to="/events">Events</Link><Tickets size={24} /></li>
        <li><Link to="/profile">Profile</Link><User size={24} /></li>
        <li><Link to="/messages">Messages</Link><MessageSquare size={24} /></li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={24} /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

const PostsFeed = ({ posts, handleLikeToggle, toggleModal, handleOpenComments, handleRSVP }) => {
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

///reply overlay
const CommentOverlay = ({ post, closeOverlay }) => {
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





const Sidebar = ({ events, friends, newFriend, setNewFriend, handleAddFriend }) => {
  return (
    <div className="sidebar">
      <div className="events">
        <h3>Upcoming Events</h3>
        <ul>
          {events.map(event => (
            <li key={event.id}>{event.name} - {event.date}</li>
          ))}
        </ul>
        <Link to="/CreateEvent">
          <button className="CreateEvent">Create Event</button>
        </Link>
      </div>

      
      <div className="social-media">
        <h3>Follow Us</h3>
        <ul>
          <li><a href="https://x.com/UWM?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer"> Twitter</a></li>
          <li><a href="https://www.facebook.com/UWMilwaukee/" target="_blank" rel="noopener noreferrer"> Facebook</a></li>
          <li><a href="https://www.instagram.com/uwmilwaukee/" target="_blank" rel="noopener noreferrer"> Instagram</a></li>
          <li><a href="https://www.linkedin.com/school/uwmilwaukee/" target="_blank" rel="noopener noreferrer"> LinkedIn</a></li>
        </ul>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  
  const maxCharacters = 300;

  const [posts, setPosts] = useState([
    { id: 1, author: 'John Doe', content: 'testing, this test, test test', likes: 0  ,  comments: [
      { author: "joinon", text: "does this commetn work" },
      { author: "rahhh", text: "RAHHHHHHHHHHHHHHH" },
      { 
        author: "john", 
        text: "DOES THIS ONE WROK  " 
      },
      { 
        author: "jimbo", 
        text: "SPACING TESTTT , TEST ,TEST" 
      },
      
    ],
  }, { 
    id: 2, 
    author: 'Event Organizer', 
    content: 'Upcoming Tech Meetup this Friday!', 
    likes: 0, 
    type: 'event',
    rsvpStatus: null,

    comments: []  
  },
  { 
    id: 3, 
    author: 'Community Board', 
    content: 'Join our campus cleanup initiative', 
    likes: 0, 
    type: 'event',
    rsvpStatus: null,


    comments: []  
  },
    { id: 2, author: 'Jane Smith', content: 'please work , test,test,test', likes: 0 , comments: []  },
    { id: 3, author: 'Bob Johnson', content: 'test 3, test 3, test 333. testtest' , likes: 0, comments: []  },
    { id: 4, author: 'jimbo', content: 'yet another test to cover more space', likes: 0 , comments: []  },
    { id: 5, author: 'jimbos brother', content: 'yet another test to cover more space', likes: 0, comments: [] },
    { id: 6, author: 'John', content: 'yet another test to cover more space' , likes: 0, comments: []  },
    { id: 7, author: 'Anon number1', content: 'yet another test to cover more space', likes: 0 , comments: []  },
    { id: 8, author: 'Anon number2', content: 'yet another test to cover more space' , likes: 0, comments: []  },
    { id: 9, author: 'Anon number3', content: 'yet another test to cover more space' , likes: 0 , comments: [] },
    { id: 10, author: 'Anon number4', content: 'yet another test to cover more space' , likes: 0 , comments: [] },
    { id: 11, author: 'Anon number3', content: 'yet another test to cover more space' , likes: 0, comments: []  },
    { id: 12, author: 'Anon number4', content: 'yet another test to cover more space' , likes: 0 , comments: [] },
    { id: 13, author: 'Anon number3', content: 'yet another test to cover more space' , likes: 0, comments: []  },
    { id: 15, author: 'Anon number3', content: 'yet another test to cover more space' , likes: 0 , comments: [] },
    { id: 16, author: 'Anon number4', content: 'yet another test to cover more space' , likes: 0 , comments: [] },
    { id: 17, author: 'Anon number3', content: 'yet another test to cover more space' , likes: 0 , comments: [] },
    { id: 18, author: 'Anon number4', content: 'yet another test to cover more space' , likes: 0 , comments: [] },
    { id: 19, author: 'Anon number3', content: 'yet another test to cover more space' , likes: 0 , comments: [] },
    { id: 20, author: 'Anon number4', content: 'yet another test to cover more space' , likes: 0 , comments: [] },
    { id: 21, author: 'Anon number3', content: 'yet another test to cover more space' , likes: 0 , comments: [] },
    { id: 22, author: 'Anon number4', content: 'yet another test to cover more space' , likes: 0 , comments: [] },
    { id: 23, author: 'Anon number3', content: 'yet another test to cover more space' , likes: 0 , comments: [] },
    { id: 24, author: 'Anon number4', content: 'end' , likes: 0 },
    
  ]);
 const events = [
    { id: 1, name: 'Community Picnic', date: '2024-10-15' },
    { id: 2, name: 'Tech Meetup', date: '2024-10-20' },
    { id: 3, name: 'Career Fair', date: '2024-10-20' },
    { id: 4, name: 'Library Event', date: '2024-10-20' },
    { id: 5, name: 'Gym Event', date: '2024-10-20' },
  ];
  const handleRSVP = (postId) => {
    setPosts((prevPosts) => 
      prevPosts.map((post) => {
        if (post.id === postId && post.type === 'event') {
          if (post.rsvpStatus === 'going') {
            // Unrsvp
            return {
              ...post,
              rsvpStatus: null,
              rsvpCount: Math.max(0, post.rsvpCount - 1)
            };
          } else {
            // RSVP
            return {
              ...post,
              rsvpStatus: 'going',
              rsvpCount: (post.rsvpCount || 0) + 1
            };
          }
        }
        return post;
      })
    );
  };
  const handleOpenComments = (postId) => {
    const post = posts.find((p) => p.id === postId);
    setActivePost(post);
    setIsCommentOpen(true);
  };
  const handleAddComment = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setPostContent('');
  };

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(URL.createObjectURL(file)); 
    }
  };

  const handleSubmitPost = () => {
    if (postContent.trim() || postImage) {
      setPosts((prevPosts) => [
        ...prevPosts,
        {
          id: prevPosts.length + 1,
          author: "You",
          content: postContent,
          image: postImage ? URL.createObjectURL(postImage) : null,
          likes: 0,
          type: 'user', // Default to user post
          comments: [],
        },
      ]);
      setPostContent("");
      setPostImage(null);
      toggleModal();
    }
  };

  const handleLikeToggle = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return post.liked
            ? { ...post, likes: post.likes - 1, liked: false } // Unlike
            : { ...post, likes: post.likes + 1, liked: true }; // Like
        }
        return post;
      })
    );
  };

  return (
    <div className="home-page">
      <Taskbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <div className="content">
        <div className="background-block">
          <PostsFeed
            posts={posts}
            handleLikeToggle={handleLikeToggle}
            toggleModal={toggleModal}
            handleOpenComments={handleOpenComments}
            handleRSVP={handleRSVP}

          />
          <Sidebar events={events} />
        </div>
      </div>

      {isModalOpen && (
        <CreatePostModal
          postContent={postContent}
          handlePostChange={handlePostChange}
          postImage={postImage}
          handleImageChange={handleImageChange}
          handleSubmitPost={handleSubmitPost}
          toggleModal={toggleModal}
          maxCharacters={maxCharacters}
        />
      )}

      {/* Comment overlay with the close function passed as prop */}
      {isCommentOpen && activePost && (
        <CommentOverlay
          post={activePost}
          closeOverlay={() => setIsCommentOpen(false)} // This is the function to close the overlay
        />
      )}
    </div>
  );
};
const CreatePostModal = ({ 
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

export default HomePage;

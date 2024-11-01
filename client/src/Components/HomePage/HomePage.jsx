import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { Home, User, MessageSquare, CalendarDays, Tickets, Settings, Heart } from 'lucide-react';

const HomePage = () => {
  const [friends, setFriends] = useState(['Alice', 'Charlie', 'David', 'Eva', 'James']);
  const [newFriend, setNewFriend] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);
  const maxCharacters = 300;

  const [posts, setPosts] = useState([
    { id: 1, author: 'John Doe', content: 'testing, this test, test test', likes: 0  },
    { id: 2, author: 'Jane Smith', content: 'please work , test,test,test', likes: 0  },
    { id: 3, author: 'Bob Johnson', content: 'test 3, test 3, test 333. testtest' , likes: 0 },
    { id: 4, author: 'jimbo', content: 'yet another test to cover more space', likes: 0  },
    { id: 5, author: 'jimbos brother', content: 'yet another test to cover more space', likes: 0  },
    { id: 6, author: 'John', content: 'yet another test to cover more space' , likes: 0 },
    { id: 7, author: 'Anon number1', content: 'yet another test to cover more space', likes: 0  },
    { id: 8, author: 'Anon number2', content: 'yet another test to cover more space' , likes: 0 },
    { id: 9, author: 'Anon number3', content: 'yet another test to cover more space' , likes: 0 },
    { id: 10, author: 'Anon number4', content: 'yet another test to cover more space' , likes: 0 },
  ]);
 const events = [
    { id: 1, name: 'Community Picnic', date: '2024-10-15' },
    { id: 2, name: 'Tech Meetup', date: '2024-10-20' },
    { id: 3, name: 'Career Fair', date: '2024-10-20' },
    { id: 4, name: 'Library Event', date: '2024-10-20' },
    { id: 5, name: 'Gym Event', date: '2024-10-20' },
  ];
  const handleAddFriend = (e) => {
    e.preventDefault();
    if (newFriend.trim() !== '') {
      setFriends([...friends, newFriend.trim()]);
      setNewFriend('');
    }
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
    console.log("Post content:", postContent);
    console.log("Post image:", postImage);
    toggleModal();
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
      <nav className="navbar">
        <ul>
          <li><Link to="/home">Home</Link><Home size={24} /></li>
          <li><Link to="/Calendar">Calendar</Link><CalendarDays size={24} /></li>
          <li><Link to="/Events">Events</Link><Tickets size={24} /></li>
          <li><Link to="/profile">Profile</Link><User size={24} /></li>
          <li><Link to="/messages">Messages</Link><MessageSquare size={24} /></li>
          <li>
            <div className="settings">
              <span onClick={toggleDarkMode}>Settings <Settings size={24} /></span>
              <div className="dropdown">
                <button onClick={toggleDarkMode}>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <div className="content">
        <div className="background-block">
          <div className="main-feed">
            <h2>Your feed</h2>
            <button className="create-post" onClick={toggleModal}>Create Post</button>
            {posts.map((post) => (
              <div key={post.id} className="post">
                <div className="post-author">{post.author}</div>
                <div className="post-content">{post.content}</div>
                {postImage && <img src={postImage} alt="Post" className="post-image" />}
                <button 
                  className="like-button" 
                  onClick={() => handleLikeToggle(post.id)} 
                >
                  <Heart size={16} /> {post.likes}
                </button>
              </div>
            ))}
          </div>

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
            
            <div className="friends">
              <h3>Friends</h3>
              <ul>
                {friends.map(friend => (
                  <li key={friend}>{friend}</li>
                ))}
              </ul>
              <form onSubmit={handleAddFriend} className="add-friend-form">
                <input
                  type="text"
                  value={newFriend}
                  onChange={(e) => setNewFriend(e.target.value)}
                  placeholder="Enter friend's name"
                />
                <button type="submit">Add Friend</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
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
      )}
    </div>
  );
};

export default HomePage;
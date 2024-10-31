import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { Home, User, MessageSquare, CalendarDays, Tickets, Settings } from 'lucide-react';

const HomePage = () => {
  const [friends, setFriends] = useState(['Alice', 'Charlie', 'David', 'Eva', 'James']);
  const [newFriend, setNewFriend] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null); // State for storing the uploaded image

  const maxCharacters = 300;

  const posts = [
    { id: 1, author: 'John Doe', content: 'testing, this test, test test' },
    { id: 2, author: 'Jane Smith', content: 'please work , test,test,test' },
    { id: 3, author: 'Bob Johnson', content: 'test 3, test 3, test 333. testtest' },
    { id: 4, author: 'jimbo', content: 'yet another test to cover more space' },
    { id: 5, author: 'jimbos brother', content: 'yet another test to cover more space' },
    { id: 6, author: 'John', content: 'yet another test to cover more space' },
    { id: 7, author: 'Anon number1', content: 'yet another test to cover more space' },
    { id: 8, author: 'Anon number2', content: 'yet another test to cover more space' },
    { id: 9, author: 'Anon number3', content: 'yet another test to cover more space' },
    { id: 10, author: 'Anon number4', content: 'yet another test to cover more space' },
  ];

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
  
  // Toggle dark mode
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

  return (
    <div className="home-page">
      <nav className="navbar">
        <ul>
          <li><Link to="/home">Home</Link><Home size={24} /></li>
          <li><Link to="/Calender">Calendar</Link><CalendarDays size={24} /></li>
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
            {posts.map(post => (
              <div key={post.id} className="post">
                <h3>{post.author}</h3>
                <p>{post.content}</p>
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
                <Link to="/create-event">
            <button className="create-event">Create Event</button>
          </Link>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* CREATING POSTS*/}
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

            {/* Image upload */}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {postImage && (
              <div className="image-preview">
                <img src={postImage} alt="Preview" />
              </div>
            )}

            <button
              className="submit-post"
              disabled={postContent.length === 0 && !postImage} // Disable if no content or image
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

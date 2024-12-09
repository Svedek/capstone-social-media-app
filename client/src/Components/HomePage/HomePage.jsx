import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';

import { Taskbar } from "../taskbar.jsx"
import { PostsFeed } from "./postsFeed.jsx"
import { CommentOverlay } from "./commentOverlay.jsx"
import { Sidebar } from "./sidebar.jsx"
import { CreatePostModal } from "./CreatePostModal.jsx" 


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
    { id: 7, author: 'Anon number1', content: 'yet another test to cover more space', likes: 0 , comments: []  }
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
      <Taskbar />

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

export default HomePage;

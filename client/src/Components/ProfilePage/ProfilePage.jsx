import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  // Sample user data for demonstration purposes
  const user = {
    id: '1',
    username: 'userName',
    fullName: 'Your name',
    email: 'testtesttest.gmail.com',
    joinDate: '2023-01-15',
    bio: 'test test test',
  
    friends: ['a', 'b', 'c', 'd', 'e'],
    posts: [
      {
        id: 1,
        content: 'example post',
        date: '2024-09-01',
        likes: 15,
        comments: 3,
      },
      {
        id: 2,
        content: 'example post 2',
        date: '2024-09-05',
        likes: 22,
        comments: 7,
      },
      {
        id: 3,
        content: 'example post 3',
        date: '2024-09-10',
        likes: 30,
        comments: 5,
      },
    ],
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <img src={user.avatar} alt={user.username} className="avatar" />
        <h1>{user.fullName}</h1>
        <p>@{user.username}</p>
        <Link to={`/profile/edit/${user.id}`} className="edit-button">
          Edit Profile
        </Link>
      </div>

      <div className="user-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Location:</strong> {user.location}</p>
        <p><strong>Joined:</strong> {user.joinDate}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
      </div>

      <div className="friends-section">
        <h2>Friends</h2>
        <ul>
          {user.friends.map((friend, index) => (
            <li key={index}>{friend}</li>
          ))}
        </ul>
      </div>

      <div className="posts-section">
        <h2>Posts</h2>
        {user.posts.map(post => (
          <div key={post.id} className="post">
            <p>{post.content}</p>
            <div className="post-meta">
              <span>{post.date}</span>
              <span>{post.likes} likes • {post.comments} comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
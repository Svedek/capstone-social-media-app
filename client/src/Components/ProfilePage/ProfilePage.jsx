import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../authenticationHook.jsx";
import LogoutButton from "../logoutButton.jsx";
import './ProfilePage.css';

const ProfilePage = () => {
  // Sample user data for demonstration purposes
  // const user = {
  //   id: '1',
  //   username: 'userName',
  //   fullName: 'Your name',
  //   email: 'testtesttest.gmail.com',
  //   joinDate: '2023-01-15',
  //   bio: 'test test test',
  
  //   friends: ['a', 'b', 'c', 'd', 'e'],
  //   posts: [
  //     {
  //       id: 1,
  //       content: 'example post',
  //       date: '2024-09-01',
  //       likes: 15,
  //       comments: 3,
  //     },
  //     {
  //       id: 2,
  //       content: 'example post 2',
  //       date: '2024-09-05',
  //       likes: 22,
  //       comments: 7,
  //     },
  //     {
  //       id: 3,
  //       content: 'example post 3',
  //       date: '2024-09-10',
  //       likes: 30,
  //       comments: 5,
  //     },
  //   ],
  // };
  
  const { userObj } = useAuth();
  if (!userObj) {
    return <div>Loading...</div>
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <h1>{userObj.firstName} {userObj.lastName}</h1>
        <Link to={`/profile/edit`} className="edit-button">
          Edit Profile
        </Link>
      </div>

      <div className="user-info">
        <p><strong>Email:</strong> {userObj.email}</p>
        <p><strong>Joined:</strong> {userObj.joinDate}</p>
        <p><strong>Bio:</strong> {userObj.bio}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
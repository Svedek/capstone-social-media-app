import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../authenticationHook.jsx";
import LogoutButton from "../logoutButton.jsx";
import { Taskbar } from "../taskbar.jsx"
import './ProfilePage.css';

const ProfilePage = () => {

  const { userObj } = useAuth();
  console.log("in profile page");
  console.log(`user: `, userObj);
  if (!userObj) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Taskbar />
      <div className="profile-wrapper">
        <div className="profile-header">
          <h1>{userObj.first_name} {userObj.last_name}</h1>
          <Link to={`/profile/edit`} className="edit-button">
            Edit Profile
          </Link>
        </div>

        <div className="user-info">
          <p><strong>Email:</strong> {userObj.email}</p>
          <p><strong>Joined:</strong> {userObj.join_date}</p>
          <p><strong>Bio:</strong> {userObj.bio}</p>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
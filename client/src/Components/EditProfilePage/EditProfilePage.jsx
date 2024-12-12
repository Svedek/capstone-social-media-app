import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { majors } from '../Assets/majors.js';
import { useAuth } from "../authenticationHook.jsx";
import LogoutButton from "../logoutButton.jsx";
import './EditProfilePage.css';

const EditProfilePage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [major, setMajor] = useState("");
  const [bio, setBio] = useState("");
  const { userObj } = useAuth();

  useEffect(() => {
    if (userObj) {
      setFirstName(userObj.first_name);
      setLastName(userObj.last_name);
      setMajor(userObj.major);
      setBio(userObj.bio);
    }
  }, [userObj]);

  if (!userObj) {
    return <div>Loading...</div>
  }  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("in handle submit");
    const response = await fetch(`./edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ firstName: firstName, lastName: firstName, major: major, bio: bio, userId: userObj.user_id })
    });
  };

  return (
    <div className="edit-profile-wrapper">
      <h1>Edit Profile</h1>
      <br></br>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="major">Major</label>
          <select
            id="major"
            name="major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className="major-select"
          >
            <option value={bio} disabled>Select a major</option>
            {majors.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
            placeholder="Tell us about yourself"
          />
        </div>

        <div className="button-group">
          <button type="submit">Save Changes</button>
          <Link to="/profile">
            <button type="button">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
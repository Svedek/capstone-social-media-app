import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProfilePage.css';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [user, setUser] = useState({
    fullName: 'John Doe',
    username: 'johndoe',
    email: 'testtesttest@gmail',
    bio: 'mke student.',
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    
    //eventual fetch
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //eventually post to database
    console.log('Updated user data:', { ...user, profilePicture: previewImage || user.profilePicture });
    navigate('/profile');
  };

  return (
    <div className="edit-profile-wrapper">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="image-preview">
            <img
              src={previewImage || user.profilePicture}
              alt="Profile preview"
              className="profile-picture-preview"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={user.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={user.bio}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => navigate('/profile')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
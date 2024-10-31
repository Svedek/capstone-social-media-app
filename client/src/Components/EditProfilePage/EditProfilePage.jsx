import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EditProfilePage.css';

 const MAJORS = [
  'Computer Science',
  'Engineering',
  'Business',
  'Biology',
  'Psychology',
  'Mathematics',
  'English',
  'History',
  'Chemistry',
  'Physics',
  'Art',
  'Music',
  'Economics',
  'Political Science',
  'Sociology',
  'Other'
];

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    major: '',
    bio: '',
    avatar: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatar: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="edit-profile-wrapper">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="avatar">Profile Picture</label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleFileChange}
          />
          {formData.avatar && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(formData.avatar)}
                alt="Profile preview"
                className="profile-picture-preview"
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="major">Major</label>
          <select
            id="major"
            name="major"
            value={formData.major}
            onChange={handleInputChange}
            className="major-select"
          >
            <option value="">Select a major</option>
            {MAJORS.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
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
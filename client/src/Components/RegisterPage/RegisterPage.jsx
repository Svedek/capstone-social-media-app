// Components/RegisterPage/RegisterPage.jsx
import React from 'react';
import './RegisterPage.css';

export const RegisterPage = () => {
  return (
    <div className='wrapper'>
      <form action="">
        <h1>Register Page</h1>
        <div className="input-box">
          <input type="text" placeholder='Username' required />
        </div>
        <div className="input-box">
          <input type="email" placeholder='Email' required />
        </div>
        <div className="input-box">
          <input type="password" placeholder='Password' required />
        </div>
        <div className="input-box">
          <input type="password" placeholder='Confirm Password' required />
        </div>
        
        <button type="submit">Register</button>

        <div className="Login-link">
          <p>Already have an account? <a href="/">Login here</a></p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;

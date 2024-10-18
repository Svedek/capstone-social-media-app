import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './LoginPage.css';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      navigate('/home'); 
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleLogin}>
        <h1>Login Page</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="remember-forgot">
          <label><input type="checkbox" /> Remember me</label>
          <a href="#"> Forgot Password?</a>
        </div>

        <button type="submit">Login</button>

        <div className="Register-link">
          <p>Create a new account here! <Link to="/register">Register</Link></p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

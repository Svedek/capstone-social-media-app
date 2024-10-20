import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`./login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password })
    });
    setEmail("");
    setPassword("");

    const data = await response.json();
    if (data.auth) {
      navigate("/home")
    }
    else {
      setErrorMessage("Your password and username are incorrect");
    }
  };

  return (
    <div className='wrapper'>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
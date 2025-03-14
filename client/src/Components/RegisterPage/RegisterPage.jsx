import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterPage.css';

export const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [major, setMajor] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confPass) {
      setErrorMessage("passwords do not match");
    } else {
      const response = await fetch(`./register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ major: major, email: email, firstName: firstName, lastName: lastName, password: password, confPass: confPass })
      });
      
      const data = await response.json();
      if (data.created) {
        navigate("/");
      }
      else if (data.errorMessage !== ""){
        setErrorMessage(data.errorMessage);
      }
    }
  };

  return (
    <div className='wrapper'>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder='Major'
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            required
          />
        </div>
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
        <div className="input-box">
          <input
            type="password"
            placeholder='Confirm Password'
            value={confPass}
            onChange={(e) => setConfPass(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Register</button>

        <div className="Login-link">
          <p>Already have an account? <Link to="/">Login Here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;